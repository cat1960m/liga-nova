"use client";
import { FullData, TextDescription } from "@/app/lib/definitions";
import { DeleteTextDescriptionButton } from "./DeleteTextDescriptionButton";
import { UpdateTextDescriptionData } from "../_clientComponents/UpdateTextDescriptionData";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { ChangeOrderButtons } from "./ChangeOrderButtons";
import { useEditContext } from "../../edit/_components/EditContextProvider";
import {
  getTextDescriptions,
  revalidate,
  UpdateTextDescriptionsOrder,
} from "@/app/lib/actions_fitness";
import { usePathname } from "next/navigation";
import { CSSProperties } from "react";
export type Props = {
  currentData?: FullData;
  staticTexts: StaticTexts;
  useIcons?: boolean;
  isArea?: boolean;
  isQuill?: boolean;
  changeOrderTextType?: string;
  isHorizontal?: boolean;
  isNoUpdate?: boolean;
  s3Key?: string;
  flexDirection?: CSSProperties["flexDirection"];
};

export const UpdateDeleteTextButtons = ({
  currentData,
  staticTexts,
  useIcons,
  isArea,
  isQuill,
  changeOrderTextType,
  isHorizontal,
  isNoUpdate = false,
  s3Key,
  flexDirection = "row",
}: Props) => {
  const { changeIsEditButtonDisabled } = useEditContext();
  const pathName = usePathname();

  if (!currentData) {
    return null;
  }
  const canDelete = !!currentData.can_delete;

  const changeOrder = async (isToStart: boolean) => {
    if (!changeOrderTextType) {
      return;
    }

    changeIsEditButtonDisabled(true);

    const textDescriptions: TextDescription[] | null =
      await getTextDescriptions({
        featureId: currentData.id,
        textType: changeOrderTextType,
      });

    console.log(
      "textDescriptions",
      textDescriptions,
      changeOrderTextType,
      currentData.id
    );
    console.log("currentData", currentData);

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
      {!isNoUpdate ? (
        <UpdateTextDescriptionData
          currentData={currentData}
          staticTexts={staticTexts}
          useIcons={useIcons}
          isArea={isArea}
          isQuill={isQuill}
        />
      ) : null}
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
            s3Key={s3Key}
          />
        ) : null}

        {changeOrderTextType ? (
          <ChangeOrderButtons
            isHorizontal={isHorizontal}
            changeOrder={changeOrder}
          />
        ) : null}
      </div>
    </div>
  );
};
