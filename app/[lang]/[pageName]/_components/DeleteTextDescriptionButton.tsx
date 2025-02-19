"use client";

import { RemoveTextDescription } from "@/app/lib/actions_fitness";
import { usePathname } from "next/navigation";
import { CommonButton } from "./CommonButton";

export const DeleteTextDescriptionButton = ({
  textDescriptionId,
  deleteText,
}: {
  textDescriptionId: number;
  deleteText: string;
}) => {
  const pathName = usePathname();

  const handleDelete = async () => {
    await RemoveTextDescription({ id: textDescriptionId, pathName: pathName });
  };

  return <CommonButton text={deleteText} onClick={handleDelete} />;
};
