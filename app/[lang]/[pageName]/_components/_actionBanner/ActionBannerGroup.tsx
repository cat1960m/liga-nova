"use client";

import { StaticTexts } from "@/app/dictionaries/definitions";
import { FullData, MainParams } from "@/app/lib/definitions";
import Image from "next/image";
import styles from "./actionBanner.module.css";
import { CommonButton } from "../__commonComponents/_buttons/CommonButton";
import { ACTION_BANNER_TITLE_IMAGE } from "@/app/lib/constants";
import { UpdateTextDescriptionDeleteFeatureButtons } from "../__commonComponents/_buttons/UpdateTextDescriptionDeleteFeatureButtons";

export type Props = {
  isEdit: boolean;
  staticTexts: StaticTexts;
  groupData: FullData[];
  params: MainParams;
};

export const ActionBannerGroup = ({
  isEdit,
  staticTexts,
  groupData,
  params,
}: Props) => {

  const titleImageData = groupData.find(
    (item) => item.text_type === ACTION_BANNER_TITLE_IMAGE
  );

  return (
    <>
      <div
        style={{
          width: "100%",
          minHeight: "300px",
          position: "relative",
          display: "flex",
          backgroundColor: "#f9fbff",
          borderRadius: "10px",
          border: "1px solid lightgray",
        }}
      >
        {titleImageData?.value ? (
          <Image
            src={titleImageData.value}
            alt=""
            layout="fill" // Fill the container
            objectFit="cover" // Make sure it covers the entire container
            quality={100} // Optional, for higher quality
            className={styles.image}
          />
        ) : null}
        {/* changes for mobile needed */}
        <div className={styles.info_big}>
          {titleImageData?.text_content ?? "N/A"}
          <CommonButton text={staticTexts.register ?? "N/A"} isAction />
        </div>
        <div className={styles.info_small}>
          {titleImageData?.text_content ?? "N/A"}
          <CommonButton text={staticTexts.register ?? "N/A"} isAction />
        </div>
      </div>
      {isEdit ? (
        <UpdateTextDescriptionDeleteFeatureButtons
          dataToUpdate={titleImageData}
          staticTexts={staticTexts}
          useItems={{
            text: "simple",
            value: "image",
          }}
          params={params}
          featureData={groupData}
        />
      ) : null}
    </>
  );
};
