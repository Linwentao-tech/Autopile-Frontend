"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import FormInput from "../FormInputs/FormInput";
import { signUp } from "@/app/actions/signUp";
import { signInAction } from "@/app/actions/authActions";

// Schema remains the same
const signupSchema = z
  .object({
    userName: z
      .string()
      .min(1, "Username is required")
      .min(3, "Username must be at least 3 characters")
      .max(100, "Username must not exceed 100 characters")
      .regex(
        /^[a-zA-Z0-9._-]+$/,
        "Username can only contain letters, numbers, dots, underscores, and hyphens"
      ),
    firstName: z
      .string()
      .min(1, "First name is required")
      .max(100, "First name must not exceed 100 characters")
      .regex(
        /^[a-zA-Z\s-']+$/,
        "First name can only contain letters, spaces, hyphens, and apostrophes"
      ),
    lastName: z
      .string()
      .min(1, "Last name is required")
      .max(100, "Last name must not exceed 100 characters")
      .regex(
        /^[a-zA-Z\s-']+$/,
        "Last name can only contain letters, spaces, hyphens, and apostrophes"
      ),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email format")
      .max(100, "Email must not exceed 100 characters"),
    phoneNumber: z
      .string()
      .min(1, "Phone number is required")
      .max(20, "Phone number must not exceed 20 characters")
      .regex(
        /^[0-9]{8,20}$/,
        "Invalid phone number format. Use a standard numeric format (e.g., 0123456789)"
      ),
    password: z
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
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignupFormInputs = z.infer<typeof signupSchema>;

export default function SignupFormClient() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      userName: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignupFormInputs) => {
    try {
      setError(null);
      setIsSubmitting(true);

      const response = await signUp({
        firstName: data.firstName,
        lastName: data.lastName,
        userName: data.userName,
        phoneNumber: data.phoneNumber,
        email: data.email,
        password: data.password,
      });
      const result = await response;
      console.log("result", result);
      if (!result.success) {
        setError(result.message || "Signup failed");
      } else {
        setIsRedirecting(true);
        await signInAction({
          email: data.email,
          password: data.password,
        });
        router.push("/dashboard");
        router.refresh();
      }
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {error && (
        <div className="mb-4 p-2 sm:p-3 rounded text-sm sm:text-base bg-red-500/10 border border-red-500/20 text-red-500">
          {error}
        </div>
      )}
      <form
        className="space-y-4 sm:space-y-5 md:space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid gap-4 sm:gap-5 md:gap-6">
          <FormInput
            {...register("userName")}
            id="userName"
            name="userName"
            label="Username"
            type="text"
            error={errors.userName?.message}
            disabled={isSubmitting}
            required
            className="text-sm sm:text-base"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
            <FormInput
              {...register("firstName")}
              id="firstName"
              name="firstName"
              label="First Name"
              type="text"
              error={errors.firstName?.message}
              disabled={isSubmitting}
              required
              className="text-sm sm:text-base"
            />

            <FormInput
              {...register("lastName")}
              id="lastName"
              name="lastName"
              label="Last Name"
              type="text"
              error={errors.lastName?.message}
              disabled={isSubmitting}
              required
              className="text-sm sm:text-base"
            />
          </div>

          <FormInput
            {...register("email")}
            id="email"
            name="email"
            label="Email"
            type="email"
            error={errors.email?.message}
            disabled={isSubmitting}
            required
            className="text-sm sm:text-base"
          />

          <FormInput
            {...register("phoneNumber")}
            id="phoneNumber"
            name="phoneNumber"
            label="Phone Number"
            type="tel"
            error={errors.phoneNumber?.message}
            disabled={isSubmitting}
            required
            className="text-sm sm:text-base"
          />

          <FormInput
            {...register("password")}
            id="password"
            name="password"
            label="Password"
            type="password"
            error={errors.password?.message}
            disabled={isSubmitting}
            required
            className="text-sm sm:text-base"
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
            className="text-sm sm:text-base"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || isRedirecting}
          className="w-full flex justify-center py-2 sm:py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm sm:text-base font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isSubmitting
            ? "Signing up..."
            : isRedirecting
            ? "Redirecting..."
            : "Sign up"}
        </button>
      </form>

      <p className="mt-4 sm:mt-6 text-center text-sm sm:text-base text-zinc-400">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-orange-500 hover:text-orange-400 transition-colors duration-200"
        >
          Sign in
        </Link>
      </p>
    </>
  );
}
