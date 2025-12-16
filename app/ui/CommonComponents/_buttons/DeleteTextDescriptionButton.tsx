"use client";

import { useEditContext } from "../../PageComponents/EditContextProvider";
import { DeleteButton } from "./DeleteButton/DeleteButton";
import { FullData } from "@/app/lib/definitions";
import { useRemoveTextDescription } from "../../hooks/useRemoveTextDescription";

export const DeleteTextDescriptionButton = ({
  deleteText,
  s3Key,
  onDeleteFinished,
  currentData,
}: {
  deleteText: string;
  s3Key?: string;
  onDeleteFinished?: () => void;
  currentData: FullData;
}) => {
  const { isEditButtonsDisabled, changeIsEditButtonDisabled } =
    useEditContext();
  const { removeTextDescription } = useRemoveTextDescription();

  const handleDelete = async () => {
    changeIsEditButtonDisabled(true);

    await removeTextDescription({ fullData: currentData, s3Key });

    changeIsEditButtonDisabled(false);
    onDeleteFinished?.();
  };

  return (
    <DeleteButton
      title={deleteText}
      onClick={handleDelete}
      isDisabled={isEditButtonsDisabled}
    />
  );
};
