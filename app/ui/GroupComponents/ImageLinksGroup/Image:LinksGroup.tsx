"use client";

import { FullData, MainParams } from "@/app/lib/definitions";
import { IMAGE_LINKS_ITEM, CONTENT_TYPE_TOOLTIP } from "@/app/lib/constants";
import cn from "clsx";

import styles from "./imageLinks.module.css";
import { useState } from "react";
import { ImageLinkGroupItem } from "./ImageLinkGroupItem";
import { ItemContainerAddTextDescriptionDeleteFeature } from "@/app/ui/CommonComponents/_itemGroupContainer/ItemContainerAddTextDescriptionDeleteFeature";
import { getIsEditNoDelete } from "@/app/lib/utils";

export type Props = {
  groupData: FullData[];
  params: MainParams;
};
// main page
export const ImageLinksGroup = ({ groupData, params }: Props) => {
  const [isModalShown, setIsModalShown] = useState<boolean>(false);
  const groupDataMain = groupData.filter(
    (item) => item.content_type !== CONTENT_TYPE_TOOLTIP
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
      textDescriptionType={IMAGE_LINKS_ITEM}
      marginTop={20}
      isChangeOrderHorizontal={false}
      noDelete={noDelete}
    >
      <div className={cn(styles.container)}>
        {groupDataMain.map((item, index) => (
          <div className={styles.itemContainer} key={item.text_description_id}>
            <ImageLinkGroupItem
              groupData={groupData}
              isEdit={isEdit}
              staticTexts={staticTexts}
              lang={lang}
              item={item}
              pageName={params.pageName}
              changeModalState={changeModalState}
              isModalShown={isModalShown}
              countIndex={{count: groupDataMain.length, index}}
            />
          </div>
        ))}
      </div>
    </ItemContainerAddTextDescriptionDeleteFeature>
  );
};
