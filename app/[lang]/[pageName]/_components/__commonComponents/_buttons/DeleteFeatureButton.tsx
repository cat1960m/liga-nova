"use client";

import {
  getFeatureChildren,
  RemoveFeature,
  revalidate,
  UpdateFeatureOrder,
} from "@/app/lib/actions_fitness";
import { usePathname } from "next/navigation";
import { CommonButton } from "./CommonButton";
import axios from "axios";
import { Feature, FullData } from "@/app/lib/definitions";
import { S3_TYPES } from "@/app/lib/constants";
import { useEditContext } from "../../../edit/_components/EditContextProvider";
import { ChangeOrderButtons } from "./ChangeOrderButtons";
import { TrashIcon } from "@heroicons/react/24/outline";

export const DeleteFeatureButton = ({
  deleteText,
  onDeleteFinished,
  featureData,
  isHorizontal,
  noChangeOrder,
  noDelete,
}: {
  deleteText: string;
  onDeleteFinished?: () => void;
  featureData: FullData[];
  isHorizontal?: boolean;
  noChangeOrder?: boolean;
  noDelete?: boolean;
}) => {
  const pathName = usePathname();
  const { isEditButtonsDisabled, changeIsEditButtonDisabled } =
    useEditContext();

  const featureFirst = featureData.length ? featureData[0] : undefined;

  if (!featureFirst) {
    return null;
  }

  const featureId = featureFirst.id;
  const parentFeatureId = featureFirst.parent_feature_id;

  const handleDelete = async () => {
    changeIsEditButtonDisabled(true);

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

    changeIsEditButtonDisabled(false);

    onDeleteFinished?.();
  };

  const changeOrder = async (isToStart: boolean) => {
    if (!parentFeatureId) {
      return;
    }

    changeIsEditButtonDisabled(true);

    const features: Feature[] | null = await getFeatureChildren({
      parentFeatureId,
    });

    if (features && features.length > 1) {
      const index = features.findIndex((feature) => feature.id === featureId);
      let newIndex = isToStart ? index - 1 : index + 1;

      if (newIndex < 0) {
        newIndex = features.length - 1;
      }

      if (newIndex >= features.length) {
        newIndex = 0;
      }

      const featureToChangeOrderWith = features[newIndex];
      const feature = features[index];

      await UpdateFeatureOrder({
        id: featureId,
        order: featureToChangeOrderWith.feature_order,
      });
      await UpdateFeatureOrder({
        id: featureToChangeOrderWith.id,
        order: feature.feature_order,
      });
      await revalidate(pathName);
    }

    changeIsEditButtonDisabled(false);
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "5px",
        alignItems: "center",
        alignContent: "center",
        flexWrap: "wrap",
      }}
    >
      {!noDelete ? (
        <CommonButton onClick={handleDelete} isDisabled={isEditButtonsDisabled}>
          <TrashIcon style={{ width: "24px" }} title={deleteText} />
        </CommonButton>
      ) : null}

      {!noChangeOrder && parentFeatureId ? (
        <ChangeOrderButtons
          isHorizontal={isHorizontal}
          changeOrder={changeOrder}
        />
      ) : null}
    </div>
  );
};
