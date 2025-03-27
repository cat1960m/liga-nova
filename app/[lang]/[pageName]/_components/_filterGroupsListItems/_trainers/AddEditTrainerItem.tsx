"use client";

import { StaticTexts } from "@/app/dictionaries/definitions";
import { AddTextDescriptionButton } from "../../_buttons/AddTextDescriptionButton";
import { TextItemField } from "../../TextItemField";
import { FullData } from "@/app/lib/definitions";
import {
  TRAINER_ITEM_DESCRIPTION,
  TRAINER_ITEM_IMAGE,
  TRAINER_ITEM_IS_PREMIUM,
  TRAINER_ITEM_NAME,
} from "@/app/lib/constants";
import { UploadComponent } from "../../_clientComponents/UploadComponent";
import { updateTextDescriptionValue } from "@/app/lib/actions_fitness";
import { ChangeEventHandler } from "react";
import { usePathname } from "next/navigation";

export type Props = {
  commonWidth: string;
  staticTexts: StaticTexts;
  trainerItemFeatureId: number;
  currentData: FullData[];
  setIsSaveDisabled?: (value: boolean) => void;
};

export const AddEditTrainerItem = ({
  commonWidth,
  staticTexts,
  trainerItemFeatureId,
  currentData,
  setIsSaveDisabled,
}: Props) => {
  const pathName = usePathname();

  const name = currentData.find((item) => item.text_type === TRAINER_ITEM_NAME);
  const isPremium = currentData.find(
    (item) => item.text_type === TRAINER_ITEM_IS_PREMIUM
  );
  const photo = currentData.find(
    (item) => item.text_type === TRAINER_ITEM_IMAGE
  );
  const descriptions = currentData.filter((item) =>
    [TRAINER_ITEM_DESCRIPTION].includes(item.text_type)
  );

  if (!name || !isPremium || !photo || !isPremium) {
    return null;
  }

  const handleIsPremiumChange: ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    const value = event.target.checked ? "yes" : "no";
    setIsSaveDisabled?.(true);
    await updateTextDescriptionValue({
      value,
      textDescriptionId: isPremium.text_description_id,
      pathName,
    });
    setIsSaveDisabled?.(false);
  };

  const handlePhotoUploaded = async (value: string) => {
    setIsSaveDisabled?.(true);
    await updateTextDescriptionValue({
      value,
      textDescriptionId: photo.text_description_id,
      pathName,
    });
    setIsSaveDisabled?.(false);
  };

  return (
    <div
      style={{
        width: "100%",
        border: "1px dotted magenta",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        padding: "5px",
      }}
    >
      <TextItemField
        fieldData={name}
        staticTexts={staticTexts}
        title={staticTexts.name}
        importantDescriptionType=""
      />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "5px",
        }}
      >
        <div style={{ fontWeight: 700 }}>
          {staticTexts.isPremium ?? "N/A"}:{" "}
        </div>

        <input
          type="checkbox"
          checked={isPremium.value === "yes"}
          onChange={handleIsPremiumChange}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "5px",
        }}
      >
        <div style={{ fontWeight: 700 }}>{staticTexts.photo ?? "N/A"}: </div>

        <UploadComponent
          onUploaded={handlePhotoUploaded}
          s3Key={photo.value}
          staticTexts={staticTexts}
          maxWidth="200px"
        />
      </div>

      <div style={{ fontWeight: 700 }}>{staticTexts.descriptions}: </div>

      {descriptions.map((description) => {
        return (
          <TextItemField
            fieldData={description}
            staticTexts={staticTexts}
            key={description.text_description_id}
            importantDescriptionType=""
          />
        );
      })}

      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          flexWrap: "wrap",
          padding: "5px",
        }}
      >
        <AddTextDescriptionButton
          featureId={trainerItemFeatureId}
          textType={TRAINER_ITEM_DESCRIPTION}
          buttonText={staticTexts.addDescription ?? "N/A"}
          price={null}
        />
      </div>
    </div>
  );
};
