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

export const ShowSCheduleName = ({
  data,
  isEdit,
  staticTexts,
  params,
}: Props) => {
  if (!data) {
    return null;
  }

  return (
    <div className={styles.name}>
      {data?.text_content ?? "N/A"}
      {isEdit ? (
        <UpdateDeleteTextButtons
          staticTexts={staticTexts}
          currentData={data}
          isChangeOrder={data.text_type === SCHEDULE_ITEM}
          useItems={{
            text: "simple",
          }}
          params={params}
        />
      ) : null}
    </div>
  );
};
