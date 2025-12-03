"use client";

import { FullData, PreviewParams } from "@/app/lib/definitions";
import { SCHEDULE_ITEM } from "@/app/lib/constants";
import { UpdateDeleteTextButtons } from "@/app/ui/CommonComponents/_buttons/UpdateDeleteTextButtons/UpdateDeleteTextButtons";

import styles from "./showScheduleGroup.module.css";
import { CountIndex, StaticTexts } from "@/app/dictionaries/definitions";

export type Props = {
  data?: FullData;
  lang: string;
  staticTexts: StaticTexts;
  isEdit: boolean;
  countIndex: CountIndex;
};

export const ShowSCheduleGroupItem = ({
  data,
  staticTexts,
  lang,
  isEdit,
  countIndex,
}: Props) => {
  if (!data) {
    return null;
  }

  const preview = ({value, text}: PreviewParams) => {
    return (
      <div className={styles.preview}>
          <div className={styles.item}>
            <div className={styles.days}>{text ?? "N/A"}</div>
            <div className={styles.time}>{value ?? "N/A"}</div>
          </div>
      </div>
    ); 
  };

  return (
    <div className={styles.groupItem}>
      <div className={styles.item}>
        <div className={styles.days}>{data.text_content ?? "N/A"}</div>
        <div className={styles.time}>{data.value ?? "N/A"}</div>
      </div>
      {isEdit ? (
        <div className={styles.itemEdit}>
          <UpdateDeleteTextButtons
            currentData={data}
            isChangeOrder={data.text_type === SCHEDULE_ITEM}
            useItems={{
              text: "simple",
              value: "time",
            }}
            staticTexts={staticTexts}
            lang={lang}
            countIndex={countIndex}
            preview={preview}
          />
        </div>
      ) : null}
    </div>
  );
};
