import { validatePasswordResetToken } from "../actions/password";
import PasswordResetForm from "../components//PasswordResetForm";

export const metadata = {
  title: "Reset Password",
  description: "Reset your password",
};

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: { token: string; email: string };
}) {
  const response = await validatePasswordResetToken(
    searchParams.email,
    searchParams.token
  );

  return (
    <PasswordResetForm
      passwordResetToken={searchParams.token}
      email={searchParams.email}
      isValidToken={response.success}
    />
  );
}
