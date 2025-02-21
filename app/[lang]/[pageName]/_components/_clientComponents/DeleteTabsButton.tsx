"use client";

import { RemoveFeature } from "@/app/lib/actions_fitness";
import { CommonButton } from "./CommonButton";
import { usePathname } from "next/navigation";

export const DeleteTabsButton = ({
  tabsFeatureId,
}: {
  tabsFeatureId: number;
}) => {
  const pathName = usePathname();

  const onRemoveTabs = () => {
    RemoveFeature({ id: tabsFeatureId, pathName });
  };

  return <CommonButton text="Remove tabs" onClick={onRemoveTabs} />;
};
