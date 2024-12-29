import Link from "next/link";
import Firework from "../components/Firework";

export const metadata = {
  title: "Payment Success",
  description: "Payment Success Page",
};
export default function SuccessPage() {
  return (
    <>
      <Firework />
      <div className="flex flex-col items-center justify-center min-h-screen text-white">
        <h1 className="text-4xl font-bold mb-4">
          Thank you for your purchase!
        </h1>
        <p className="mb-8">
          Your order has been successfully processed. Check your email!
        </p>
        <Link
          href="/"
          className="bg-red-600 text-white py-2 px-4 rounded-full hover:bg-red-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </>
  );
}
