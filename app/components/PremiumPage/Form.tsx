"use client";
import { useForm } from "react-hook-form";
import Button from "@/app/components/Button";
import { IFormInputs } from "@/app/components/InterfaceType";

function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>();

  function onSubmit(data: IFormInputs) {
    console.log(data);
  }

  return (
    <div className="bg-black text-white p-6 max-w-md ">
      <style jsx>{`
        /* Override autofill styles */
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          -webkit-background-clip: text;
          -webkit-text-fill-color: white !important;
          transition: background-color 5000s ease-in-out 0s;
          box-shadow: inset 0 0 20px 20px #000000;
        }
      `}</style>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="firstName" className="block mb-1">
            First Name *
          </label>
          <input
            id="firstName"
            {...register("firstName", { required: "⚠ First name is required" })}
            className="w-full bg-black border-b border-gray-600 py-2 focus:outline-none focus:border-white text-white"
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
            {...register("lastName", { required: "⚠ Last name is required" })}
            className="w-full bg-black border-b border-gray-600 py-2 focus:outline-none focus:border-white text-white"
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
            {...register("email", {
              required: "⚠ Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "⚠ Invalid email address",
              },
            })}
            className="w-full bg-black border-b border-gray-600 py-2 focus:outline-none focus:border-white text-white"
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
          />
        </div>

        <div className="flex items-center">
          <input
            id="subscribe"
            type="checkbox"
            {...register("subscribe")}
            className="accent-orange-500 mr-3 cursor-pointer"
          />
          <label
            htmlFor="subscribe"
            className="cursor-pointer font-thin text-gray-400"
          >
            Yes, subscribe me to your newsletter.
          </label>
        </div>
        <Button type="orange_submit_button">Subscribe</Button>
      </form>
    </div>
  );
}

export default Form;
