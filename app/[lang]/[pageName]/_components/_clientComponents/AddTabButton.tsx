"use client";

import { addChildFeature } from "@/app/lib/actions_fitness";
import { CommonButton } from "./CommonButton";
import { TAB, TAB_TITLE } from "@/app/lib/constants";
import { MainParams } from "@/app/lib/definitions";

export const AddTabButton = ({
  tabsFeatureId,
  text,
  params,
}: {
  tabsFeatureId: number;
  text: string;
  params: MainParams;
}) => {
  const handleAddTab = async (pathName: string) => {
    await addChildFeature({
      parentId: tabsFeatureId,
      type: TAB,
      subtype: "1",
      name: params.pageName,
      text_types: [TAB_TITLE],
      pathName,
    });
  };

  return <CommonButton text={text} onClick={handleAddTab} />;
};
