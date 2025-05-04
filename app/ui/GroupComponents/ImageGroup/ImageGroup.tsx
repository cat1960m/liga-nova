"use client";

import { FullData, MainParams } from "@/app/lib/definitions";
import { IMAGE } from "@/app/lib/constants";
import { ItemContainerUpdateTextDescriptionDeleteFeature } from "@/app/ui/CommonComponents/_itemGroupContainer/ItemContainerUpdateTextDescriptionDeleteFeature";
import { getIsEditNoDelete } from "@/app/lib/utils";

import styles from "./imageGroup.module.css";

export type Props = {
  groupData: FullData[];
  params: MainParams;
};

export const ShowImageGroup = ({ groupData, params }: Props) => {
  const imageData = groupData.find((item) => item.text_type === IMAGE);
  if (!imageData) {
    return;
  }

  const { staticTexts, lang } = params;
  const { isEdit, noDelete } = getIsEditNoDelete(params);

  return (
    <ItemContainerUpdateTextDescriptionDeleteFeature
      currentData={imageData}
      useItems={{
        value: "image",
      }}
      staticTexts={staticTexts}
      lang={lang}
      isEdit={isEdit}
      featureData={groupData}
      isChangeOrderHorizontal={false}
      marginTop={0}
      noDelete={noDelete}
    >
      {imageData?.value ? (
        <div className={styles.container}>
          <div className={styles.body}>
            <img src={imageData?.value} alt="" width="100%" />
          </div>
        </div>
      ) : (
        <div>{"No file"}</div>
      )}
    </ItemContainerUpdateTextDescriptionDeleteFeature>
  );
};
