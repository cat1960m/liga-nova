import { FullData, MainParams } from "@/app/lib/definitions";
import { SCHEDULE_ITEM, SCHEDULE_NAME } from "@/app/lib/constants";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { UpdateDeleteTextButtons } from "../__commonComponents/_buttons/UpdateDeleteTextButtons";

import styles from "./showScheduleGroup.module.css";

export type Props = {
  data?: FullData;
  isEdit: boolean;
  staticTexts: StaticTexts;
  params: MainParams;
};

export const ShowSCheduleGroupItem = ({
  data,
  isEdit,
  staticTexts,
  params,
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
            staticTexts={staticTexts}
            currentData={data}
            isChangeOrder={data.text_type === SCHEDULE_ITEM}
            useItems={{
              text: "simple",
              value:"time",
            }}
            params={params}
          />
        </div>
      ) : null}
    </div>
  );
};
