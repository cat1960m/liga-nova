"use client";

import { RemoveFeature } from "@/app/lib/actions_fitness";
import { usePathname } from "next/navigation";
import { CommonButton } from "../_buttons/CommonButton";
import axios from "axios";
import { FullData } from "@/app/lib/definitions";
import { S3_TYPES } from "@/app/lib/constants";

export const DeleteFeatureButton = ({
  featureId,
  deleteText,
  onDeleteFinished,
  featureData,
}: {
  featureId?: number;
  deleteText: string;
  onDeleteFinished?: () => void;
  featureData: FullData[];
}) => {
  const pathName = usePathname();

  if (!featureId) {
    return null;
  }

  const handleDelete = async () => {
    await RemoveFeature({ id: featureId, pathName: pathName });

    const imageData = featureData.filter(
      (data) => S3_TYPES.includes(data.text_type) && !!data.value
    );

    const promises: Promise<any>[] = [];

    if (imageData.length) {
      imageData.forEach((data) => {
        promises.push(
          axios.post("/api/removeFile", {
            s3Key: data.value,
          })
        );
      });

      await Promise.all(promises);
    }

    onDeleteFinished?.();
  };

  return <CommonButton text={deleteText} onClick={handleDelete} />;
};
