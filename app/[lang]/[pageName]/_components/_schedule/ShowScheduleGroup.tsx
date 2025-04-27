import { FullData, MainParams } from "@/app/lib/definitions";
import {
  SCHEDULE_ITEM,
  SCHEDULE_NAME,
} from "@/app/lib/constants";
import { ShowSCheduleGroupItem } from "./ShowScheduleGroupItem";

import styles from "./showScheduleGroup.module.css";
import { ShowSCheduleName } from "./ShowScheduleName";
import { ItemContainerAddTextDescriptionDeleteFeature } from "../__commonComponents/_itemGroupContainer/ItemContainerAddTextDescriptionDeleteFeature";

export type Props = {
  groupData: FullData[];
  params: MainParams;
};

export const ShowScheduleGroup = ({
  groupData,
  params,
}: Props) => {
  const name = groupData.find((item) => item.text_type === SCHEDULE_NAME);
  const items = groupData.filter((item) => item.text_type === SCHEDULE_ITEM);
  const { isEdit, staticTexts } = params;


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
          data={name}
          params={params}
        />
        <div className={styles.items}>
          {items.map((item) => {
            return (
              <ShowSCheduleGroupItem
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
