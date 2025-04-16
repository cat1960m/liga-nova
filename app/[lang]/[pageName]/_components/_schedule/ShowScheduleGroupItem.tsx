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
            isChangeOrder={data.text_type === SCHEDULE_ITEM}
            flexDirection={isName ? "column" : "row"}
            useItems={{ text: "simple", value: !isName ? "time" : undefined }}
            params={params}
          />
        </div>
      ) : null}
    </div>
  );
};
