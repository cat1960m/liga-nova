"use client";

import { StaticTexts } from "@/app/dictionaries/definitions";
import { FullData, MainParams } from "@/app/lib/definitions";
import { IMAGE_ACTIONS_ITEM, TOOLTIP } from "@/app/lib/constants";
import cn from "clsx";

import styles from "./imageActions.module.css";
import { useState } from "react";
import { ImageActionGroupItem } from "./ImageAtionGroupItem";
import { ItemContainerAddTextDescriptionDeleteFeature } from "../__commonComponents/_itemGroupContainer/ItemContainerAddTextDescriptionDeleteFeature";

export type Props = {
  groupData: FullData[];
  staticTexts: StaticTexts;
  isEdit: boolean;
  params: MainParams;
};
//shares page
export const ImageActionsGroup = ({
  groupData,
  isEdit,
  staticTexts,
  params,
}: Props) => {
  const [isModalShown, setIsModalShown] = useState<boolean>(false);
  const groupDataMain = groupData.filter(
    (item) => item.content_type !== TOOLTIP
  );

  const changeModalState = (state: boolean) => setIsModalShown(state);

  return (
    <ItemContainerAddTextDescriptionDeleteFeature
      isEdit={isEdit}
      featureData={groupData}
      deleteButtonText={staticTexts.delete ?? "N/A"}
      addButtonText={staticTexts.addGroupItem ?? "N/A"}
      textDescriptionType={IMAGE_ACTIONS_ITEM}
      isChangeOrderHorizontal={false}
      marginTop={20}
    >
      <div className={cn(styles.container)}>
        {groupDataMain.map((item) => (
          <div
            className={cn(styles.itemContainer)}
            key={item.text_description_id}
          >
            <ImageActionGroupItem
              isEdit={isEdit}
              staticTexts={staticTexts}
              groupData={groupData}
              params={params}
              groupItemMain={item}
              isModalShown={isModalShown}
              changeModalState={changeModalState}
            />
          </div>
        ))}
      </div>
    </ItemContainerAddTextDescriptionDeleteFeature>
  );
};
