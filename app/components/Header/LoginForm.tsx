"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { setWarning } from "@/app/_lib/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { setLoginStatus } from "@/app/_lib/features/auth/authSlice";
import FormInput from "../FormInputs/FormInput";

export default function LoginForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(event.currentTarget);
      const email = formData.get("email");
      const password = formData.get("password");

      const response = await fetch(
        "https://autopile-gafnbva6egabe5ap.australiaeast-01.azurewebsites.net/Auth/Signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!data.success) {
        dispatch(setWarning(data.message || "Login failed"));
        return;
      }

      document.cookie = `token=${data.data.token}; max-age=3600; secure; path=/; samesite=strict`;
      dispatch(
        setLoginStatus({
          isLoggedIn: true,
          userData: {
            email: data.data.email,
            emailConfirmed: data.data.emailConfirmed,
            userName: data.data.userName,
            firstName: data.data.firstName,
            lastName: data.data.lastName,
            phoneNumber: data.data.phoneNumber,
            roles: data.data.roles,
          },
        })
      );

      router.push("/dashboard");
    } catch (error) {
      dispatch(
        setWarning(
          `An error occurred during login: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        )
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleLogin}>
      <FormInput id="email" name="email" label="Email" type="email" />
      <FormInput
        id="password"
        name="password"
        label="Password"
        type="password"
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
