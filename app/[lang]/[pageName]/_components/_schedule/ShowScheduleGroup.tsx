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

export type Props = {
  isEdit: boolean;
  staticTexts: StaticTexts;
  groupData: FullData[];
  parentFeatureId: number;
};

export const ShowScheduleGroup = ({
  isEdit,
  staticTexts,
  groupData,
  parentFeatureId,
}: Props) => {
  const featureId = groupData[0]?.id;

  const name = groupData.find((item) => item.text_type === SCHEDULE_NAME);
  const items = groupData.filter((item) => item.text_type === SCHEDULE_ITEM);

  /*  const style1 = {
    backgroundColor: "#d3d3d3",
    borderRadius: "10px 0 0 10px",
    border: "1px solid blue",
    borderRight: "none",
  };

  const style2 = {
    backgroundColor: GRAY_BACKGROUND_COLOR,
    borderTop: "1px solid blue",
    borderBottom: "1px solid blue",
    borderRight: "1px solid #D3D3D3",
  };

  const style3 = {
    backgroundColor: GRAY_BACKGROUND_COLOR,
    borderRadius: "0 10px 10px 0",
    border: "1px solid blue",
    borderLeft: "none",
    width: "100%",
  }; */

  if (!featureId) {
    return null;
  }

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.name}>
          <ShowSCheduleGroupItem
            isEdit={isEdit}
            staticTexts={staticTexts}
            data={name}
          />
        </div>
        <div className={styles.items}>
          {items.map((item) => {
            return (
              <ShowSCheduleGroupItem
                isEdit={isEdit}
                staticTexts={staticTexts}
                data={item}
                key={item.text_description_id}
              />
            );
          })}
        </div>
      </div>

      {isEdit ? (
        <AddTextDescriptionDeleteFeatureButtons
          featureId={featureId}
          deleteButtonText={staticTexts.delete ?? "N/A"}
          featureData={groupData}
          parentFeatureId={parentFeatureId}
          addButtonText={staticTexts.addGroupItem ?? "N/A"}
          textDescriptionType={SCHEDULE_ITEM}
        />
      ) : null}
    </div>
  );
};
