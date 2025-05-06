"use client";

import { FullData } from "@/app/lib/definitions";
import { ImageAction } from "./ImageAction";
import { ActionButton } from "@/app/ui/CommonComponents/_buttons/ActionButton/ActionButton";
import { ItemContainerUpdateDeleteTextDescription } from "@/app/ui/CommonComponents/_itemGroupContainer/ItemContainerUpdateDeleteTextDescription";
import { StaticTexts } from "@/app/dictionaries/definitions";

export type Props = {
  groupData: FullData[];
  isEdit: boolean;
  staticTexts: StaticTexts;
  lang: string;
  groupItemMain: FullData;
  isModalShown: boolean;
  changeModalState?: (state: boolean) => void;
};

export const ImageActionGroupItem = ({
  groupData,
  staticTexts,
  lang,
  isEdit,
  groupItemMain,
  isModalShown,
  changeModalState,
}: Props) => {
  return (
    <ItemContainerUpdateDeleteTextDescription
      useItems={{
        tooltip: "quill",
        value: "image",
      }}
      s3Key={groupItemMain.value}
      isEdit={isEdit}
      staticTexts={staticTexts}
      lang={lang}
      currentData={groupItemMain}
      changeModalState={changeModalState}
    >
      <>
        <ImageAction
          data={groupItemMain}
          groupData={groupData}
          isModalShown={isModalShown}
        />

        <ActionButton
          text={staticTexts.details?.toUpperCase()}
          onClick={() => {}}
        />
      </>
    </ItemContainerUpdateDeleteTextDescription>
  );
};
