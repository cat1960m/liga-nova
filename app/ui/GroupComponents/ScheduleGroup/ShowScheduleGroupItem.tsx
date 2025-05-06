import { FullData } from "@/app/lib/definitions";
import { SCHEDULE_ITEM } from "@/app/lib/constants";
import { UpdateDeleteTextButtons } from "@/app/ui/CommonComponents/_buttons/UpdateDeleteTextButtons/UpdateDeleteTextButtons";

import styles from "./showScheduleGroup.module.css";
import { StaticTexts } from "@/app/dictionaries/definitions";

export type Props = {
  data?: FullData;
  lang: string;
  staticTexts: StaticTexts;
  isEdit: boolean;
};

export const ShowSCheduleGroupItem = ({
  data,
  staticTexts,
  lang,
  isEdit,
}: Props) => {
  if (!data) {
    return null;
  }

  return (
    <div className={styles.groupItem}>
      <div className={styles.item}>
        <div className={styles.days}>{data?.text_content ?? "N/A"}</div>
        <div className={styles.time}>{data?.value ?? "N/A"}</div>
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
          />
        </div>
      ) : null}
    </div>
  );
};
