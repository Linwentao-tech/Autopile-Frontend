"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import Link from "next/link";
import FormInput from "../FormInputs/FormInput";
import { sendPasswordResetEmailToken } from "@/app/actions/password";

const passwordResetSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email format")
    .max(100, "Email must not exceed 100 characters"),
});

type PasswordResetFormInputs = z.infer<typeof passwordResetSchema>;

export default function PasswordResetForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordResetFormInputs>({
    resolver: zodResolver(passwordResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: PasswordResetFormInputs) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await sendPasswordResetEmailToken(data.email);
      if (result.success) {
        setSuccess(true);
      } else {
        setError(
          result.message || "Failed to send reset email. Please try again."
        );
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Password reset failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg bg-zinc-900 p-6 sm:p-8 lg:p-10 rounded-lg shadow-lg border border-zinc-800">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 sm:mb-6 text-center">
            Check Your Email
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base text-center mb-6">
            If an account exists with this email, you will receive password
            reset instructions.
          </p>
          <Link
            href="/login"
            className="block w-full text-center py-2 sm:py-2.5 px-4 border border-transparent rounded-md shadow-sm 
                     text-sm sm:text-base font-medium text-white bg-orange-600 hover:bg-orange-700 
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500
                     transition-colors duration-200"
          >
            Return to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg bg-zinc-900 p-6 sm:p-8 lg:p-10 rounded-lg shadow-lg border border-zinc-800">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 sm:mb-6 lg:mb-8 text-center">
          Reset Password
        </h2>

        {error && (
          <div className="mb-4 p-2 sm:p-3 rounded bg-red-500/10 border border-red-500/20 text-red-500 text-sm sm:text-base">
            {error}
          </div>
        )}

        <form
          className="space-y-4 sm:space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormInput
            {...register("email")}
            id="email"
            name="email"
            label="Email"
            type="email"
            error={errors.email?.message}
            disabled={isSubmitting}
            required
            className="text-sm sm:text-base px-3 py-2 sm:py-2.5"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2 sm:py-2.5 px-4 border border-transparent rounded-md shadow-sm 
                     text-sm sm:text-base font-medium text-white bg-orange-600 hover:bg-orange-700 
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-colors duration-200"
          >
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-zinc-400">
          Remember your password?{" "}
          <Link
            href="/login"
            className="text-orange-500 hover:text-orange-400 transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
