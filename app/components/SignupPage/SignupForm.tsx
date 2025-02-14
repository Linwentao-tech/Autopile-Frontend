import SignupFormClient from "./SignupFormClient";

export default function SignupForm() {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center bg-gradient-to-b from-transparent to-black relative">
      <div className="w-full max-w-[320px] sm:max-w-[400px] md:max-w-[480px] lg:max-w-[512px] mx-auto">
        <div className="bg-zinc-900 p-4 sm:p-6 md:p-8 rounded-lg shadow-lg w-full border border-zinc-800">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6 text-center">
            Create Account
          </h2>
          <SignupFormClient />
        </div>
      </div>
    </div>
  );
}
