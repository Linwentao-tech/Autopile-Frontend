import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-09-30.acacia",
});

export async function POST(request: NextRequest) {
  try {
    // Add detailed logging
    console.log("Starting webhook processing");

    const body = await request.text();
    const headersList = headers();
    const signature = headersList.get("stripe-signature");

    // Verify environment variables
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!webhookSecret || !resendApiKey) {
      console.error("Missing required environment variables", {
        hasWebhookSecret: !!webhookSecret,
        hasResendApiKey: !!resendApiKey,
      });
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

    // Verify webhook
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );

    console.log("Webhook verified, processing event:", event.type);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      console.log("Processing checkout session:", {
        sessionId: session.id,
        customerEmail: session.customer_details?.email,
      });

      if (!session.customer_details?.email) {
        console.error("No customer email in session");
        return NextResponse.json(
          { error: "No customer email found" },
          { status: 400 }
        );
      }

      // Initialize Resend inside the event handler
      const resend = new Resend(resendApiKey);

      try {
        // Use the same working configuration as your test endpoint
        const emailResponse = await resend.emails.send({
          from: "onboarding@autopile.store", // Use the same working sender address
          to: session.customer_details.email,
          subject: `Order Confirmation #${session.id}`,
          html: `
            <html>
              <body style="font-family: Arial, sans-serif; padding: 20px;">
                <h1>Thank you for your order!</h1>
                <p>Hi ${session.customer_details.name},</p>
                <p>Your order #${session.id} has been confirmed.</p>
                
                <div style="margin: 20px 0;">
                  <h2>Order Details</h2>
                  <p>Total Amount: $${(
                    (session.amount_total || 0) / 100
                  ).toFixed(2)}</p>
                </div>

                <div style="margin: 20px 0;">
                  <h2>Shipping Address</h2>
                  <p>
                    ${session.shipping_details?.address?.line1}<br>
                    ${session.shipping_details?.address?.city}, 
                    ${session.shipping_details?.address?.state} 
                    ${session.shipping_details?.address?.postal_code}<br>
                    ${session.shipping_details?.address?.country}
                  </p>
                </div>

                <p>We'll email you when your order ships.</p>
              </body>
            </html>
          `,
        });

        console.log("Email sent successfully:", {
          emailId: emailResponse.data?.id,
          sessionId: session.id,
        });
      } catch (error) {
        // Log the full error for debugging
        console.error("Failed to send email:", {
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
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook processing failed:", {
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
