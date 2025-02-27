"use client";

import { RemoveFeature } from "@/app/lib/actions_fitness";
import { usePathname } from "next/navigation";
import { CommonButton } from "./CommonButton";

export const DeleteFeatureButton = ({
  featureId,
  deleteText,
  onDeleteFInished,
}: {
  featureId?: number;
  deleteText: string;
  onDeleteFInished?: () => void;
}) => {
  const pathName = usePathname();

  if (!featureId) {
    return null;
  }

  const handleDelete = async () => {
    await RemoveFeature({ id: featureId, pathName: pathName });
    onDeleteFInished?.();
  };

  return <CommonButton text={deleteText} onClick={handleDelete} />;
};
