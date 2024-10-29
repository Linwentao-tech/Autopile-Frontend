import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import type { CreateEmailResponse } from "resend";

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-09-30.acacia",
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    console.log("Webhook received");

    const body = await request.text();
    const headersList = headers();
    const signature = headersList.get("stripe-signature");

    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      console.error("Missing STRIPE_WEBHOOK_SECRET");
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
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    console.log(`Event type: ${event.type}`);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      console.log("Processing completed checkout session", {
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

      if (!session.customer_details?.email) {
        console.error("No customer email found in session");
        return NextResponse.json(
          { error: "No customer email found" },
          { status: 400 }
        );
      }

      // Format line items for email
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
        const emailResult: CreateEmailResponse = await resend.emails.send({
          from: "Autopile <orders@autopile.store>",
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
                    ${session.shipping_details?.address?.city}, ${
            session.shipping_details?.address?.state
          } ${session.shipping_details?.address?.postal_code}<br>
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

        console.log("Email sent successfully", {
          emailId: emailResult.data?.id,
          sessionId: session.id,
        });
      } catch (error) {
        console.error("Failed to send email", {
          error: error instanceof Error ? error.message : "Unknown error",
          sessionId: session.id,
        });
        // Don't return error response - we still want to acknowledge the webhook
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err) {
    console.error("Webhook processing failed", {
      error: err instanceof Error ? err.message : "Unknown error",
    });
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 400 }
    );
  }
}
