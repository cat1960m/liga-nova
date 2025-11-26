"use client";

import { usePathname } from "next/navigation";
import axios from "axios";
import { useEditContext } from "../../PageComponents/EditContextProvider";
import { removeTextDescriptionData } from "@/app/lib/actionsContainer";
import { DeleteButton } from "./DeleteButton/DeleteButton";

export const DeleteTextDescriptionButton = ({
  textDescriptionId,
  deleteText,
  s3Key,
  onDeleteFinished,
}: {
  textDescriptionId: number;
  deleteText: string;
  s3Key?: string;
  onDeleteFinished?: () => void;
}) => {
  const pathName = usePathname();
  const { isEditButtonsDisabled, changeIsEditButtonDisabled } =
    useEditContext();

  const handleDelete = async () => {
    changeIsEditButtonDisabled(true);
    await removeTextDescriptionData({
      id: textDescriptionId,
      pathName: pathName,
    });
    changeIsEditButtonDisabled(false);

    if (s3Key) {
      axios.post("/api/removeFile", {
        s3Key,
      });
    }
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
