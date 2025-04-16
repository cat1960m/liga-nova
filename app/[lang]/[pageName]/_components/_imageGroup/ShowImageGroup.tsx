"use client";

import { FullData } from "@/app/lib/definitions";
import { IMAGE } from "@/app/lib/constants";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { UploadComponent } from "../__commonComponents/UploadComponent";
import { updatePriceValueLink } from "@/app/lib/actions_fitness";
import { usePathname } from "next/navigation";
import Image from "next/image";

export type Props = {
  isEdit: boolean;
  staticTexts: StaticTexts;
  groupData: FullData[];
};

export const ShowImageGroup = ({ isEdit, staticTexts, groupData }: Props) => {
  const featureId = groupData[0]?.id;
  const pathName = usePathname();

  const imageData = groupData.find((item) => item.text_type === IMAGE);

  const handleUploaded = (value: string) => {
    if (!imageData || !pathName) {
      return;
    }

    updatePriceValueLink({
      textDescriptionId: imageData.text_description_id,
      pathName,
      value,
    });
  };

  if (!featureId) {
    return null;
  }

  return (
    <>
      {isEdit ? (
        <div
          style={{
            display: "flex",
            gap: "10px",
            width: "100%",
            border: "1px dotted magenta",
            padding: "5px",
            flexDirection: "column",
            alignItems: isEdit ? "flex-start" : "stretch",
            backgroundImage: imageData?.value,
          }}
        >
          {imageData?.value ? (
            <img src={imageData?.value} alt="image" height="100%" />
          ) : null}
          <UploadComponent
            onUploaded={handleUploaded}
            s3Key={imageData?.value}
          />
        </div>
      ) : null}
      {!isEdit && imageData?.value ? (
        <div
          style={{
            width: "100%",
            border: "1px solid lightgray",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
              minHeight: "300px",
            }}
          >
            <Image
              src={imageData?.value}
              alt=""
              layout="fill" // Fill the container
              objectFit="cover" // Make sure it covers the entire container
              quality={100} // Optional, for higher quality
            />
          </div>
        </div>
      ) : null}
    </>
  );
};
