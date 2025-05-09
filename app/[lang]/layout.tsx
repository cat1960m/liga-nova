import { getPageTitles } from "../lib/actions_fitness";
import { auth } from "@/app/auth";
import { ManageIconsModal } from "../ui/LayoutComponents/ManageIconsModal/ManageIconsModal";
import { MainMenu } from "../ui/LayoutComponents/MainMenu/MainMenu";
import styles from "./layout.module.css";
import { MobileMenu } from "../ui/LayoutComponents/MobileMenu/MobileMenu";
import { BaseMenu } from "../ui/LayoutComponents/BaseMenu/BaseMenu";
import { EditMode } from "../ui/LayoutComponents/EditMode/EditMode";

//export const experimental_ppr = true;

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
      <div className={styles.header}>
        <MainMenu
          mainPages={mainPages}
          isAuthenticated={isAuthenticated}
          lang={lang}
        />

        <BaseMenu pages={basePages} lang={lang} />
      </div>

      <div className={styles.headerMobile}>
        <MobileMenu basePages={basePages} mainPages={mainPages} lang={lang} />
      </div>

      <div className={styles.panel}>
        {isAuthenticated ? <ManageIconsModal lang={lang} /> : null}

        <EditMode isAuthenticated={isAuthenticated} />
      </div>

      <div id="parentModal" className={styles.body_container}>
        {children}
      </div>
    </div>
  );
}
