import { NextResponse } from "next/server";
import Stripe from "stripe";
import { auth } from "@/app/auth";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-09-30.acacia",
});

interface CartItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
  image: string;
}

interface StripeError extends Error {
  type?: string;
}

export async function POST(req: Request) {
  try {
    const { items, deliveryFee }: { items: CartItem[]; deliveryFee: number } =
      await req.json();

    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error(
        "STRIPE_SECRET_KEY is not set in the environment variables"
      );
    }

    const session = await auth();

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map(
      (item: CartItem) => ({
        price_data: {
          currency: "aud",
          product_data: {
            name: item.name,
            images: [item.image],
          },
          unit_amount: Math.round(
            parseFloat(item.price.replace("$", "")) * 100
          ),
        },
        quantity: item.quantity,
      })
    );

    const params: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${req.headers.get("origin")}/success`,
      cancel_url: `${req.headers.get("origin")}/cart`,
      shipping_address_collection: {
        allowed_countries: ["AU"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: Math.round(deliveryFee * 100),
              currency: "aud",
            },
            display_name: "Standard Shipping",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 5,
              },
              maximum: {
                unit: "business_day",
                value: 7,
              },
            },
          },
        },
      ],
    };

    // Add customer_email to params if session exists
    if (session?.user?.email) {
      params.customer_email = session.user.email;
    }

    const checkoutSession = await stripe.checkout.sessions.create(params);

    return NextResponse.json({ id: checkoutSession.id });
  } catch (err: unknown) {
    console.error("Error creating checkout session:", err);
    if (err instanceof Error) {
      const stripeError = err as StripeError;
      if (stripeError.type === "StripeAuthenticationError") {
        return NextResponse.json(
          {
            error:
              "Authentication with Stripe failed. Please check your API key.",
          },
          { status: 401 }
        );
      }
    }
    return NextResponse.json(
      { error: "An error occurred while creating the checkout session." },
      { status: 500 }
    );
  }
}
