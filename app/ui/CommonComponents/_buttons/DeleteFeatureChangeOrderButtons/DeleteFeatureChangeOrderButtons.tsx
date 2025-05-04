"use client";

import {
  getFeatureChildren,
  RemoveFeature,
  revalidate,
  UpdateFeatureOrder,
} from "@/app/lib/actions_fitness";
import { usePathname } from "next/navigation";
import { CommonButton } from "../CommonButton";
import axios from "axios";
import { Feature, FullData } from "@/app/lib/definitions";
import {
  ICON_BUTTON_WIDTH,
  ICON_IN_BUTTON_WIDTH,
  S3_TYPES,
} from "@/app/lib/constants";
import { useEditContext } from "../../../PageComponents/EditContextProvider";
import { ChangeOrderButtons } from "../ChangeOrderButtons/ChangeOrderButtons";
import { TrashIcon } from "@heroicons/react/24/outline";

import styles from "./deleteFeatureChangeOrderButtons.module.css";
import { useEffect, useState } from "react";

export const DeleteFeatureChangeOrderButtons = ({
  deleteText,
  onDeleteFinished,
  featureData,
  isChangeOrderHorizontal,
  noChangeOrder,
  noDelete,
}: {
  deleteText: string;
  onDeleteFinished?: () => void;
  featureData: FullData[];
  isChangeOrderHorizontal?: boolean;
  noChangeOrder?: boolean;
  noDelete?: boolean;
}) => {
  const pathName = usePathname();
  const { isEditButtonsDisabled, changeIsEditButtonDisabled } =
    useEditContext();

  const [siblingFeatures, setSiblingFeatures] = useState<Feature[] | null>(
    null
  );

  const featureFirst = featureData.length ? featureData[0] : undefined;
  const featureId = featureFirst?.id;
  const subtype = featureFirst?.subtype;
  const type = featureFirst?.type;

  const parentFeatureId = featureFirst?.parent_feature_id;

  useEffect(() => {
    const getFeatures = async () => {
      if (!parentFeatureId || !type || !subtype) {
        return;
      }
      const features: Feature[] | null = await getFeatureChildren({
        parentFeatureId,
        type,
        subtype,
      });

      setSiblingFeatures(features);

      return;
    };

    getFeatures();
  }, [parentFeatureId, type,subtype]);

  if (!parentFeatureId || !featureFirst || !featureId || !type || !subtype) {
    return null;
  }

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

    const features: Feature[] | null = siblingFeatures;

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

  const countSibling = siblingFeatures?.length || null;

  return (
    <div className={styles.container}>
      {!noDelete ? (
        <CommonButton
          onClick={handleDelete}
          isDisabled={isEditButtonsDisabled}
          width={ICON_BUTTON_WIDTH}
        >
          <TrashIcon width={ICON_IN_BUTTON_WIDTH} title={deleteText} />
        </CommonButton>
      ) : null}

      {!noChangeOrder && !!countSibling && countSibling > 1 ? (
        <ChangeOrderButtons
          isChangeOrderHorizontal={isChangeOrderHorizontal}
          changeOrder={changeOrder}
        />
      ) : null}

      {!noChangeOrder && countSibling === null ? (
        <CommonButton
          width={ICON_BUTTON_WIDTH}
          isDisabled={true}
          text="?"
        />
      ) : null}
    </div>
  );
};
