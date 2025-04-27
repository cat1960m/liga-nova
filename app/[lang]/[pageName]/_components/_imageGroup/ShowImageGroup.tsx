"use client";

import { FullData, MainParams } from "@/app/lib/definitions";
import { IMAGE } from "@/app/lib/constants";
import { ItemContainerUpdateTextDescriptionDeleteFeature } from "../__commonComponents/_itemGroupContainer/ItemContainerUpdateTextDescriptionDeleteFeature";

export type Props = {
  groupData: FullData[];
  params: MainParams;
};

export const ShowImageGroup = ({
  groupData,
  params,
}: Props) => {
  const imageData = groupData.find((item) => item.text_type === IMAGE);
  if (!imageData) {
    return;
  }

  return (
    <ItemContainerUpdateTextDescriptionDeleteFeature
      currentData={imageData}
      useItems={{
        value: "image",
      }}
      params={params}
      featureData={groupData}
      isChangeOrderHorizontal={false}
      marginTop={0}
    >
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
              //  position: "relative",
            }}
          >
            <img src={imageData?.value} alt="" width="100%" />
          </div>
        </div>
      ) : (
        <div>{"No file"}</div>
      )}
    </ItemContainerUpdateTextDescriptionDeleteFeature>
  );
};
