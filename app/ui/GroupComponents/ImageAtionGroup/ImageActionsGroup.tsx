"use client";

import { FullData, MainParams } from "@/app/lib/definitions";
import { IMAGE_ACTIONS_ITEM, TOOLTIP } from "@/app/lib/constants";
import cn from "clsx";

import styles from "./imageActions.module.css";
import { useState } from "react";
import { ImageActionGroupItem } from "./ImageAtionGroupItem";
import { ItemContainerAddTextDescriptionDeleteFeature } from "@/app/ui/CommonComponents/_itemGroupContainer/ItemContainerAddTextDescriptionDeleteFeature";
import { getIsEditNoDelete } from "@/app/lib/utils";

export type Props = {
  groupData: FullData[];
  params: MainParams;
};
//shares page
export const ImageActionsGroup = ({ groupData, params }: Props) => {
  const [isModalShown, setIsModalShown] = useState<boolean>(false);
  const groupDataMain = groupData.filter(
    (item) => item.content_type !== TOOLTIP
  );

  const changeModalState = (state: boolean) => setIsModalShown(state);
  const { staticTexts, lang } = params;
  const { isEdit, noDelete } = getIsEditNoDelete(params);

  return (
    <ItemContainerAddTextDescriptionDeleteFeature
      isEdit={isEdit}
      featureData={groupData}
      deleteButtonText={staticTexts.delete ?? "N/A"}
      addButtonText={staticTexts.addGroupItem ?? "N/A"}
      textDescriptionType={IMAGE_ACTIONS_ITEM}
      isChangeOrderHorizontal={false}
      marginTop={20}
      noDelete={noDelete}
    >
      <div className={cn(styles.container)}>
        {groupDataMain.map((item) => (
          <div
            className={cn(styles.itemContainer)}
            key={item.text_description_id}
          >
            <ImageActionGroupItem
              groupData={groupData}
              isEdit={isEdit}
              staticTexts={staticTexts}
              lang={lang}
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
