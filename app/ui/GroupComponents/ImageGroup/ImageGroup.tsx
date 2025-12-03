"use client";

import { FullData, MainParams, PreviewParams } from "@/app/lib/definitions";
import { IMAGE, LAYOUT_ITEM } from "@/app/lib/constants";
import { ItemContainerUpdateTextDescriptionDeleteFeature } from "@/app/ui/CommonComponents/_itemGroupContainer/ItemContainerUpdateTextDescriptionDeleteFeature";
import { getIsEditNoDelete } from "@/app/lib/utils";

import styles from "./imageGroup.module.css";
import cn from "clsx";
import Image from "next/image";

export type Props = {
  groupData: FullData[];
  params: MainParams;
  pageFullDataList: FullData[];
};

export const ShowImageGroup = ({
  groupData,
  params,
  pageFullDataList,
}: Props) => {
  const imageData = groupData.find((item) => item.text_type === IMAGE);
  if (!imageData) {
    return;
  }
  const parentFeature = pageFullDataList.find(
    (item) => item.id === imageData.parent_feature_id
  );
  const isInLayout = parentFeature?.type === LAYOUT_ITEM;
  const { staticTexts, lang } = params;
  const { isEdit, noDelete } = getIsEditNoDelete(params);

  const preview = ({value}: PreviewParams) => {
    if (!value) {
      return "No file";
    }
    return <Image src={value} alt="" width={300} height={200} />;
  };

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
      heightValue={isInLayout ? "100%" : undefined}
      countIndex={null}
      preview={preview}
    >
      {imageData?.value ? (
        <div
          className={cn(styles.container, { [styles.inLayout]: isInLayout })}
        >
          <div className={styles.body}>
            {isInLayout ? (
              <Image
                src={imageData?.value}
                alt=""
                className={styles.imageInLayout}
                fill
                style={{ width: "100%", height: "100%" }}
              />
            ) : (
              <Image
                src={imageData?.value}
                alt=""
                width={800}
                height={600}
                style={{ width: "100%", height: "auto" }}
              />
            )}
          </div>
        </div>
      ) : (
        <div>{"No file"}</div>
      )}
    </ItemContainerUpdateTextDescriptionDeleteFeature>
  );
};
