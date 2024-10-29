// app/api/test-email/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function GET() {
  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      return NextResponse.json(
        { error: "Missing Resend API key" },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);

    const response = await resend.emails.send({
      from: "onboarding@autopile.store",
      to: "linwentao888@gmail.com", // Replace with your email
      subject: "Test Email from Your Store",
      html: `
        <h1>Test Email</h1>
        <p>This is a test email to verify your Resend configuration.</p>
        <p>Sent at: ${new Date().toISOString()}</p>
      `,
    });

    return NextResponse.json({
      message: "Test email sent",
      response,
    });
  } catch (error) {
    console.error("Error sending test email:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
