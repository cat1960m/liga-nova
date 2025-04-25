import { FullData, MainParams } from "@/app/lib/definitions";
import {
  SCHEDULE_ITEM,
  SCHEDULE_NAME,
} from "@/app/lib/constants";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { ShowSCheduleGroupItem } from "./ShowScheduleGroupItem";

import styles from "./showScheduleGroup.module.css";
import { ShowSCheduleName } from "./ShowScheduleName";
import { ItemContainerAddTextDescriptionDeleteFeature } from "../__commonComponents/_itemGroupContainer/ItemContainerAddTextDescriptionDeleteFeature";

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
    <ItemContainerAddTextDescriptionDeleteFeature
      deleteButtonText={staticTexts.delete ?? "N/A"}
      featureData={groupData}
      addButtonText={staticTexts.addGroupItem ?? "N/A"}
      textDescriptionType={SCHEDULE_ITEM}
      isEdit={isEdit}
      isChangeOrderHorizontal={false}
      marginTop={20}
    >
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
    </ItemContainerAddTextDescriptionDeleteFeature>
  );
};
