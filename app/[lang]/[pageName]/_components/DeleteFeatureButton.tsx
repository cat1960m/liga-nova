"use client";

import { RemoveFeature } from "@/app/lib/actions_fitness";
import { usePathname } from "next/navigation";
import { CommonButton } from "./CommonButton";

export const DeleteFeatureButton = ({
  featureId,
  deleteText,
}: {
  featureId: number;
  deleteText: string;
}) => {
  const pathName = usePathname();

  const handleDelete = async () => {
    await RemoveFeature({ id: featureId, pathName: pathName });
  };

  return <CommonButton text={deleteText} onClick={handleDelete} />;
};
