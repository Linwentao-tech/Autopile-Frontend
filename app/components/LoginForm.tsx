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
    <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-transparent to-black relative">
      <div className="bg-zinc-900 p-8 rounded-lg shadow-lg max-w-md w-full border border-zinc-800">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Login to AutoPile
        </h2>
        {error && (
          <div className="mb-4 p-3 rounded bg-red-500/10 border border-red-500/20 text-red-500">
            {error}
          </div>
        )}
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email" className="block text-sm text-zinc-300">
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              disabled={isSubmitting}
              className="mt-1 block w-full rounded-md border border-zinc-700 bg-zinc-800 text-white shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm px-3 py-2"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-zinc-300">
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              disabled={isSubmitting}
              className="mt-1 block w-full rounded-md border border-zinc-700 bg-zinc-800 text-white shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm px-3 py-2"
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
              className="text-sm text-orange-500 hover:text-orange-400"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-zinc-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-orange-500 hover:text-orange-400"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
