"use client";

import { addChildFeature } from "@/app/lib/actions_fitness";
import { CommonButton } from "./CommonButton";
import { MainParams } from "@/app/lib/definitions";
import { useEditContext } from "../../../edit/_components/EditContextProvider";

export type Props = {
  parentFeatureId: number;
  text: string;
  params: MainParams;
  textTypes: string[];
  type: string;
  subtype: string;
};

export const AddChildFeatureButton = ({
  parentFeatureId,
  text,
  params,
  textTypes,
  type,
  subtype,
}: Props) => {
  const { isEditButtonsDisabled, changeIsEditButtonDisabled } =
    useEditContext();

  const handleAddTab = async (pathName: string) => {
    changeIsEditButtonDisabled(true);
    await addChildFeature({
      parentId: parentFeatureId,
      type,
      subtype,
      name: params.pageName,
      text_types: textTypes,
      pathName,
    });
    changeIsEditButtonDisabled(false);
  };

  return (
    <CommonButton
      text={text}
      onClick={handleAddTab}
      isDisabled={isEditButtonsDisabled}
    />
  );
};
