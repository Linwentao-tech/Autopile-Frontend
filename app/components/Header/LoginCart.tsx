import { redirect } from "next/navigation";
import { auth } from "@/app/auth";
import { signOutAction } from "@/app/actions/authActions";
async function LoginCart() {
  const session = await auth();

  const handleAction = async () => {
    "use server";

    if (session?.user) {
      await signOutAction();
    } else {
      redirect("/login");
    }
  };

  return (
    <form action={handleAction}>
      <button type="submit">
        <div className="flex items-center justify-center space-x-2 mt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
          <p>{session?.user ? "Log out" : "Log in"}</p>
        </div>
      </button>
    </form>
  );
}

export default LoginCart;
