import styles from "./infoCheckGroupItem.module.css";
import { CountIndex, StaticTexts } from "@/app/dictionaries/definitions";
import { INFO_CHECK_HEADER } from "@/app/lib/constants";
import { FullData } from "@/app/lib/definitions";
import { ItemContainerUpdateDeleteTextDescription } from "@/app/ui/CommonComponents/_itemGroupContainer/ItemContainerUpdateDeleteTextDescription";

export type Props = {
  currentData: FullData;
  isEdit: boolean;
  lang: string;
  staticTexts: StaticTexts;
  countIndex: CountIndex | null;
};

export const InfoCheckGroupItem = ({
  currentData,
  isEdit,
  staticTexts,
  lang,
  countIndex
}: Props) => {
  const isHeader = currentData.text_type === INFO_CHECK_HEADER;
  const text = currentData.text_content ?? "N/A";

  return (
    <div className={`${styles.container} ${isHeader ? styles.header : ""}`}>
      <ItemContainerUpdateDeleteTextDescription
        useItems={{ text: "simple" }}
        isEdit={isEdit}
        staticTexts={staticTexts}
        lang={lang}
        currentData={currentData}
        isChangeOrder={!isHeader}
        isChangeOrderHorizontal={false}
        countIndex={countIndex}
      >
        <div className={styles.itemWrapper}>
          {!isHeader ? <div className={styles.icon}>v</div> : null}
          <div>{text}</div>
        </div>
      </ItemContainerUpdateDeleteTextDescription>
    </div>
  );
};
