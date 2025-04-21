"use client";

import { FullData, MainParams } from "@/app/lib/definitions";
import { useState } from "react";
import { CreateModal } from "./CreateModal";
import { CommonButton } from "../_buttons/CommonButton";
import { StaticTexts } from "@/app/dictionaries/definitions";
import {
  UpdateTextDescriptionDataModalContent,
  UseItems,
} from "./UpdateTextDescriptionDataModalContent";
import { PencilIcon } from "@heroicons/react/24/outline";

export const UpdateTextDescriptionData = ({
  staticTexts,
  currentData,
  useItems,
  params,
  changeModalState,
}: {
  staticTexts: StaticTexts;
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
      <CommonButton onClick={handleEdit} width="40px">
        <PencilIcon title={staticTexts.edit ?? ""} color="black" width="24px" />
      </CommonButton>

      {isEditModalShown ? (
        <CreateModal onClose={handleClose}>
          <UpdateTextDescriptionDataModalContent
            onClose={handleClose}
            staticTexts={staticTexts}
            currentData={currentData}
            useItems={useItems}
            params={params}
          />
        </CreateModal>
      ) : null}
    </>
  );
};
