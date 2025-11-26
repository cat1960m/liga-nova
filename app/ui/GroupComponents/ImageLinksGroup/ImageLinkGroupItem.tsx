"use client";

import { FullData } from "@/app/lib/definitions";
import { ImageLink } from "./ImageLink";
import { ItemContainerUpdateDeleteTextDescription } from "@/app/ui/CommonComponents/_itemGroupContainer/ItemContainerUpdateDeleteTextDescription";
import { CountIndex, StaticTexts } from "@/app/dictionaries/definitions";

export type Props = {
  groupData: FullData[];
  isEdit: boolean;
  staticTexts: StaticTexts;
  lang: string;

  item: FullData;
  changeModalState?: (state: boolean) => void;
  isModalShown: boolean;
  countIndex: CountIndex;
};
// main page
export const ImageLinkGroupItem = ({
  groupData,
  staticTexts,
  lang,
  isEdit,
  item,
  changeModalState,
  isModalShown,
  countIndex
}: Props) => {
  return (
    <ItemContainerUpdateDeleteTextDescription
      s3Key={item.value}
      useItems={{
        text: "simple",
        tooltip: "quill",
        value: "image",
        link: true,
      }}
      isEdit={isEdit}
      staticTexts={staticTexts}
      lang={lang}
      currentData={item}
      changeModalState={changeModalState}
      countIndex={countIndex}
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
