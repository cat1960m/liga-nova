"use client";

import { RemoveTextDescription } from "@/app/lib/actions_fitness";
import { usePathname } from "next/navigation";
import { CommonButton } from "./CommonButton";
import axios from "axios";
import { useEditContext } from "../../PageComponents/EditContextProvider";
import { TrashIcon } from "@heroicons/react/24/outline";
import { ICON_BUTTON_WIDTH, ICON_IN_BUTTON_WIDTH } from "@/app/lib/constants";

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
    await RemoveTextDescription({ id: textDescriptionId, pathName: pathName });
    changeIsEditButtonDisabled(false);

    if (s3Key) {
      axios.post("/api/removeFile", {
        s3Key,
      });
    }
    onDeleteFinished?.();
  };

  return (
    <CommonButton
      onClick={handleDelete}
      isDisabled={isEditButtonsDisabled}
      width={ICON_BUTTON_WIDTH}
    >
      <TrashIcon
        color="black"
        width={ICON_IN_BUTTON_WIDTH}
        title={deleteText}
      />
    </CommonButton>
  );
};
