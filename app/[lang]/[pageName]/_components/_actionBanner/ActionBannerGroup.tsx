"use client";

import { StaticTexts } from "@/app/dictionaries/definitions";
import {
  ACTION_BANNER_IMAGE,
  ACTION_BANNER_TITLE,
  IMAGE,
} from "@/app/lib/constants";
import { FullData, MainParams } from "@/app/lib/definitions";
import { usePathname } from "next/navigation";
import { ManageImages } from "../_clientComponents/ManageImages";
import {
  addTextDescription,
  updateTextDescriptionValue,
} from "@/app/lib/actions_fitness";
import { ScrollContainer } from "../_clientComponents/ScrollContainer/ScrollContainer";
import Image from "next/image";
import { UploadComponent } from "../_clientComponents/UploadComponent";
import { isNull } from "node:util";
import { TextItemField } from "../TextItemField";
import styles from "./actionBanner.module.css";
import { CommonButton } from "../_clientComponents/CommonButton";

export type Props = {
  isEdit: boolean;
  staticTexts: StaticTexts;
  groupData: FullData[];
};

export const ActionBannerGroup = ({
  isEdit,
  staticTexts,
  groupData,
}: Props) => {
  const featureId = groupData[0]?.id;
  const pathName = usePathname();

  const imageData = groupData.find(
    (item) => item.text_type === ACTION_BANNER_IMAGE
  );
  const title = groupData.find(
    (item) => item.text_type === ACTION_BANNER_TITLE
  );

  if (!featureId || !imageData) {
    return null;
  }

  const handleImageUploaded = (value: string) => {
    if (!pathName) {
      return;
    }

    updateTextDescriptionValue({
      pathName,
      textDescriptionId: imageData.text_description_id,
      value,
    });
  };

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
        {imageData?.value ? (
          <Image
            src={imageData.value}
            alt=""
            layout="fill" // Fill the container
            objectFit="cover" // Make sure it covers the entire container
            quality={100} // Optional, for higher quality
            className={styles.image}
          />
        ) : null}
        {/* changes for mobile needed */}
        <div className={styles.info_big}>
          {title?.text_content ?? "N/A"}
          <CommonButton
            text={staticTexts.register ?? "N/A"}
            backgroundColor="#2575fc"
          />
        </div>
        <div className={styles.info_small}>
          {title?.text_content ?? "N/A"}
          <CommonButton
            text={staticTexts.register ?? "N/A"}
            backgroundColor="#2575fc"
          />
        </div>
      </div>
      {isEdit ? (
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            alignItems: "center",
            padding: "10px",
          }}
        >
          {title ? (
            <TextItemField
              fieldData={title}
              staticTexts={staticTexts}
              importantDescriptionType=""
            />
          ) : null}

          <UploadComponent
            onUploaded={handleImageUploaded}
            s3Key={imageData?.value}
            staticTexts={staticTexts}
          />
        </div>
      ) : null}
    </>
  );
};
