import { NextResponse } from "next/server";
import Stripe from "stripe";

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

// Define a type for line items with optional images
type LineItem = {
  price_data: {
    currency: string;
    product_data: {
      name: string;
      images?: string[];
    };
    unit_amount: number;
  };
  quantity: number;
};

export async function POST(req: Request) {
  try {
    const {
      items,
      gstAmount,
      deliveryFee,
    }: { items: CartItem[]; gstAmount: number; deliveryFee: number } =
      await req.json();

    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error(
        "STRIPE_SECRET_KEY is not set in the environment variables"
      );
    }

    const transformedItems: LineItem[] = items.map((item: CartItem) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: Math.round(parseFloat(item.price.replace("$", "")) * 100),
      },
      quantity: item.quantity,
    }));

    // Add GST as a separate line item
    transformedItems.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "GST",
        },
        unit_amount: Math.round(gstAmount * 100),
      },
      quantity: 1,
    });

    // Add Delivery Fee as a separate line item
    transformedItems.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Delivery Fee",
        },
        unit_amount: Math.round(deliveryFee * 100),
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: transformedItems,
      mode: "payment",
      success_url: `${req.headers.get("origin")}/success`,
      cancel_url: `${req.headers.get("origin")}/cart`,
    });

    return NextResponse.json({ id: session.id });
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
