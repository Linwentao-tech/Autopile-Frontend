"use client";
import { useState, FormEvent, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function PasswordResetForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    const validateToken = async () => {
      const token = searchParams.get("token");
      const email = searchParams.get("email");

      if (!token || !email) {
        setIsValidToken(false);
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "https://autopile-gafnbva6egabe5ap.australiaeast-01.azurewebsites.net/Auth/ValidatePasswordResetToken",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              token,
            }),
          }
        );

        const data = await response.json();
        setIsValidToken(data.message === "Token valid");
      } catch {
        setIsValidToken(false);
      } finally {
        setIsLoading(false);
      }
    };

    validateToken();
  }, [searchParams]);

  const validatePassword = (password: string) => {
    if (password.length < 8) return "Password must be at least 8 characters";
    if (!/[A-Z]/.test(password))
      return "Password must contain at least one uppercase letter";
    if (!/[a-z]/.test(password))
      return "Password must contain at least one lowercase letter";
    if (!/[0-9]/.test(password))
      return "Password must contain at least one number";
    if (!/[^A-Za-z0-9]/.test(password))
      return "Password must contain at least one special character";
    return "";
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    const token = searchParams.get("token");
    const email = searchParams.get("email");

    if (!token || !email) {
      setError("Invalid reset link");
      return;
    }

    try {
      const response = await fetch(
        "https://autopile-gafnbva6egabe5ap.australiaeast-01.azurewebsites.net/auth/ResetPassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            emailVerifyToken: token,
            newPassword: password,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Password reset failed");
      }
      setSuccess(true);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <p className="text-white">Validating reset link...</p>
        </div>
      </div>
    );
  }

  if (!isValidToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4 text-white text-center">
            Invalid or Expired Link
          </h2>
          <p className="text-gray-300 text-center mb-4">
            This password reset link is invalid or has expired. Please request a
            new password reset link.
          </p>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4 text-white text-center">
            Password Reset Successful!
          </h2>
          <p className="text-gray-300 text-center mb-4">
            Your password has been updated successfully.
          </p>
          <button
            onClick={() => (window.location.href = "/login")}
            className="w-full bg-orange-700 text-white p-3 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-white">Reset Password</h2>
        {error && (
          <div className="bg-red-500 text-white p-3 rounded-lg mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-orange-500 focus:border-orange-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-300"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-orange-500 focus:border-orange-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-700 text-white p-3 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
