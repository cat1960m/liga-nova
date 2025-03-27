"use client";

import { RemoveTextDescription } from "@/app/lib/actions_fitness";
import { usePathname } from "next/navigation";
import { CommonButton } from "../_buttons/CommonButton";
import axios from "axios";

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

  const handleDelete = async () => {
    await RemoveTextDescription({ id: textDescriptionId, pathName: pathName });

    if (s3Key) {
      axios.post("/api/removeFile", {
        s3Key,
      });
    }
  };

  return <CommonButton text={deleteText} onClick={handleDelete} />;
};
