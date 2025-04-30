import Image from "next/image";
import Link from "next/link";
import { LinkBody } from "../LinkBody/LInkBody";
import { LangSelector } from "../LangSelector";
import { PageData } from "@/app/lib/definitions";
import styles from "./baseMenu.module.css";
import { LogInOut } from "../LogInOut";

export type Props = {
  mainPages: PageData[];
  isAuthenticated: boolean;
  lang: string;
};

export const BaseMenu = ({ mainPages, isAuthenticated, lang }: Props) => {
  return (
    <div className={styles.container}>
      <Link href={"/ua"}>
        <Image src="logo-2.svg" width={60} alt="logo" height={40} />
      </Link>

      <div className={styles.pages}>
        {mainPages?.map((page) => {
          return (
            <LinkBody
              pageName={page.name}
              isMain
              pageTitle={page.text_content}
              lang={lang}
              key={page.id}
            />
          );
        })}
      </div>

      <div className={styles.right}>
        <LangSelector />

        <LogInOut isAuthenticated={isAuthenticated} />
      </div>
    </div>
  );
};
