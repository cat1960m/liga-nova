"use client";
import { FullData } from "@/app/lib/definitions";
import { DeleteTextDescriptionButton } from "../DeleteTextDescriptionButton";
import { UpdateTextDescriptionData } from "../../_upadeModal/UpdateTextDescriptionData";
import { ChangeOrderButtons } from "../ChangeOrderButtons/ChangeOrderButtons";
import { useEditContext } from "../../../PageComponents/EditContextProvider";
import {
  revalidate,
  UpdateTextDescriptionsOrder,
} from "@/app/lib/actions_fitness";
import { usePathname } from "next/navigation";
import { UseItems } from "../../_upadeModal/UpdateTextDescriptionDataModalContent/UpdateTextDescriptionDataModalContent";
import { StaticTexts } from "@/app/dictionaries/definitions";

import styles from "./updateDeleteTextButtons.module.css";
import { useMemo } from "react";
export type Props = {
  currentData?: FullData;
  isChangeOrder?: boolean;
  isChangeOrderHorizontal?: boolean;
  s3Key?: string;
  useItems: UseItems;
  lang: string;
  staticTexts: StaticTexts;

  changeModalState?: (state: boolean) => void;
  onDeleteFinished?: () => void;
};

export const UpdateDeleteTextButtons = ({
  currentData,
  isChangeOrder,
  isChangeOrderHorizontal,
  s3Key,
  useItems,
  lang,
  staticTexts,
  changeModalState,
  onDeleteFinished,
}: Props) => {
  const { changeIsEditButtonDisabled, pageFullDataList } = useEditContext();
  const pathName = usePathname();

  const textDescriptionSibling: FullData[] = useMemo(() => {
    return pageFullDataList.filter(
      (data) =>
        data.id === currentData?.id && data.text_type === currentData.text_type
    );
  }, [pageFullDataList, currentData?.id, currentData?.text_type]);

  if (!currentData) {
    return null;
  }
  const canDelete = !!currentData.can_delete;

  const changeOrder = async (isToStart: boolean) => {
    if (!isChangeOrder) {
      return;
    }

    changeIsEditButtonDisabled(true);

    const textDescriptions = textDescriptionSibling;

    if (textDescriptions && textDescriptions.length > 1) {
      const index = textDescriptions.findIndex(
        (textDescription) =>
          textDescription.text_description_id ===
          currentData.text_description_id
      );
      let newIndex = isToStart ? index - 1 : index + 1;

      if (newIndex < 0) {
        newIndex = textDescriptions.length - 1;
      }

      if (newIndex >= textDescriptions.length) {
        newIndex = 0;
      }

      const textDescriptionToChangeOrderWith = textDescriptions[newIndex];
      const textDescription = textDescriptions[index];

      await UpdateTextDescriptionsOrder({
        id: textDescription.text_description_id,
        order: textDescriptionToChangeOrderWith.text_description_order,
      });
      await UpdateTextDescriptionsOrder({
        id: textDescriptionToChangeOrderWith.text_description_id,
        order: textDescription.text_description_order,
      });
      await revalidate(pathName);
    }

    changeIsEditButtonDisabled(false);
  };

  return (
    <div className={styles.container}>
      <UpdateTextDescriptionData
        currentData={currentData}
        useItems={useItems}
        lang={lang}
        staticTexts={staticTexts}
        changeModalState={changeModalState}
      />
      {canDelete ? (
        <DeleteTextDescriptionButton
          textDescriptionId={currentData.text_description_id}
          deleteText={staticTexts.delete ?? "N/A"}
          s3Key={
            s3Key ||
            (useItems.value === "image" ? currentData.value : undefined)
          }
          onDeleteFinished={onDeleteFinished}
        />
      ) : null}

      {isChangeOrder && textDescriptionSibling.length > 1 ? (
        <ChangeOrderButtons
          isChangeOrderHorizontal={isChangeOrderHorizontal}
          changeOrder={changeOrder}
        />
      ) : null}
    </div>
  );
};
