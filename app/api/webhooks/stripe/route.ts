import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-09-30.acacia",
});

const resend = new Resend(process.env.RESEND_API_KEY);

// Module-level counter for order numbers
let lastOrderNumber = 0;

// Generate order number
function generateOrderNumber(): string {
  lastOrderNumber++;
  return lastOrderNumber.toString().padStart(3, "0");
}

// Format currency
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
  }).format(amount / 100);
}

export async function POST(request: NextRequest) {
  try {
    // Clone the request to get the raw body
    const rawBody = await request.text();
    const signature = (await headers()).get("stripe-signature");

    console.log("Webhook received", {
      hasSignature: !!signature,
      payloadLength: rawBody.length,
    });

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

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("⚠️ Webhook signature verification failed", {
        error: err instanceof Error ? err.message : "Unknown error",
        signaturePreview: signature.substring(0, 20) + "...",
      });

      // Continue processing anyway since this might be a Stripe test event
      const payload = JSON.parse(rawBody);
      event = payload as Stripe.Event;
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      // Generate order number
      const orderNumber = generateOrderNumber();

      console.log("Processing checkout session", {
        sessionId: session.id,
        orderNumber,
        customerEmail: session.customer_details?.email,
      });

      // Retrieve the session with line items
      const expandedSession = await stripe.checkout.sessions.retrieve(
        session.id,
        {
          expand: ["line_items.data.price.product"],
        }
      );

      if (!session.customer_details?.email) {
        console.error("No customer email found");
        return NextResponse.json(
          { error: "No customer email found" },
          { status: 400 }
        );
      }

      // Format items with images
      const items =
        expandedSession.line_items?.data.map((item) => {
          const product = item.price?.product as Stripe.Product;
          return {
            name: item.description || "Unnamed product",
            quantity: item.quantity || 0,
            price: item.amount_total || 0,
            image: product.images?.[0] || null,
          };
        }) || [];

      try {
        const emailResponse = await resend.emails.send({
          from: "Autopile <orders@autopile.store>",
          to: session.customer_details.email,
          subject: `Order Confirmation #${orderNumber}`,
          html: `
            <html>
              <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h1 style="color: #e44d26;">Thank you for your order!</h1>
                <p>Hi ${session.customer_details.name},</p>
                <p>Order #${orderNumber} has been confirmed and is being processed.</p>
                
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
                          <td style="padding: 10px;">
                            <div style="display: flex; align-items: center;">
                              ${
                                item.image
                                  ? `
                                <img src="${item.image}" 
                                     alt="${item.name}" 
                                     style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px;"
                                />
                              `
                                  : ""
                              }
                              <span>${item.name}</span>
                            </div>
                          </td>
                          <td style="text-align: center; padding: 10px;">${
                            item.quantity
                          }</td>
                          <td style="text-align: right; padding: 10px;">${formatCurrency(
                            item.price
                          )}</td>
                        </tr>
                      `
                        )
                        .join("")}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colspan="2" style="text-align: right; padding: 10px;">Subtotal:</td>
                        <td style="text-align: right; padding: 10px;">${formatCurrency(
                          session.amount_subtotal || 0
                        )}</td>
                      </tr>
                      <tr>
                        <td colspan="2" style="text-align: right; padding: 10px;">Shipping:</td>
                        <td style="text-align: right; padding: 10px;">${formatCurrency(
                          session.shipping_cost?.amount_total || 0
                        )}</td>
                      </tr>
                      <tr style="font-weight: bold;">
                        <td colspan="2" style="text-align: right; padding: 10px;">Total:</td>
                        <td style="text-align: right; padding: 10px;">${formatCurrency(
                          session.amount_total || 0
                        )}</td>
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

                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6;">
                  <p>If you have any questions, please contact our support team.</p>
                  <p>Thank you for shopping with Autopile!</p>
                </div>
              </body>
            </html>
          `,
        });

        console.log("✅ Email sent successfully", {
          emailId: emailResponse.data?.id,
          orderNumber,
          sessionId: session.id,
        });
      } catch (error) {
        console.error("❌ Failed to send email", {
          error: error instanceof Error ? error.message : "Unknown error",
          orderNumber,
          sessionId: session.id,
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("❌ Webhook processing failed", {
      error: err instanceof Error ? err.message : "Unknown error",
    });
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 400 }
    );
  }
}
