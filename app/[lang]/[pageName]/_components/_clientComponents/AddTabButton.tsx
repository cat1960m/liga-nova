"use client";

import { addChildFeature } from "@/app/lib/actions_fitness";
import { CommonButton } from "./CommonButton";
import { TAB, TAB_TITLE } from "@/app/lib/constants";

export const AddTabButton = ({ tabsFeatureId }: { tabsFeatureId: number }) => {
  const handleAddTab = async (pathName: string) => {
    await addChildFeature({
      parentId: tabsFeatureId,
      type: TAB,
      subtype: "1",
      name: "",
      text_types: [TAB_TITLE],
      pathName,
    });
  };

  return <CommonButton text="Add tab" onClick={handleAddTab} />;
};
