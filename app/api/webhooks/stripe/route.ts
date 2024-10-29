// app/api/webhooks/stripe/route.ts
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-09-30.acacia",
});

// Configuration for your Vercel deployment
const DOMAIN = "e-commerce-plum-seven-35.vercel.app";

// Move Resend initialization inside the email function to prevent build errors
async function sendOrderConfirmationEmail(
  email: string,
  orderDetails: {
    orderId: string;
    items: Array<{
      name: string;
      quantity: number;
      price: number;
    }>;
    total: number;
  }
) {
  try {
    // Check for API key before initializing Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error("Missing Resend API key");
      return;
    }

    const resend = new Resend(resendApiKey);

    await resend.emails.send({
      from: `E-Commerce Store <onboarding@resend.dev>`,
      to: email,
      subject: `Order Confirmation #${orderDetails.orderId}`,
      html: `
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h1>Thank you for your order!</h1>
            <p>Your order #${orderDetails.orderId} has been confirmed.</p>
            
            <h2>Order Summary:</h2>
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <thead>
                <tr style="background-color: #f8f9fa;">
                  <th style="padding: 12px; text-align: left; border-bottom: 2px solid #dee2e6;">Item</th>
                  <th style="padding: 12px; text-align: right; border-bottom: 2px solid #dee2e6;">Quantity</th>
                  <th style="padding: 12px; text-align: right; border-bottom: 2px solid #dee2e6;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${orderDetails.items
                  .map(
                    (item) => `
                  <tr>
                    <td style="padding: 12px; border-bottom: 1px solid #dee2e6;">${
                      item.name
                    }</td>
                    <td style="padding: 12px; text-align: right; border-bottom: 1px solid #dee2e6;">${
                      item.quantity
                    }</td>
                    <td style="padding: 12px; text-align: right; border-bottom: 1px solid #dee2e6;">$${(
                      item.price / 100
                    ).toFixed(2)}</td>
                  </tr>
                `
                  )
                  .join("")}
                <tr>
                  <td colspan="2" style="padding: 12px; text-align: right; font-weight: bold;">Total:</td>
                  <td style="padding: 12px; text-align: right; font-weight: bold;">$${(
                    orderDetails.total / 100
                  ).toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
            
            <p>We'll send you another email when your order ships.</p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6;">
              <p>If you have any questions, please contact our support team.</p>
              <p>Thank you for shopping with us!</p>
              <p><small>This order was placed on ${DOMAIN}</small></p>
            </div>
          </body>
        </html>
      `,
    });
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    // Don't throw the error, just log it
    // This prevents the webhook from failing if email sending fails
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const headersList = headers();
    const signature = headersList.get("stripe-signature");

    // Verify required environment variables
    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      console.error("Missing Stripe webhook secret");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    if (!signature) {
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

    // Handle the event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      // Retrieve the session with line items
      const expandedSession = await stripe.checkout.sessions.retrieve(
        session.id,
        {
          expand: ["line_items"],
        }
      );

      // Format order details
      const orderDetails = {
        orderId: session.id,
        items:
          expandedSession.line_items?.data.map((item) => ({
            name: item.description!,
            quantity: item.quantity!,
            price: item.amount_total!,
          })) || [],
        total: session.amount_total!,
      };

      // Send confirmation email
      if (session.customer_details?.email) {
        // Don't await email sending to prevent webhook timeout
        sendOrderConfirmationEmail(
          session.customer_details.email,
          orderDetails
        ).catch(console.error);
      }
    }

    // Return a response to acknowledge receipt of the event
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 400 }
    );
  }
}
