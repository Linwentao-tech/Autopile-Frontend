import LoginForm from "../components/LoginForm";

export const metadata = {
  title: "Login",
  description: "Login to AutoPile",
};

export default async function LoginPage() {
  return <LoginForm />;
}
