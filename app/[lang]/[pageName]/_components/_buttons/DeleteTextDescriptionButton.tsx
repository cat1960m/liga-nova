"use client";

import { RemoveTextDescription } from "@/app/lib/actions_fitness";
import { usePathname } from "next/navigation";
import { CommonButton } from "../_buttons/CommonButton";
import axios from "axios";
import { useEditContext } from "../../edit/_components/EditContextProvider";

export const DeleteTextDescriptionButton = ({
  textDescriptionId,
  deleteText,
  s3Key,
}: {
  textDescriptionId: number;
  deleteText: string;
  s3Key?: string;
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
  };

  return (
    <CommonButton
      text={deleteText}
      onClick={handleDelete}
      isDisabled={isEditButtonsDisabled}
    />
  );
};
