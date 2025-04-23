"use client";

import { addChildFeature } from "@/app/lib/actions_fitness";
import { CommonButton } from "./CommonButton";
import { MainParams } from "@/app/lib/definitions";
import { useEditContext } from "../../../edit/_components/EditContextProvider";
import { PlusIcon } from "@heroicons/react/24/outline";

export type Props = {
  parentFeatureId: number;
  text: string;
  params: MainParams;
  textTypes: string[];
  type: string;
  subtype: string;
  onChildFeatureAdded?: (id: number) => void;
};

export const AddChildFeatureButton = ({
  parentFeatureId,
  text,
  params,
  textTypes,
  type,
  subtype,
  onChildFeatureAdded,
}: Props) => {
  const { isEditButtonsDisabled, changeIsEditButtonDisabled } =
    useEditContext();

  const handleAddFeature = async (pathName: string) => {
    changeIsEditButtonDisabled(true);
    const newFeatureId = await addChildFeature({
      parentId: parentFeatureId,
      type,
      subtype,
      name: params.pageName,
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
      width="40px"
    >
      <PlusIcon width="24px" title={text} />
    </CommonButton>
  );
};
