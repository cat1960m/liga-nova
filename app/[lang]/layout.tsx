import SideNav from "@/app/ui/dashboard/sidenav";
import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import { getDictionary } from "./dictionaries";

export const experimental_ppr = true;

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: "en" | "ua" }>;
}) {
  const lang = (await params).lang ?? "ua";
  const dict = await getDictionary(lang); // en

  return (
    <div>
      <div>{lang}</div>
      {children}
    </div>
  );
}
