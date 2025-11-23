"use client";

import { addFeatureData } from "@/app/lib/actionsContainer";
import { CommonButton } from "./CommonButton";
import { useEditContext } from "../../PageComponents/EditContextProvider";
import { PlusIcon } from "@heroicons/react/24/outline";
import { ICON_BUTTON_WIDTH, ICON_IN_BUTTON_WIDTH } from "@/app/lib/constants";

export type Props = {
  parentFeatureId: number;
  text: string;
  pageName: string;
  textTypes: string[];
  type: string;
  subtype: string;
  onChildFeatureAdded?: (id: number) => void;
};

export const AddChildFeatureButton = ({
  parentFeatureId,
  text,
  pageName,
  textTypes,
  type,
  subtype,
  onChildFeatureAdded,
}: Props) => {
  const { isEditButtonsDisabled, changeIsEditButtonDisabled } =
    useEditContext();

  const handleAddFeature = async (pathName: string) => {
    changeIsEditButtonDisabled(true);
    const newFeatureId = await addFeatureData({
      parentId: parentFeatureId,
      type,
      subtype,
      name: pageName,
      text_types: textTypes,
      pathName,
    });
    changeIsEditButtonDisabled(false);
    if (newFeatureId) {
      onChildFeatureAdded?.(newFeatureId);
    }
  };

  return (
    <CommonButton
      onClick={handleAddFeature}
      isDisabled={isEditButtonsDisabled}
      width={ICON_BUTTON_WIDTH}
    >
      <PlusIcon width={ICON_IN_BUTTON_WIDTH} title={text} />
    </CommonButton>
  );
};
