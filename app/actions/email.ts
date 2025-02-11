"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;

  try {
    const data = await resend.emails.send({
      from: "Autopile <subscribe@autopile.store>",
      to: email,
      subject: "Welcome to Autopile Premium Newsletter!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #ea580c;">Welcome to Autopile Premium!</h1>
          <p>Hi ${firstName} ${lastName},</p>
          <p>Thank you for subscribing to our premium newsletter. We're excited to have you on board!</p>
          ${phone ? `<p>Contact number: ${phone}</p>` : ""}
          <p>You'll be receiving exclusive updates, offers, and news about our premium auto parts and services.</p>
          <div style="margin-top: 20px; padding: 15px; background-color: #f8f8f8; border-radius: 5px;">
            <p style="margin: 0; color: #666;">Your subscription details:</p>
            <ul style="list-style: none; padding-left: 0;">
              <li>Name: ${firstName} ${lastName}</li>
              <li>Email: ${email}</li>
              ${phone ? `<li>Phone: ${phone}</li>` : ""}
              <li>Newsletter subscription: Yes</li>
            </ul>
          </div>
          <p style="margin-top: 20px;">Best regards,<br>The Autopile Team</p>
        </div>
      `,
    });

    return { success: true, data };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error: "Failed to send email" };
  }
}
