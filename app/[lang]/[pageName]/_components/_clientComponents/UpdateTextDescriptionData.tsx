"use client";

import { FullData, TabType, TextContent } from "@/app/lib/definitions";
import { useState } from "react";
import { CreateModal } from "./CreateModal";
import { CommonButton } from "../_buttons/CommonButton";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { UpdateTextDescriptionDataModalContent } from "./UpdateTextDescriptionDataModalContent";

export const UpdateTextDescriptionData = ({
  staticTexts,
  currentData,
  useIcons,
  isArea,
  isQuill,
}: {
  staticTexts: StaticTexts;
  currentData: FullData;
  useIcons?: boolean;
  isArea?: boolean;
  isQuill?: boolean;
}) => {
  const [isEditModalShown, setIsEditModalShown] = useState(false);

  const handleEdit = () => {
    setIsEditModalShown(true);
  };

  const handleClose = () => {
    setIsEditModalShown(false);
  };

  return (
    <>
      <CommonButton onClick={handleEdit} text={staticTexts.edit ?? "N/A"} />

      {isEditModalShown ? (
        <CreateModal onClose={handleClose}>
          <UpdateTextDescriptionDataModalContent
            onClose={handleClose}
            staticTexts={staticTexts}
            currentData={currentData}
            useIcons={useIcons}
            isArea={isArea}
            isQuill={isQuill}
          />
        </CreateModal>
      ) : null}
    </>
  );
};
