import { redirect } from "next/navigation";
import { auth } from "../auth";

export const metadata = {
  title: "Dashboard",
  description: "Dashboard Page",
};
async function page() {
  const session = await auth();
  if (!session) {
    redirect("/");
  }

  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}

export default page;
