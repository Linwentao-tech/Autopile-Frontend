"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signInAction } from "@/app/actions/authActions";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      setError(null);
      setIsSubmitting(true);

      const result = await signInAction({
        email: data.email,
        password: data.password,
      });

      if (!result.success) {
        setError(result.message || "Login failed");
        return;
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Login error:", error);
      setError("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg bg-zinc-900 p-6 sm:p-8 lg:p-10 rounded-lg shadow-lg border border-zinc-800">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 sm:mb-6 lg:mb-8 text-center">
          Login to AutoPile
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
          <div>
            <label
              htmlFor="email"
              className="block text-sm sm:text-base text-zinc-300 mb-1"
            >
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              disabled={isSubmitting}
              className="mt-1 block w-full rounded-md border border-zinc-700 bg-zinc-800 text-white shadow-sm 
                       focus:border-orange-500 focus:ring-orange-500 
                       text-sm sm:text-base px-3 py-2 sm:py-2.5"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm sm:text-base text-zinc-300 mb-1"
            >
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              disabled={isSubmitting}
              className="mt-1 block w-full rounded-md border border-zinc-700 bg-zinc-800 text-white shadow-sm 
                       focus:border-orange-500 focus:ring-orange-500 
                       text-sm sm:text-base px-3 py-2 sm:py-2.5"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-end">
            <Link
              href="/password-reset"
              className="text-xs sm:text-sm text-orange-500 hover:text-orange-400 transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2 sm:py-2.5 px-4 border border-transparent rounded-md shadow-sm 
                     text-sm sm:text-base font-medium text-white bg-orange-600 hover:bg-orange-700 
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-colors duration-200"
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-zinc-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-orange-500 hover:text-orange-400 transition-colors"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
