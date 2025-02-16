import EmailConfirmationCheck from "./EmailConfirmationCheck";
import DashboardContent from "./DashboardContent";
import { getCurrentUser } from "@/app/actions/gettingUserInfo";
import { redirect } from "next/navigation";

async function Dashboard() {
  const userInfo = await getCurrentUser();

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
