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
  console.log(searchParams);
  const response = await validatePasswordResetToken(
    searchParams.email,
    searchParams.token
  );
  console.log(response);
  return (
    <PasswordResetForm
      passwordResetToken={searchParams.token}
      email={searchParams.email}
      isValidToken={response.success}
    />
  );
}
