"use client";

import { FullData, MainParams } from "@/app/lib/definitions";
import Image from "next/image";
import styles from "./actionBanner.module.css";
import {
  ACTION_BANNER_TITLE_IMAGE,
  ACTION_BANNER_TRY_GROUP_SUBTYPE,
} from "@/app/lib/constants";
import { ItemContainerUpdateTextDescriptionDeleteFeature } from "../../CommonComponents/_itemGroupContainer/ItemContainerUpdateTextDescriptionDeleteFeature";
import { CommonButton } from "../../CommonComponents/_buttons/CommonButton";

export type Props = {
  groupData: FullData[];
  params: MainParams;
};

export const ActionBannerGroup = ({ groupData, params }: Props) => {
  const titleImageData = groupData.find(
    (item) => item.text_type === ACTION_BANNER_TITLE_IMAGE
  );

  if (!titleImageData) {
    return null;
  }
  const { staticTexts } = params;

  const isTry = titleImageData.subtype === ACTION_BANNER_TRY_GROUP_SUBTYPE;
  const text = isTry ? staticTexts.try : staticTexts.register;
  const handleClick = () => {
    //
  };

  return (
    <ItemContainerUpdateTextDescriptionDeleteFeature
      currentData={titleImageData}
      useItems={{
        text: "simple",
        value: "image",
      }}
      params={params}
      featureData={groupData}
      isChangeOrderHorizontal={false}
      marginTop={100}
    >
      <div className={styles.container}>
        {titleImageData?.value ? (
          <Image
            src={titleImageData.value}
            alt=""
            fill
            objectFit="cover" // Make sure it covers the entire container
            quality={100} // Optional, for higher quality
            className={styles.image}
          />
        ) : null}
        {/* changes for mobile needed */}
        <div className={styles.info_big}>
          {titleImageData?.text_content ?? "N/A"}
          <CommonButton
            text={text ?? "N/A"}
            isAction
            onClick={() => handleClick}
          />
        </div>
        <div className={styles.info_small}>
          {titleImageData?.text_content ?? "N/A"}
          <CommonButton
            text={text ?? "N/A"}
            isAction
            onClick={() => handleClick}
          />
        </div>
      </div>
    </ItemContainerUpdateTextDescriptionDeleteFeature>
  );
};
