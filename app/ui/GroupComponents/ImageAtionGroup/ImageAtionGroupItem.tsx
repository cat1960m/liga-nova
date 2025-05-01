"use client";

import { FullData, MainParams } from "@/app/lib/definitions";
import { ImageAction } from "./ImageAction";
import { ActionButton } from "@/app/ui/CommonComponents/_buttons/ActionButton/ActionButton";
import { ItemContainerUpdateDeleteTextDescription } from "@/app/ui/CommonComponents/_itemGroupContainer/ItemContainerUpdateDeleteTextDescription";

export type Props = {
  groupData: FullData[];
  params: MainParams;
  groupItemMain: FullData;
  isModalShown: boolean;
  changeModalState?: (state: boolean) => void;
};

export const ImageActionGroupItem = ({
  groupData,
  params,
  groupItemMain,
  isModalShown,
  changeModalState,
}: Props) => {
  const { staticTexts } = params;

  return (
    <ItemContainerUpdateDeleteTextDescription
      useItems={{
        tooltip: "quill",
        value: "image",
      }}
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
