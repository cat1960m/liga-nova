"use client";

import { CommonButton } from "./CommonButton";
import { useEditContext } from "../../PageComponents/EditContextProvider";
import { PlusIcon } from "@heroicons/react/24/outline";
import { ICON_BUTTON_WIDTH, ICON_IN_BUTTON_WIDTH } from "@/app/lib/constants";
import { useAddFeature } from "../../hooks/useAddFeature";

export type Props = {
  parentFeatureId: number;
  text: string;
  textTypes: string[];
  type: string;
  subtype: string;
  onChildFeatureAdded?: (id: number) => void;
};

export const AddChildFeatureButton = ({
  parentFeatureId,
  text,
  textTypes,
  type,
  subtype,
  onChildFeatureAdded,
}: Props) => {
  const { isEditButtonsDisabled, changeIsEditButtonDisabled } =
    useEditContext();
  const { addFeature } = useAddFeature();

  const handleAddFeature = async () => {
    changeIsEditButtonDisabled(true);
    const newFeatureId = await addFeature({
      parentId: parentFeatureId,
      type,
      subtype,
      text_types: textTypes,
      isWithoutHistory: false,
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
