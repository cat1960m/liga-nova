"use client";

import { CommonButton } from "./CommonButton";
import { useEditContext } from "../../PageComponents/EditContextProvider";
import { useUpdateFeature } from "../../hooks/useUpdateFeature";
import { updateFeatureSubtypeFilterIdsData } from "@/app/lib/actionsContainer";
import { usePathname } from "next/navigation";

export type Props = {
  featureId: number;
  subtype: string;
  filterIds: string;
  buttonText: string;
  isDisabled?: boolean;
  onSaved?: () => void;
  pageName: string;
};

export const UpdateFeatureFilterIdsButton = ({
  featureId,
  subtype,
  filterIds,
  buttonText,
  isDisabled,
  onSaved,
  pageName
}: Props) => {
  const { isEditButtonsDisabled, changeIsEditButtonDisabled } =
    useEditContext();
  const {addFeatureToHistoryOnUpdate } = useUpdateFeature();
  const pathName = usePathname();

  const handleSave = async () => {
    await addFeatureToHistoryOnUpdate({
      featureId,
      page: pageName,
    })
    
    changeIsEditButtonDisabled(true);
    await updateFeatureSubtypeFilterIdsData({
      id: featureId,
      subtype,
      filterIds,
      pathName
    });
    changeIsEditButtonDisabled(false);
    onSaved?.();
  };

  return (
    <CommonButton
      text={buttonText}
      onClick={handleSave}
      isDisabled={isEditButtonsDisabled || !!isDisabled}
    />
  );
};
