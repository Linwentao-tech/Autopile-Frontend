// Test endpoint - add this to a new file: app/api/test-webhook/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-09-30.acacia",
});

export async function GET() {
  try {
    // Log environment check
    console.log("Environment check:", {
      hasWebhookSecret: !!process.env.STRIPE_WEBHOOK_SECRET,
      secretLength: process.env.STRIPE_WEBHOOK_SECRET?.length,
    });

    // Create a test webhook event
    const payload = {
      id: "evt_test_webhook",
      object: "event",
      type: "checkout.session.completed",
      data: {
        object: {
          id: "cs_test_webhook",
        },
      },
    };

    // Create a test signature
    const timestamp = Math.floor(Date.now() / 1000);
    const secret = process.env.STRIPE_WEBHOOK_SECRET!;

    const payloadString = JSON.stringify(payload);
    const signature = stripe.webhooks.generateTestHeaderString({
      payload: payloadString,
      secret: secret,
      timestamp: timestamp,
    });

    // Try to verify the signature
    try {
      const event = stripe.webhooks.constructEvent(
        payloadString,
        signature,
        secret
      );
      return NextResponse.json({
        success: true,
        message: "Signature verification successful",
        event: event,
      });
    } catch (error) {
      return NextResponse.json({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
