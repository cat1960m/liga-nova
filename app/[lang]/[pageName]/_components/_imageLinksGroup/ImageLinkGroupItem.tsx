"use client";

import { FullData, MainParams } from "@/app/lib/definitions";
import { ImageLink } from "./ImageLink";
import { ItemContainerUpdateDeleteTextDescription } from "../__commonComponents/_itemGroupContainer/ItemContainerUpdateDeleteTextDescription";

export type Props = {
  groupData: FullData[];
  params: MainParams;
  item: FullData;
  changeModalState?: (state: boolean) => void;
  isModalShown: boolean;
};
// main page
export const ImageLinkGroupItem = ({
  groupData,
  params,
  item,
  changeModalState,
  isModalShown,
}: Props) => {
  const { staticTexts } = params;

  return (
    <ItemContainerUpdateDeleteTextDescription
      s3Key={item.value}
      useItems={{
        text: "simple",
        tooltip: "quill",
        value: "image",
        link: true,
      }}
      params={params}
      currentData={item}
      changeModalState={changeModalState}
    >
      <ImageLink
        data={item}
        groupData={groupData}
        isModalShown={isModalShown}
        staticTexts={staticTexts}
      />
    </ItemContainerUpdateDeleteTextDescription>
  );
};
