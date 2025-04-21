import { FullData, MainParams } from "@/app/lib/definitions";
import {
  GRAY_BACKGROUND_COLOR,
  SCHEDULE_ITEM,
  SCHEDULE_NAME,
  /* SCHEDULE_ITEM1,
  SCHEDULE_ITEM2,
  SCHEDULE_ITEM3,
  SCHEDULE_ITEM4,
  SCHEDULE_ITEM5,
  SCHEDULE_ITEM6, */
} from "@/app/lib/constants";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { ShowSCheduleGroupItem } from "./ShowScheduleGroupItem";
import { AddTextDescriptionDeleteFeatureButtons } from "../__commonComponents/_buttons/AddTextDescriptionDeleteFeatureButtons";

import styles from "./showScheduleGroup.module.css";
import { ShowSCheduleName } from "./ShowScheduleName";

export type Props = {
  isEdit: boolean;
  staticTexts: StaticTexts;
  groupData: FullData[];
  params: MainParams;
};

export const ShowScheduleGroup = ({
  isEdit,
  staticTexts,
  groupData,
  params,
}: Props) => {
  const name = groupData.find((item) => item.text_type === SCHEDULE_NAME);
  const items = groupData.filter((item) => item.text_type === SCHEDULE_ITEM);

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <ShowSCheduleName
          isEdit={isEdit}
          staticTexts={staticTexts}
          data={name}
          params={params}
        />
        <div className={styles.items}>
          {items.map((item) => {
            return (
              <ShowSCheduleGroupItem
                isEdit={isEdit}
                staticTexts={staticTexts}
                data={item}
                key={item.text_description_id}
                params={params}
              />
            );
          })}
        </div>
      </div>

      {isEdit ? (
        <AddTextDescriptionDeleteFeatureButtons
          deleteButtonText={staticTexts.delete ?? "N/A"}
          featureData={groupData}
          addButtonText={staticTexts.addGroupItem ?? "N/A"}
          textDescriptionType={SCHEDULE_ITEM}
        />
      ) : null}
    </div>
  );
};
