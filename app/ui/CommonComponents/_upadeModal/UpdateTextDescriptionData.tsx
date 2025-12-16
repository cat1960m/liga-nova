"use client";

import { FullData, PreviewParams } from "@/app/lib/definitions";
import { useState } from "react";
import { CreateModal } from "./CreateModal/CreateModal";
import { CommonButton } from "../_buttons/CommonButton";
import {
  UpdateTextDescriptionDataModalContent,
  UseItems,
} from "./UpdateTextDescriptionDataModalContent/UpdateTextDescriptionDataModalContent";
import { PencilIcon } from "@heroicons/react/24/outline";
import { ICON_BUTTON_WIDTH, ICON_IN_BUTTON_WIDTH } from "@/app/lib/constants";
import { StaticTexts } from "@/app/dictionaries/definitions";

export const UpdateTextDescriptionData = ({
  currentData,
  useItems,
  staticTexts,
  lang,
  changeModalState,
  preview,
  previewBaseParams,
}: {
  currentData: FullData;
  useItems: UseItems;
  lang: string;
  staticTexts: StaticTexts;
  changeModalState?: (state: boolean) => void;
  preview?: (data: PreviewParams) => React.ReactNode;
  previewBaseParams?: Record<string, string>;
}) => {
  const [isEditModalShown, setIsEditModalShown] = useState(false);

  const handleEdit = () => {
    setIsEditModalShown(true);
    changeModalState?.(true);
  };

  const handleClose = () => {
    setIsEditModalShown(false);
    changeModalState?.(false);
  };

  return (
    <>
      <CommonButton onClick={handleEdit} width={ICON_BUTTON_WIDTH}>
        <PencilIcon
          title={staticTexts.edit ?? ""}
          color="black"
          width={ICON_IN_BUTTON_WIDTH}
        />
      </CommonButton>

      {isEditModalShown ? (
        <CreateModal onClose={handleClose}>
          <UpdateTextDescriptionDataModalContent
            onClose={handleClose}
            currentData={currentData}
            useItems={useItems}
            staticTexts={staticTexts}
            lang={lang}
            preview={preview}
            previewBaseParams={previewBaseParams}
          />
        </CreateModal>
      ) : null}
    </>
  );
};
