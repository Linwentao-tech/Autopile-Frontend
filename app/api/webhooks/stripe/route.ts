import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-09-30.acacia",
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    // Get the raw request body and signature
    const payload = await request.text();
    const headersList = headers();
    const signature = headersList.get("stripe-signature");

    console.log("Webhook received", {
      hasSignature: !!signature,
      payloadLength: payload.length,
      contentType: headersList.get("content-type"),
    });

    // Verify required environment variables
    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      console.error("Missing STRIPE_WEBHOOK_SECRET");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    if (!signature) {
      console.error("Missing stripe signature");
      return NextResponse.json(
        { error: "Missing stripe signature" },
        { status: 400 }
      );
    }

    // Verify the webhook signature
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(
        payload,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
      console.log("Webhook signature verified", {
        eventType: event.type,
        eventId: event.id,
      });
    } catch (err) {
      console.error("⚠️ Webhook signature verification failed", {
        error: err instanceof Error ? err.message : "Unknown error",
        signaturePreview: signature.substring(0, 20) + "...",
      });
      return NextResponse.json(
        { error: "Webhook signature verification failed" },
        { status: 400 }
      );
    }

    // Handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      console.log("Processing checkout session", {
        sessionId: session.id,
        customerEmail: session.customer_details?.email,
      });

      // Retrieve the session with line items
      const expandedSession = await stripe.checkout.sessions.retrieve(
        session.id,
        {
          expand: ["line_items"],
        }
      );

      // Verify customer email exists
      if (!session.customer_details?.email) {
        console.error("No customer email found in session", {
          sessionId: session.id,
        });
        return NextResponse.json(
          { error: "No customer email found" },
          { status: 400 }
        );
      }

      // Format order items for email
      const items =
        expandedSession.line_items?.data.map((item) => ({
          name: item.description || "Unnamed product",
          quantity: item.quantity || 0,
          price: item.amount_total || 0,
        })) || [];

      // Calculate totals
      const subtotal = session.amount_subtotal || 0;
      const shipping = session.shipping_cost?.amount_total || 0;
      const total = session.amount_total || 0;

      try {
        // Send confirmation email
        const emailResponse = await resend.emails.send({
          from: "onboarding@autopile.store",
          to: session.customer_details.email,
          subject: `Order Confirmation #${session.id}`,
          html: `
            <html>
              <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h1 style="color: #e44d26;">Thank you for your order!</h1>
                <p>Hi ${session.customer_details.name},</p>
                <p>Your order #${
                  session.id
                } has been confirmed and is being processed.</p>
                
                <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
                  <h2 style="margin-top: 0;">Order Summary</h2>
                  <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                      <tr style="border-bottom: 2px solid #dee2e6;">
                        <th style="text-align: left; padding: 10px;">Item</th>
                        <th style="text-align: center; padding: 10px;">Quantity</th>
                        <th style="text-align: right; padding: 10px;">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${items
                        .map(
                          (item) => `
                        <tr style="border-bottom: 1px solid #dee2e6;">
                          <td style="padding: 10px;">${item.name}</td>
                          <td style="text-align: center; padding: 10px;">${
                            item.quantity
                          }</td>
                          <td style="text-align: right; padding: 10px;">$${(
                            item.price / 100
                          ).toFixed(2)}</td>
                        </tr>
                      `
                        )
                        .join("")}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colspan="2" style="text-align: right; padding: 10px;">Subtotal:</td>
                        <td style="text-align: right; padding: 10px;">$${(
                          subtotal / 100
                        ).toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td colspan="2" style="text-align: right; padding: 10px;">Shipping:</td>
                        <td style="text-align: right; padding: 10px;">$${(
                          shipping / 100
                        ).toFixed(2)}</td>
                      </tr>
                      <tr style="font-weight: bold;">
                        <td colspan="2" style="text-align: right; padding: 10px;">Total:</td>
                        <td style="text-align: right; padding: 10px;">$${(
                          total / 100
                        ).toFixed(2)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
                  <h2 style="margin-top: 0;">Shipping Address</h2>
                  <p style="margin-bottom: 0;">
                    ${session.shipping_details?.address?.line1}<br>
                    ${
                      session.shipping_details?.address?.line2
                        ? session.shipping_details.address.line2 + "<br>"
                        : ""
                    }
                    ${session.shipping_details?.address?.city}, 
                    ${session.shipping_details?.address?.state} 
                    ${session.shipping_details?.address?.postal_code}<br>
                    ${session.shipping_details?.address?.country}
                  </p>
                </div>

                <p>We'll send you another email when your order ships.</p>
                
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6;">
                  <p>If you have any questions, please contact our support team.</p>
                  <p>Thank you for shopping with us!</p>
                </div>
              </body>
            </html>
          `,
        });

        console.log("✅ Email sent successfully", {
          emailId: emailResponse.data?.id,
          sessionId: session.id,
          recipient: session.customer_details.email,
        });
      } catch (error) {
        console.error("❌ Failed to send email", {
          error:
            error instanceof Error
              ? {
                  message: error.message,
                  stack: error.stack,
                  name: error.name,
                }
              : "Unknown error",
          sessionId: session.id,
        });
        // Don't return error - we still want to acknowledge the webhook
      }
    }

    // Return a 200 response to acknowledge receipt of the event
    return NextResponse.json({ received: true });
  } catch (err) {
    // Log any unhandled errors
    console.error("❌ Webhook processing failed", {
      error:
        err instanceof Error
          ? {
              message: err.message,
              stack: err.stack,
              name: err.name,
            }
          : "Unknown error",
    });

    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 400 }
    );
  }
}
