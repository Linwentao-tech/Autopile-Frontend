import SignupFormClient from "./SignupFormClient";

export default function SignupForm() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-transparent to-black relative">
      <div className="bg-zinc-900 p-8 rounded-lg shadow-lg max-w-md w-full border border-zinc-800">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Create Account
        </h2>
        <SignupFormClient />
      </div>
    </div>
  );
}
