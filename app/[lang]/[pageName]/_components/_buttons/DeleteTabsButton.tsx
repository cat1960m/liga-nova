"use client";

import { RemoveFeature } from "@/app/lib/actions_fitness";
import { CommonButton } from "../_buttons/CommonButton";
import { usePathname } from "next/navigation";

export const DeleteTabsButton = ({
  tabsFeatureId,
  text,
}: {
  tabsFeatureId: number;
  text: string;
}) => {
  const pathName = usePathname();

  const onRemoveTabs = () => {
    RemoveFeature({ id: tabsFeatureId, pathName });
  };

  return <CommonButton text={text} onClick={onRemoveTabs} />;
};
