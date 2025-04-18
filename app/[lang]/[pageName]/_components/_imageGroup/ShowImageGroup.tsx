"use client";

import { FullData, MainParams } from "@/app/lib/definitions";
import { IMAGE } from "@/app/lib/constants";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { UpdateTextDescriptionDeleteFeatureButtons } from "../__commonComponents/_buttons/UpdateTextDescriptionDeleteFeatureButtons";

export type Props = {
  isEdit: boolean;
  staticTexts: StaticTexts;
  groupData: FullData[];
  params: MainParams;
};

export const ShowImageGroup = ({
  isEdit,
  staticTexts,
  groupData,
  params,
}: Props) => {
  const imageData = groupData.find((item) => item.text_type === IMAGE);

  return (
    <>
      {imageData?.value ? (
        <div
          style={{
            width: "100%",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
              // minHeight: "300px",
            }}
          >
            {/*  <Image
              src={imageData?.value}
              alt=""
              layout="fill" // Fill the container
              objectFit="cover" // Make sure it covers the entire container
              quality={100} // Optional, for higher quality
            /> */}
            <img src={imageData?.value} alt="" width="100%" />
          </div>
        </div>
      ) : (
        <div>{"No file"}</div>
      )}

      {isEdit ? (
        <UpdateTextDescriptionDeleteFeatureButtons
          dataToUpdate={imageData}
          staticTexts={staticTexts}
          useItems={{
            value: "image",
          }}
          params={params}
          featureData={groupData}
        />
      ) : null}
    </>
  );
};
