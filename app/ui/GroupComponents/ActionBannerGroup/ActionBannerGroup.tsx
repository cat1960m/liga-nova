"use client";

import { FullData, MainParams, PreviewParams } from "@/app/lib/definitions";
import Image from "next/image";
import styles from "./actionBanner.module.css";
import {
  ACTION_BANNER_TITLE_IMAGE,
  ACTION_BANNER_TRY_GROUP_SUBTYPE,
} from "@/app/lib/constants";
import { ItemContainerUpdateTextDescriptionDeleteFeature } from "../../CommonComponents/_itemGroupContainer/ItemContainerUpdateTextDescriptionDeleteFeature";
import { CommonButton } from "../../CommonComponents/_buttons/CommonButton";
import { getIsEditNoDelete } from "@/app/lib/utils";
import { ReactNode } from "react";
import { CountIndex } from "@/app/dictionaries/definitions";

export type Props = {
  groupData: FullData[];
  params: MainParams;
  countIndex: CountIndex;
};

export const ActionBannerGroup = ({ groupData, params, countIndex }: Props) => {
  const titleImageData = groupData.find(
    (item) => item.text_type === ACTION_BANNER_TITLE_IMAGE
  );

  if (!titleImageData) {
    return null;
  }

  const { staticTexts, lang } = params;
  const { isEdit, noDelete } = getIsEditNoDelete(params);

  const isTry = titleImageData.subtype === ACTION_BANNER_TRY_GROUP_SUBTYPE;
  const text = isTry ? staticTexts.try : staticTexts.register;
  const handleClick = () => {
    //
  };

  const preview = (data: PreviewParams): ReactNode => {
    return (
      <div className={styles.container}>
        {data.value ? (
          <Image src={data.value} alt="" fill className={styles.image} />
        ) : null}
        {/* changes for mobile needed */}
        <div className={styles.info_big}>
          {data.text ?? "N/A"}
          <CommonButton text={text ?? "N/A"} isAction onClick={() => {}} />
        </div>
        <div className={styles.info_small}>
          {data.text ?? "N/A"}
          <CommonButton text={text ?? "N/A"} isAction onClick={() => {}} />
        </div>
      </div>
    );
  };

  return (
    <ItemContainerUpdateTextDescriptionDeleteFeature
      currentData={titleImageData}
      useItems={{
        text: "simple",
        value: "image",
      }}
      staticTexts={staticTexts}
      lang={lang}
      isEdit={isEdit}
      featureData={groupData}
      isChangeOrderHorizontal={false}
      marginTop={100}
      noDelete={noDelete}
      countIndex={countIndex}
      preview={preview}
      previewBaseParams={{ isFullWidth: "full" }}
    >
      <div className={styles.container}>
        {titleImageData?.value ? (
          <Image
            src={titleImageData.value}
            alt=""
            fill
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
