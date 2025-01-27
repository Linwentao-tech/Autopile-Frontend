"use server";

export async function sendPasswordResetEmailToken(email: string) {
  try {
    const response = await fetch(
      `${process.env.API_URL}/Auth/SendResetPasswordToken?email=${email}`
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error sending password reset email token:", error);
  }
}

export async function validatePasswordResetToken(email: string, token: string) {
  try {
    const response = await fetch(
      `${process.env.API_URL}/Auth/ValidatePasswordResetToken`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, token }),
        cache: "no-store",
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error validating password reset token:", error);
  }
}

export async function resetPassword(
  email: string,
  token: string,
  newPassword: string
) {
  try {
    const response = await fetch(`${process.env.API_URL}/Auth/ResetPassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, token, newPassword }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error resetting password:", error);
  }
}
