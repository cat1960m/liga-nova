"use client";

import { FullData, MainParams } from "@/app/lib/definitions";
import { IMAGE_LINKS_ITEM, TOOLTIP } from "@/app/lib/constants";
import cn from "clsx";

import styles from "./imageLinks.module.css";
import { useState } from "react";
import { ImageLinkGroupItem } from "./ImageLinkGroupItem";
import { ItemContainerAddTextDescriptionDeleteFeature } from "@/app/ui/CommonComponents/_itemGroupContainer/ItemContainerAddTextDescriptionDeleteFeature";

export type Props = {
  groupData: FullData[];
  params: MainParams;
};
// main page
export const ImageLinksGroup = ({ groupData, params }: Props) => {
  const [isModalShown, setIsModalShown] = useState<boolean>(false);
  const groupDataMain = groupData.filter(
    (item) => item.content_type !== TOOLTIP
  );
  const changeModalState = (state: boolean) => setIsModalShown(state);
  const { isEdit, staticTexts } = params;

  return (
    <ItemContainerAddTextDescriptionDeleteFeature
      isEdit={isEdit}
      featureData={groupData}
      deleteButtonText={staticTexts.delete ?? "N/A"}
      addButtonText={staticTexts.addGroupItem ?? "N/A"}
      textDescriptionType={IMAGE_LINKS_ITEM}
      marginTop={20}
      isChangeOrderHorizontal={false}
    >
      <div className={cn(styles.container)}>
        {groupDataMain.map((item) => (
          <div className={styles.itemContainer} key={item.text_description_id}>
            <ImageLinkGroupItem
              groupData={groupData}
              params={params}
              item={item}
              changeModalState={changeModalState}
              isModalShown={isModalShown}
            />
          </div>
        ))}
      </div>
    </ItemContainerAddTextDescriptionDeleteFeature>
  );
};
