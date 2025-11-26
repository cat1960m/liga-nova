import { FullData } from "@/app/lib/definitions";
import { ItemContainerUpdateDeleteTextDescription } from "@/app/ui/CommonComponents/_itemGroupContainer/ItemContainerUpdateDeleteTextDescription";
import cn from "clsx";
import styles from "./showBody.module.css";
import { StaticTexts } from "@/app/dictionaries/definitions";
export type Props = {
  isMain: boolean;
  textBody: FullData;
  isEdit: boolean;
  lang: string;
  staticTexts: StaticTexts;
};

export const ShowBody = ({
  isMain,
  textBody,
  isEdit,
  staticTexts,
  lang,
}: Props) => {
  const text = textBody?.text_content ?? "N/A";
  return (
    <ItemContainerUpdateDeleteTextDescription
      currentData={textBody}
      useItems={{ text: "area" }}
      isEdit={isEdit}
      staticTexts={staticTexts}
      lang={lang}
      isChangeOrder={false}
      countIndex={null}
    >
      <div className={styles.mainName}>
        {isMain ? <div className={styles.start}>{`"`}</div> : null}
        <div className={cn(styles.text, { [styles.main]: isMain })}>{text}</div>
        {isMain ? <div className={styles.end}>{`"`}</div> : null}
      </div>
    </ItemContainerUpdateDeleteTextDescription>
  );
};
