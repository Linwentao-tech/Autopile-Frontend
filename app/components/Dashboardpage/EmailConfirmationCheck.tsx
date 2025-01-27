"use client";

import { useState } from "react";
import { sendEmailConfirmation } from "@/app/actions/sendEmailConfirmation";

export default function EmailConfirmationCheck({
  isEmailConfirmed,
  userEmail,
}: {
  isEmailConfirmed: boolean;
  userEmail: string;
}) {
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function sendConfirmationEmail() {
    setIsResending(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await sendEmailConfirmation(userEmail);
      if (result.success) {
        setSuccess(true);
      } else {
        setError(
          result.error || "Failed to send confirmation email. Please try again."
        );
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Failed to send confirmation email:", error);
    } finally {
      setIsResending(false);
    }
  }

  if (!isEmailConfirmed) {
    return (
      <div className="max-w-2xl mx-auto my-8 bg-yellow-50 rounded-lg shadow-sm border border-yellow-200 overflow-hidden">
        <div className="border-l-4 border-yellow-500 px-6 py-4">
          {error && (
            <div className="mb-4 p-3 rounded bg-red-500/10 border border-red-500/20 text-red-500">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 rounded bg-green-500/10 border border-green-500/20 text-green-500">
              Confirmation email sent! Please check your inbox.
            </div>
          )}
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <h3 className="text-lg font-medium text-yellow-800 mb-1">
                Email Verification Required
              </h3>
              <p className="text-yellow-700">
                Please verify your email address to access all features.
              </p>
            </div>
            <button
              onClick={sendConfirmationEmail}
              disabled={isResending}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isResending ? "Sending..." : "Send Verification Email"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
