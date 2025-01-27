import { auth } from "@/app/auth";

async function DynamicUserIconBlur() {
  const session = await auth();

  return (
    <div>
      <div className="flex items-center gap-6">
        <p className="mt-0.5 font-bold text-lg">
          Welcome, {session ? session.user.userName : "Guest"}
        </p>
      </div>
    </div>
  );
}

export default DynamicUserIconBlur;
