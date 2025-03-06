"use client";

import { addChildFeature } from "@/app/lib/actions_fitness";
import { CommonButton } from "./CommonButton";
import { TAB } from "@/app/lib/constants";
import { MainParams } from "@/app/lib/definitions";

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
  const handleAddTab = async (pathName: string) => {
    await addChildFeature({
      parentId: parentFeatureId,
      type,
      subtype,
      name: params.pageName,
      text_types: textTypes,
      pathName,
    });
  };

  return <CommonButton text={text} onClick={handleAddTab} />;
};
