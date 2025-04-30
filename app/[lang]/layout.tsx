import { getPageTitles } from "../lib/actions_fitness";
import Link from "next/link";
import { LinkBody } from "./_layoutComponents/LinkBody/LInkBody";
import { auth, signOut } from "@/app/auth";
import { EditRegime } from "./_layoutComponents/EditRegime";
import { ManageIconsModal } from "./_layoutComponents/ManageIconsModal/ManageIconsModal";
import { BaseMenu } from "./_layoutComponents/BaseMenu/BaseMenu";
import styles from "./layout.module.css";

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
      <BaseMenu
        mainPages={mainPages}
        isAuthenticated={isAuthenticated}
        lang={lang}
      />
      <div className={styles.basePages}>
        {basePages?.map((page) => {
          return (
            <LinkBody
              pageName={page.name}
              pageTitle={page.text_content}
              lang={lang}
              key={page.id}
            />
          );
        })}
      </div>

      <div className={styles.edit_panel}>
        {isAuthenticated ? <ManageIconsModal lang={lang} /> : null}

        {isAuthenticated ? <EditRegime /> : null}
      </div>

      <div id="parentModal" className={styles.body_container}>
        {children}
      </div>
    </div>
  );
}
