import { FullData, MainParams } from "@/app/lib/definitions";
import { SCHEDULE_ITEM, SCHEDULE_NAME } from "@/app/lib/constants";
import { ShowSCheduleGroupItem } from "./ShowScheduleGroupItem";

import styles from "./showScheduleGroup.module.css";
import { ShowSCheduleName } from "./ShowScheduleName";
import { ItemContainerAddTextDescriptionDeleteFeature } from "@/app/ui/CommonComponents/_itemGroupContainer/ItemContainerAddTextDescriptionDeleteFeature";
import { getIsEditNoDelete } from "@/app/lib/utils";
import { CountIndex } from "@/app/dictionaries/definitions";

export type Props = {
  groupData: FullData[];
  params: MainParams;
  countIndex: CountIndex;
};

export const ShowScheduleGroup = ({ groupData, params, countIndex }: Props) => {
  const name = groupData.find((item) => item.text_type === SCHEDULE_NAME);
  const items = groupData.filter((item) => item.text_type === SCHEDULE_ITEM);
  const { staticTexts, lang } = params;
  const { isEdit, noDelete } = getIsEditNoDelete(params);

  return (
    <ItemContainerAddTextDescriptionDeleteFeature
      deleteButtonText={staticTexts.delete ?? "N/A"}
      featureData={groupData}
      addButtonText={staticTexts.addGroupItem ?? "N/A"}
      textDescriptionType={SCHEDULE_ITEM}
      isEdit={isEdit}
      isChangeOrderHorizontal={false}
      marginTop={20}
      noDelete={noDelete}
      countIndex={countIndex}
    >
      <div className={styles.container}>
        <ShowSCheduleName
          data={name}
          staticTexts={staticTexts}
          lang={lang}
          isEdit={isEdit}
        />
        <div className={styles.items}>
          {items.map((item, index) => {
            return (
              <ShowSCheduleGroupItem
                data={item}
                key={item.text_description_id}
                staticTexts={staticTexts}
                lang={lang}
                isEdit={isEdit}
                countIndex={{ count: items.length, index }}
              />
            );
          })}
        </div>
      </div>
    </ItemContainerAddTextDescriptionDeleteFeature>
  );
};
