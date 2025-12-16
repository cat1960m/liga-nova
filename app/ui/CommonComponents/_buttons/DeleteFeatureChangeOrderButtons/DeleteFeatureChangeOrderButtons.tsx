"use client";

import { revalidate } from "@/app/lib/actions_fitness";
import { usePathname } from "next/navigation";
import { FullData } from "@/app/lib/definitions";
import { CONTAINER_TYPES } from "@/app/lib/constants";
import { useEditContext } from "../../../PageComponents/EditContextProvider";
import { ChangeOrderButtons } from "../ChangeOrderButtons/ChangeOrderButtons";

import styles from "./deleteFeatureChangeOrderButtons.module.css";
import { useMemo } from "react";
import { updateFeatureOrderData } from "@/app/lib/actionsContainer";
import { CountIndex } from "@/app/dictionaries/definitions";
import { DeleteButton } from "../DeleteButton/DeleteButton";
import { useRemoveFeature } from "@/app/ui/hooks/useRemoveFeature";

type IdOrder = {
  id: number;
  order: number;
};

export const DeleteFeatureChangeOrderButtons = ({
  deleteText,
  onDeleteFinished,
  featureData,
  isChangeOrderHorizontal,
  noChangeOrder,
  noDelete,
  countIndex,
  isWithoutHistory,
}: {
  deleteText: string;
  onDeleteFinished?: () => void;
  featureData: FullData[];
  isChangeOrderHorizontal?: boolean;
  noChangeOrder: boolean;
  noDelete?: boolean;
  countIndex: CountIndex | null;
  isWithoutHistory?: boolean;
}) => {
  const pathName = usePathname();
  const {
    isEditButtonsDisabled,
    changeIsEditButtonDisabled,
    pageFullDataList,
  } = useEditContext();
  const { removeFeature } = useRemoveFeature();

  const featureFirst = featureData.length ? featureData[0] : undefined;
  const featureId = featureFirst?.id;
  const subtype = featureFirst?.subtype;
  const type = featureFirst?.type;

  const parentFeatureId = featureFirst?.parent_feature_id;

  const sibling: IdOrder[] = useMemo(() => {
    const parentData = pageFullDataList.find(
      (item) => item.id === parentFeatureId
    );
    if (!parentData) {
      return [];
    }

    const isParentContainer =
      !parentData.parent_feature_id ||
      CONTAINER_TYPES.includes(parentData.type);

    const parentChildren = isParentContainer
      ? pageFullDataList.filter(
          (item) => item.parent_feature_id === parentFeatureId
        )
      : pageFullDataList.filter(
          (item) =>
            item.parent_feature_id === parentFeatureId &&
            item.type === type &&
            item.subtype === subtype
        );

    return parentChildren.reduce<IdOrder[]>((result, current) => {
      if (
        result.find(
          (item) =>
            item.id === current.id && item.order === current.feature_order
        )
      ) {
        return result;
      }

      result.push({ id: current.id, order: current.feature_order });
      return result;
    }, []);
  }, [pageFullDataList, parentFeatureId, type, subtype]);

  if (!featureFirst || !featureId) {
    return null;
  }

  const handleDelete = async () => {
    changeIsEditButtonDisabled(true);

    await removeFeature({
      feature: featureFirst,
      isWithoutHistory: !!isWithoutHistory,
    });

    changeIsEditButtonDisabled(false);
    onDeleteFinished?.();
  };

  const changeOrder = async (isToStart: boolean) => {
    if (!parentFeatureId) {
      return;
    }
    changeIsEditButtonDisabled(true);

    if (sibling && sibling.length > 1) {
      const index = sibling.findIndex((item) => item.id === featureId);
      let newIndex = isToStart ? index - 1 : index + 1;

      if (newIndex < 0) {
        newIndex = sibling.length - 1;
      }

      if (newIndex >= sibling.length) {
        newIndex = 0;
      }

      const itemToChangeOrderWith = sibling[newIndex];
      const newOrder = itemToChangeOrderWith.order;
      const newId = itemToChangeOrderWith.id;

      const current = sibling[index];
      const currentOrder = current.order;
      const currentId = current.id;

      await updateFeatureOrderData({
        id: currentId,
        order: newOrder,
      });
      await updateFeatureOrderData({
        id: newId,
        order: currentOrder,
      });
      await revalidate(pathName);
    }

    changeIsEditButtonDisabled(false);
  };

  const countSibling = sibling.length;

  return (
    <div className={styles.container}>
      {!noDelete ? (
        <DeleteButton
          title={deleteText}
          onClick={handleDelete}
          isDisabled={isEditButtonsDisabled}
        />
      ) : null}

      {!noChangeOrder && countSibling > 1 ? (
        <ChangeOrderButtons
          isChangeOrderHorizontal={isChangeOrderHorizontal}
          changeOrder={changeOrder}
          countIndex={countIndex}
        />
      ) : null}
    </div>
  );
};
