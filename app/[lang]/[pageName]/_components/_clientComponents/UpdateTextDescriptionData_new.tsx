"use client";

import { FullData, TabType, TextContent } from "@/app/lib/definitions";
import { useState } from "react";
import { UpdateTextDescriptionDataModal_new } from "./UpdateTextDescriptionDataModal_new";
import { CommonButton } from "../_buttons/CommonButton";
import { StaticTexts } from "@/app/dictionaries/definitions";

export const UpdateTextDescriptionData_new = ({
  staticTexts,
  currentData,
  useIcons,
  isArea,
}: {
  staticTexts: StaticTexts;
  currentData: FullData;
  useIcons?: boolean;
  isArea?: boolean;
}) => {
  const [isEditModalShown, setIsEditModalShown] = useState(false);

  const handleEdit = () => {
    setIsEditModalShown(true);
  };

  return (
    <>
      <CommonButton onClick={handleEdit} text={staticTexts.edit ?? "N/A"} />

      {isEditModalShown ? (
        <UpdateTextDescriptionDataModal_new
          onClose={() => setIsEditModalShown(false)}
          staticTexts={staticTexts}
          currentData={currentData}
          useIcons={useIcons}
          isArea={isArea}
        />
      ) : null}
    </>
  );
};
