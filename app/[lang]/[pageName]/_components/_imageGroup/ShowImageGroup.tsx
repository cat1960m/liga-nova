"use client";

import { FullData, MainParams } from "@/app/lib/definitions";
import { IMAGE } from "@/app/lib/constants";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { ItemContainerUpdateTextDescriptionDeleteFeature } from "../__commonComponents/_itemGroupContainer/ItemContainerUpdateTextDescriptionDeleteFeature";

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
  if (!imageData) {
    return;
  }

  return (
    <ItemContainerUpdateTextDescriptionDeleteFeature
      isEdit={isEdit}
      currentData={imageData}
      staticTexts={staticTexts}
      useItems={{
        value: "image",
      }}
      params={params}
      featureData={groupData}
      isChangeOrderHorizontal={false}
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
