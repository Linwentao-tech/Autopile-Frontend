import EmailConfirmationCheck from "./EmailConfirmationCheck";
import DashboardContent from "./DashboardContent";
import { getCurrentUser } from "@/app/actions/gettingUserInfo";
import { redirect } from "next/navigation";
import { auth } from "@/app/auth";

async function Dashboard() {
  const session = await auth();
  console.log("session", session);
  const userInfo = await getCurrentUser();
  console.log("userInfo", userInfo);
  if (!userInfo) {
    redirect("/");
  }

  return (
    <>
      <EmailConfirmationCheck
        isEmailConfirmed={userInfo!.emailConfirmed}
        userEmail={userInfo!.email!}
      />
      <DashboardContent />
    </>
  );
}
export default Dashboard;

export const revalidate = 0;
