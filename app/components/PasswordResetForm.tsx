"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import Link from "next/link";
import FormInput from "./FormInputs/FormInput";
import { resetPassword } from "@/app/actions/authActions";

const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password must not exceed 100 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^a-zA-Z0-9]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ResetPasswordInputs = z.infer<typeof resetPasswordSchema>;

function PasswordResetForm({
  passwordResetToken,
  email,
  isValidToken,
}: {
  passwordResetToken: string;
  email: string;
  isValidToken: boolean;
}) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordInputs>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ResetPasswordInputs) => {
    try {
      const result = await resetPassword({
        email,
        emailVerifyToken: passwordResetToken,
        newPassword: data.newPassword,
      });

      if (result.success) {
        setSuccess(true);
      } else {
        setError(result.message || "Failed to reset password");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    }
  };

  if (!isValidToken) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-transparent to-black relative">
        <div className="bg-zinc-900 p-8 rounded-lg shadow-lg max-w-md w-full border border-zinc-800">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Invalid or Expired Link
          </h2>
          <p className="text-zinc-300 text-center mb-4">
            This password reset link is invalid or has expired. Please request a
            new password reset link.
          </p>
          <Link
            href="/password-reset"
            className="block w-full text-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Request New Reset Link
          </Link>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-transparent to-black relative">
        <div className="bg-zinc-900 p-8 rounded-lg shadow-lg max-w-md w-full border border-zinc-800">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Password Reset Successful!
          </h2>
          <p className="text-zinc-300 text-center mb-4">
            Your password has been updated successfully.
          </p>
          <Link
            href="/login"
            className="block w-full text-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Return to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-transparent to-black relative">
      <div className="bg-zinc-900 p-8 rounded-lg shadow-lg max-w-md w-full border border-zinc-800">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Reset Password
        </h2>
        {error && (
          <div className="mb-4 p-3 rounded bg-red-500/10 border border-red-500/20 text-red-500">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormInput
            {...register("newPassword")}
            id="newPassword"
            name="newPassword"
            label="New Password"
            type="password"
            error={errors.newPassword?.message}
            disabled={isSubmitting}
            required
          />
          <FormInput
            {...register("confirmPassword")}
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            error={errors.confirmPassword?.message}
            disabled={isSubmitting}
            required
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Resetting Password..." : "Reset Password"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-zinc-400">
          Remember your password?{" "}
          <Link href="/login" className="text-orange-500 hover:text-orange-400">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default PasswordResetForm;
