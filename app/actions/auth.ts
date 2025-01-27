"use server";

export async function resendConfirmationEmail() {
  try {
    const response = await fetch(
      `${process.env.API_URL}/Auth/ResendConfirmationEmail`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("Resend confirmation email error:", error);
    return { success: false, error: "Failed to resend confirmation email" };
  }
}
