import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-09-30.acacia",
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    // Search for checkout sessions with the given email
    const sessions = await stripe.checkout.sessions.list({
      customer_details: { email },
      limit: 100, // Adjust this limit as needed
    });

    // Retrieve detailed information for each session
    const orderPromises = sessions.data.map(async (session) => {
      const expandedSession = await stripe.checkout.sessions.retrieve(
        session.id,
        {
          expand: ["line_items", "customer"],
        }
      );

      return {
        id: expandedSession.id,
        amount_total: expandedSession.amount_total,
        currency: expandedSession.currency,
        customer_email: expandedSession.customer_details?.email,
        customer_name: expandedSession.customer_details?.name,
        shipping_address: expandedSession.shipping_details?.address,
        items: expandedSession.line_items?.data.map((item) => ({
          id: item.id,
          description: item.description,
          quantity: item.quantity,
          amount_total: item.amount_total,
        })),
        payment_status: expandedSession.payment_status,
        created: new Date(expandedSession.created * 1000).toISOString(),
      };
    });

    const orders = await Promise.all(orderPromises);

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Error retrieving orders:", error);
    return NextResponse.json(
      { error: "Error retrieving orders" },
      { status: 500 }
    );
  }
}
