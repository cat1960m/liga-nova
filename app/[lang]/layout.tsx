import { getDictionary } from "./dictionaries";
import { getPageTitles } from "../lib/actions_fitness";
import Link from "next/link";
import { LangSelector } from "./_components/LangSelector";
import { LinkBody } from "./_components/LInkBody";

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
  const pages = await getPageTitles(lang);

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
        <LangSelector />
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
      <div
        id="parentModal"
        style={{ position: "relative", minHeight: "300px" }}
      >
        {children}
      </div>
    </div>
  );
}
