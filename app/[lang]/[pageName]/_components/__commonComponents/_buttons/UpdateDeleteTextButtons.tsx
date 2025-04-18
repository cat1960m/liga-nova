"use client";
import { FullData, MainParams, TextDescription } from "@/app/lib/definitions";
import { DeleteTextDescriptionButton } from "./DeleteTextDescriptionButton";
import { UpdateTextDescriptionData } from "../_upadeModal/UpdateTextDescriptionData";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { ChangeOrderButtons } from "./ChangeOrderButtons";
import { useEditContext } from "../../../edit/_components/EditContextProvider";
import {
  getTextDescriptions,
  revalidate,
  UpdateTextDescriptionsOrder,
} from "@/app/lib/actions_fitness";
import { usePathname } from "next/navigation";
import { CSSProperties } from "react";
import { UseItems } from "../_upadeModal/UpdateTextDescriptionDataModalContent";
export type Props = {
  currentData?: FullData;
  staticTexts: StaticTexts;
  isChangeOrder?: boolean;
  isHorizontal?: boolean;
  s3Key?: string;
  flexDirection?: CSSProperties["flexDirection"];
  useItems: UseItems;
  params: MainParams;
  changeModalState?: (state: boolean) => void;
};

export const UpdateDeleteTextButtons = ({
  currentData,
  staticTexts,
  isChangeOrder,
  isHorizontal,
  s3Key,
  flexDirection = "row",
  useItems,
  params,
  changeModalState,
}: Props) => {
  const { changeIsEditButtonDisabled } = useEditContext();
  const pathName = usePathname();

  if (!currentData) {
    return null;
  }
  const canDelete = !!currentData.can_delete;

  const changeOrder = async (isToStart: boolean) => {
    if (!isChangeOrder) {
      return;
    }

    changeIsEditButtonDisabled(true);

    const textDescriptions: TextDescription[] | null =
      await getTextDescriptions({
        featureId: currentData.id,
        textType: currentData.text_type,
      });

    if (textDescriptions && textDescriptions.length > 1) {
      const index = textDescriptions.findIndex(
        (textDescription) =>
          textDescription.id === currentData.text_description_id
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
        id: textDescription.id,
        order: textDescriptionToChangeOrderWith.text_description_order,
      });
      await UpdateTextDescriptionsOrder({
        id: textDescriptionToChangeOrderWith.id,
        order: textDescription.text_description_order,
      });
      await revalidate(pathName);
    }

    changeIsEditButtonDisabled(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection,
        gap: "10px",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <UpdateTextDescriptionData
        currentData={currentData}
        staticTexts={staticTexts}
        useItems={useItems}
        params={params}
        changeModalState={changeModalState}
      />
      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          flexWrap: "wrap",
          flexDirection,
        }}
      >
        {canDelete ? (
          <DeleteTextDescriptionButton
            textDescriptionId={currentData.text_description_id}
            deleteText={staticTexts.delete ?? "N/A"}
            s3Key={s3Key || (useItems.value === "image" ? currentData.value: undefined)}
          />
        ) : null}

        {isChangeOrder ? (
          <ChangeOrderButtons
            isHorizontal={isHorizontal}
            changeOrder={changeOrder}
          />
        ) : null}
      </div>
    </div>
  );
};
