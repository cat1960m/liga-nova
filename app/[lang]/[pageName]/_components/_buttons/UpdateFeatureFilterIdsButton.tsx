"use client";

import { updateFeatureSubtypeFilterIds } from "@/app/lib/actions_fitness";
import { CommonButton } from "./CommonButton";
import { usePathname } from "next/navigation";
import { useEditContext } from "../../edit/_components/EditContextProvider";

export type Props = {
  featureId: number;
  subtype: string;
  filterIds: string;
  buttonText: string;
  isDisabled?: boolean;
  onSaved?: () => void;
};

export const UpdateFeatureFilterIdsButton = ({
  featureId,
  subtype,
  filterIds,
  buttonText,
  isDisabled,
  onSaved,
}: Props) => {
  const pathName = usePathname();
  const { isEditButtonsDisabled, changeIsEditButtonDisabled } =
    useEditContext();

  const handleSave = async () => {
    changeIsEditButtonDisabled(true);
    await updateFeatureSubtypeFilterIds({
      id: featureId,
      pathName,
      subtype,
      filterIds,
    });
    changeIsEditButtonDisabled(false);
    onSaved?.();
    alert("save");
  };

  return (
    <CommonButton
      text={buttonText}
      onClick={handleSave}
      isDisabled={isEditButtonsDisabled || !!isDisabled}
    />
  );
};
