"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Button from "@/app/components/Button";
import { sendEmail } from "@/app/actions/email";
import { showToast } from "@/app/components/ToastMessage";
import { useState } from "react";

const formSchema = z.object({
  firstName: z
    .string()
    .min(1, "⚠ First name is required")
    .max(50, "⚠ First name must be less than 50 characters"),
  lastName: z
    .string()
    .min(1, "⚠ Last name is required")
    .max(50, "⚠ Last name must be less than 50 characters"),
  email: z
    .string()
    .min(1, "⚠ Email is required")
    .email("⚠ Invalid email address"),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^[0-9+\-\s()]*$/.test(val), {
      message: "⚠ Invalid phone number format",
    }),
});

type FormData = z.infer<typeof formSchema>;

function Form() {
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setServerError(null);
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value?.toString() || "");
      });

      const result = await sendEmail(formData);

      if (result.success) {
        showToast.success("Successfully subscribed to our newsletter!");
        reset();
      } else {
        setServerError(
          result.error || "Failed to subscribe. Please try again."
        );
        showToast.error("Failed to subscribe. Please try again.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setServerError("An unexpected error occurred. Please try again.");
      showToast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-black text-white p-6 max-w-md">
      <style jsx>{`
        /* Override autofill styles */
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          -webkit-background-clip: text;
          -webkit-text-fill-color: white !important;
          transition: background-color 5000s ease-in-out 0s;
          box-shadow: inset 0 0 20px 20px rgb(0, 0, 0) !important;
        }
      `}</style>

      {serverError && (
        <div className="mb-4 p-3 rounded bg-red-500/10 border border-red-500/20 text-red-500">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="firstName" className="block mb-1">
            First Name *
          </label>
          <input
            id="firstName"
            {...register("firstName")}
            className="w-full bg-black border-b border-gray-600 py-2 focus:outline-none focus:border-white text-white"
            disabled={isSubmitting}
          />
          {errors.firstName && (
            <span className="text-red-500 text-sm">
              {errors.firstName.message}
            </span>
          )}
        </div>

        <div>
          <label htmlFor="lastName" className="block mb-1">
            Last Name *
          </label>
          <input
            id="lastName"
            {...register("lastName")}
            className="w-full bg-black border-b border-gray-600 py-2 focus:outline-none focus:border-white text-white"
            disabled={isSubmitting}
          />
          {errors.lastName && (
            <span className="text-red-500 text-sm">
              {errors.lastName.message}
            </span>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block mb-1">
            Email *
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="w-full bg-black border-b border-gray-600 py-2 focus:outline-none focus:border-white text-white"
            disabled={isSubmitting}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block mb-1">
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            {...register("phone")}
            className="w-full bg-black border-b border-gray-600 py-2 focus:outline-none focus:border-white text-white"
            disabled={isSubmitting}
          />
          {errors.phone && (
            <span className="text-red-500 text-sm">{errors.phone.message}</span>
          )}
        </div>

        <Button type="orange_submit_button" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Subscribe"}
        </Button>
      </form>
    </div>
  );
}

export default Form;
