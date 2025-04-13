import { FullData } from "@/app/lib/definitions";
import { SCHEDULE_ITEM, SCHEDULE_NAME } from "@/app/lib/constants";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { UpdateDeleteTextButtons } from "../_buttons/UpdateDeleteTextButtons";

import styles from "./showScheduleGroup.module.css";

export type Props = {
  data?: FullData;
  isEdit: boolean;
  staticTexts: StaticTexts;
};

export const ShowSCheduleGroupItem = ({ data, isEdit, staticTexts }: Props) => {
  if (!data) {
    return null;
  }

  const isName = data.text_type === SCHEDULE_NAME;

  return (
    <div className={styles.groupItem}>
      {isName ? (
        <div className={styles.name}>{data?.text_content ?? "N/A"}</div>
      ) : (
        <div className={styles.item}>
          <div className={styles.days}>{data?.text_content ?? "N/A"}</div>
          <div className={styles.time}>{data?.value ?? "N/A"}</div>
        </div>
      )}
      {isEdit ? (
        <div className={styles.itemEdit}>
          <UpdateDeleteTextButtons
            staticTexts={staticTexts}
            currentData={data}
            valueTitle={!isName ? staticTexts.time : undefined}
            useValue={!isName}
            changeOrderTextType={SCHEDULE_ITEM}
            flexDirection={isName ? "column" : "row"}
          />
        </div>
      ) : null}
    </div>
  );
};
