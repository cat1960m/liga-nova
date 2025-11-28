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

export const ShowSCheduleName = ({
  data,
  lang,
  staticTexts,
  isEdit,
}: Props) => {
  if (!data) {
    return null;
  }

  return (
    <div className={styles.name}>
      {data?.text_content ?? "N/A"}
      {isEdit ? (
        <UpdateDeleteTextButtons
          currentData={data}
          isChangeOrder={data.text_type === SCHEDULE_ITEM}
          useItems={{
            text: "simple",
          }}
          staticTexts={staticTexts}
          lang={lang}
          countIndex={null}
        />
      ) : null}
    </div>
  );
};
