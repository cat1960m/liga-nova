import { FullData } from "@/app/lib/definitions";

import styles from "./showDescription.module.css";
import cn from "clsx";
import { ItemContainerUpdateDeleteTextDescription } from "@/app/ui/CommonComponents/_itemGroupContainer/ItemContainerUpdateDeleteTextDescription";
import { StaticTexts } from "@/app/dictionaries/definitions";

export type Props = {
  isEdit: boolean;
  lang: string;
  staticTexts: StaticTexts;
  description: FullData;
  color: string;
};

export const ShowDescription = ({ staticTexts, isEdit, lang, description, color }: Props) => {
  return (
    <ItemContainerUpdateDeleteTextDescription
      currentData={description}
      useItems={{ text: "quill" }}
      isEdit={isEdit}
      staticTexts={staticTexts}
      lang={lang}
      isChangeOrder={false}
      countIndex={null}
    >
      <div className={cn(styles.group, { [styles.edit]: isEdit })}>
        <div className={styles.description_container}>
          <div className={styles.line} style={{ borderColor: color }} />
          <div style={{ color }}>
            <div
              dangerouslySetInnerHTML={{
                __html: description?.text_content ?? "N/A",
              }}
            />
          </div>
        </div>
      </div>
    </ItemContainerUpdateDeleteTextDescription>
  );
};
