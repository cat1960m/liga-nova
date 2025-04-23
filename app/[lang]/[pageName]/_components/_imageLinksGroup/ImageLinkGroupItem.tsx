"use client";

import { StaticTexts } from "@/app/dictionaries/definitions";
import { FullData, MainParams } from "@/app/lib/definitions";
import { ImageLink } from "./ImageLink";
import { ItemContainerUpdateDeleteTextDescription } from "../__commonComponents/_itemGroupContainer/ItemContainerUpdateDeleteTextDescription";

export type Props = {
  groupData: FullData[];
  staticTexts: StaticTexts;
  isEdit: boolean;
  params: MainParams;
  item: FullData;
  changeModalState?: (state: boolean) => void;
  isModalShown: boolean;
};
// main page
export const ImageLinkGroupItem = ({
  groupData,
  isEdit,
  staticTexts,
  params,
  item,
  changeModalState,
  isModalShown,
}: Props) => {
  return (
    <ItemContainerUpdateDeleteTextDescription
      isEdit={isEdit}
      s3Key={item.value}
      useItems={{
        text: "simple",
        tooltip: "quill",
        value: "image",
        link: true,
      }}
      staticTexts={staticTexts}
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
