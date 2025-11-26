import { FullData } from "@/app/lib/definitions";

import styles from "./showTitle.module.css";
import cn from "clsx";
import { ItemContainerUpdateDeleteTextDescription } from "@/app/ui/CommonComponents/_itemGroupContainer/ItemContainerUpdateDeleteTextDescription";
import { CountIndex, StaticTexts } from "@/app/dictionaries/definitions";

export type Props = {
  title: FullData;
  color: string;
  isEdit: boolean;
  staticTexts: StaticTexts;
  lang: string;
  countIndex: CountIndex | null;
};

export const ShowTitle = ({ isEdit, title, color, staticTexts, lang, countIndex }: Props) => {

  return (
    <ItemContainerUpdateDeleteTextDescription
      currentData={title}
      useItems={{ text: "simple" }}
      isEdit={isEdit}
      staticTexts={staticTexts}
      isChangeOrder={false}
      lang={lang}
      countIndex={countIndex}

    >
      <div className={cn(styles.group, { [styles.edit]: isEdit })}>
        <div className={styles.title} style={{ color }}>
          {title?.text_content ?? "N/A"}
        </div>
      </div>
    </ItemContainerUpdateDeleteTextDescription>
  );
};
