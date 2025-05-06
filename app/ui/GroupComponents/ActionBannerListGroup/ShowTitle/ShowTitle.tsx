import { FullData } from "@/app/lib/definitions";

import styles from "./showTitle.module.css";
import cn from "clsx";
import { ItemContainerUpdateDeleteTextDescription } from "@/app/ui/CommonComponents/_itemGroupContainer/ItemContainerUpdateDeleteTextDescription";
import { StaticTexts } from "@/app/dictionaries/definitions";

export type Props = {
  title: FullData;
  color: string;
  isEdit: boolean;
  staticTexts: StaticTexts;
  lang: string;
};

export const ShowTitle = ({ isEdit, title, color, staticTexts, lang }: Props) => {

  return (
    <ItemContainerUpdateDeleteTextDescription
      currentData={title}
      useItems={{ text: "simple" }}
      isEdit={isEdit}
      staticTexts={staticTexts}
      isChangeOrder={false}
      lang={lang}
    >
      <div className={cn(styles.group, { [styles.edit]: isEdit })}>
        <div className={styles.title} style={{ color }}>
          {title?.text_content ?? "N/A"}
        </div>
      </div>
    </ItemContainerUpdateDeleteTextDescription>
  );
};
