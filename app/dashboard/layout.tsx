import SideNav from "@/app/ui/dashboard/sidenav";
import { auth } from "@/app/auth";
import { redirect } from "next/navigation";

export const experimental_ppr = true;

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const res = await auth();
  if (!res?.user) {
    // redirect("/login");
  }

  //console.log("-------------Res", res);

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
