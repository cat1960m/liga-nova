"use client";

import { FullData, MainParams } from "@/app/lib/definitions";
import { useState } from "react";
import { CreateModal } from "./CreateModal";
import { CommonButton } from "../_buttons/CommonButton";
import {
  UpdateTextDescriptionDataModalContent,
  UseItems,
} from "./UpdateTextDescriptionDataModalContent";
import { PencilIcon } from "@heroicons/react/24/outline";
import { ICON_BUTTON_WIDTH, ICON_IN_BUTTON_WIDTH } from "@/app/lib/constants";

export const UpdateTextDescriptionData = ({
  currentData,
  useItems,
  params,
  changeModalState,
}: {
  currentData: FullData;
  useItems: UseItems;
  params: MainParams;
  changeModalState?: (state: boolean) => void;
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
          title={params.staticTexts.edit ?? ""}
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
            params={params}
          />
        </CreateModal>
      ) : null}
    </>
  );
};
