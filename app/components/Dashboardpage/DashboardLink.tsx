import Link from "next/link";
import { auth } from "@/app/auth";
async function DashboardLink({ className }: { className: string }) {
  const session = await auth();
  return (
    session?.user && (
      <Link href="/dashboard" className={className}>
        Dashboard
      </Link>
    )
  );
}

export default DashboardLink;
