"use client";

import React, { forwardRef } from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
  error?: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      id,
      name,
      label,
      type = "text",
      required = true,
      className = "",
      disabled = false,
      error,
      ...props
    },
    ref
  ) => {
    return (
      <div>
        <label htmlFor={id} className="block text-sm font-medium text-zinc-300">
          {label}
        </label>
        <input
          ref={ref}
          type={type}
          id={id}
          name={name}
          required={required}
          disabled={disabled}
          className={`mt-1 block w-full rounded-md bg-zinc-800 border ${
            error ? "border-red-500" : "border-zinc-700"
          } text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed [&:-webkit-autofill]:bg-zinc-800 [&:-webkit-autofill]:text-white [&:-webkit-autofill]:shadow-[0_0_0_30px_rgb(39,39,42)_inset] [-webkit-text-fill-color:white] [&:-webkit-autofill]:[-webkit-text-fill-color:white] ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
