import { getDictionary } from "./dictionaries";
import { getPageTitles } from "../lib/actions_fitness";
import Link from "next/link";
import { LangSelector } from "./_components/LangSelector";
import { LinkBody } from "./_components/LInkBody";
import { ArrowRightIcon, PowerIcon } from "@heroicons/react/24/outline";
import { auth, signOut } from "@/app/auth";
import { IsEditRegime } from "./[pageName]/_components/_clientComponents/IsEditRegime";

export const experimental_ppr = true;

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: "en" | "ua"; pageName: string }>;
}) {
  const paramsData = await params;

  const lang = paramsData.lang ?? "ua";
  const pages = await getPageTitles(lang);
  const res = await auth();
  const isAuthenticated = !!res?.user;

  if (!pages) {
    return;
  }

  const mainPages = pages?.filter((page) => page.subtype === "header1");
  const basePages = pages?.filter((page) => page.subtype === "header2");

  return (
    <div>
      <div
        style={{
          display: "flex",
          width: "100%",
          minHeight: "80px",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid black",
          padding: "20px",
          gap: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 2,
          }}
        >
          {mainPages?.map((page) => {
            return (
              <Link href={`/${lang}/${page.name}`} key={page.id}>
                <div key={page.id}>
                  <LinkBody
                    pageName={page.name}
                    isMain
                    pageTitle={page.text_content}
                  />
                </div>
              </Link>
            );
          })}
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <LangSelector />
          {isAuthenticated ? (
            <form
              action={async () => {
                "use server";
                await signOut();
                //  await signOut({ redirectTo: "/" });
              }}
            >
              <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                <PowerIcon className="w-6" />
                <div className="hidden md:block">Sign Out</div>
              </button>
            </form>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
            >
              <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
            </Link>
          )}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
          alignItems: "center",
          borderBottom: "1px solid lightgray",
          width: "100%",
          padding: "20px",
          minHeight: "80px",
        }}
      >
        {basePages?.map((page) => {
          return (
            <Link href={`/${lang}/${page.name}`} key={page.id}>
              <div key={page.id}>
                <LinkBody pageName={page.name} pageTitle={page.text_content} />
              </div>
            </Link>
          );
        })}
      </div>

      {isAuthenticated ? <IsEditRegime /> : null}

      <div
        id="parentModal"
        style={{ position: "relative", minHeight: "300px" }}
      >
        {children}
      </div>
    </div>
  );
}
