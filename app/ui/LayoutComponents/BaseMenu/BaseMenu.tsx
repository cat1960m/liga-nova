import { PageData } from "@/app/lib/definitions";
import { LinkBody } from "../LinkBody/LInkBody";
import styles from "./baseMenu.module.css";

export type Props = {
  pages: PageData[];
  lang: string;
};

export const BaseMenu = ({ pages, lang }: Props) => {
  return (
    <div className={styles.container}>
      {pages?.map((page) => {
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
  );
};
