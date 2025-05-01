import { FullData, MainParams } from "@/app/lib/definitions";
import { SCHEDULE_ITEM, SCHEDULE_NAME } from "@/app/lib/constants";
import { UpdateDeleteTextButtons } from "@/app/ui/CommonComponents/_buttons/UpdateDeleteTextButtons";

import styles from "./showScheduleGroup.module.css";

export type Props = {
  data?: FullData;
  params: MainParams;
};

export const ShowSCheduleName = ({ data, params }: Props) => {
  if (!data) {
    return null;
  }

  return (
    <div className={styles.name}>
      {data?.text_content ?? "N/A"}
      {params.isEdit ? (
        <UpdateDeleteTextButtons
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
