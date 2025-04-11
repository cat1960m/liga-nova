"use client";

import { RemoveFeature } from "@/app/lib/actions_fitness";
import { CommonButton } from "../_buttons/CommonButton";
import { usePathname } from "next/navigation";
import { useEditContext } from "../../edit/_components/EditContextProvider";

export const DeleteTabsButton = ({
  tabsFeatureId,
  text,
}: {
  tabsFeatureId: number;
  text: string;
}) => {
  const pathName = usePathname();
  const { isEditButtonsDisabled, changeIsEditButtonDisabled } =
    useEditContext();

  const onRemoveTabs = async () => {
    changeIsEditButtonDisabled(true);
    await RemoveFeature({ id: tabsFeatureId, pathName });
    changeIsEditButtonDisabled(false);
  };

  return (
    <CommonButton
      text={text}
      onClick={onRemoveTabs}
      isDisabled={isEditButtonsDisabled}
    />
  );
};
