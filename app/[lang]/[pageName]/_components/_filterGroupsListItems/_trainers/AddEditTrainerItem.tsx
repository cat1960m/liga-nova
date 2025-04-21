"use client";

import { StaticTexts } from "@/app/dictionaries/definitions";
import { AddTextDescriptionButton } from "../../__commonComponents/_buttons/AddTextDescriptionButton";
import { TextItemField } from "../../TextItemField";
import { FullData, MainParams } from "@/app/lib/definitions";
import {
  TRAINER_ITEM_DESCRIPTION,
  TRAINER_ITEM_IS_PREMIUM,
  TRAINER_ITEM_NAME,
} from "@/app/lib/constants";
import { updateTextDescriptionValue } from "@/app/lib/actions_fitness";
import { ChangeEventHandler } from "react";
import { usePathname } from "next/navigation";

export type Props = {
  commonWidth: string;
  staticTexts: StaticTexts;
  trainerItemFeatureId: number;
  currentData: FullData[];
  setIsSaveDisabled?: (value: boolean) => void;
  params: MainParams;
};

export const AddEditTrainerItem = ({
  commonWidth,
  staticTexts,
  trainerItemFeatureId,
  currentData,
  setIsSaveDisabled,
  params,
}: Props) => {
  const pathName = usePathname();

  const name = currentData.find((item) => item.text_type === TRAINER_ITEM_NAME);
  const isPremium = currentData.find(
    (item) => item.text_type === TRAINER_ITEM_IS_PREMIUM
  );
  const descriptions = currentData.filter((item) =>
    [TRAINER_ITEM_DESCRIPTION].includes(item.text_type)
  );

  if (!name || !isPremium || !isPremium) {
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
        params={params}
      />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "5px",
          alignItems: "center",
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

      {descriptions.map((description) => {
        return (
          <TextItemField
            fieldData={description}
            staticTexts={staticTexts}
            key={description.text_description_id}
            importantDescriptionType=""
            params={params}
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
