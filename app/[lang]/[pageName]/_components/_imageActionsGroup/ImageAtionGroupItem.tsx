"use client";

import { StaticTexts } from "@/app/dictionaries/definitions";
import { FullData, MainParams } from "@/app/lib/definitions";
import { ImageAction } from "./ImageAction";
import { ActionButton } from "../__commonComponents/_buttons/_actionButon/ActionButton";
import { ItemContainerUpdateDeleteTextDescription } from "../__commonComponents/_itemGroupContainer/ItemContainerUpdateDeleteTextDescription";

export type Props = {
  groupData: FullData[];
  staticTexts: StaticTexts;
  isEdit: boolean;
  params: MainParams;
  groupItemMain: FullData;
  isModalShown: boolean;
  changeModalState?: (state: boolean) => void;
};

export const ImageActionGroupItem = ({
  groupData,
  isEdit,
  staticTexts,
  params,
  groupItemMain,
  isModalShown,
  changeModalState,
}: Props) => {
  return (
    <ItemContainerUpdateDeleteTextDescription
      isEdit={isEdit}
      useItems={{
        tooltip: "quill",
        value: "image",
      }}
      staticTexts={staticTexts}
      s3Key={groupItemMain.value}
      params={params}
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
