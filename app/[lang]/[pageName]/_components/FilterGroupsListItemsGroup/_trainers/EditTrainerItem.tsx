"use client";

import { TextItemField } from "../TextItemField/TextItemField";
import { FullData, MainParams } from "@/app/lib/definitions";
import {
  TRAINER_ITEM_DESCRIPTION,
  TRAINER_ITEM_IS_PREMIUM,
  TRAINER_ITEM_NAME,
} from "@/app/lib/constants";
import { CheckboxItemField } from "../CheckboxItemField/CheckboxItemField";

export type Props = {
  currentData: FullData[];
  params: MainParams;
};

export const EditTrainerItem = ({ currentData, params }: Props) => {
  const name = currentData.find((item) => item.text_type === TRAINER_ITEM_NAME);
  const isPremium = currentData.find(
    (item) => item.text_type === TRAINER_ITEM_IS_PREMIUM
  );
  const description = currentData.find(
    (item) => item.text_type === TRAINER_ITEM_DESCRIPTION
  );

  if (!name || !isPremium || !isPremium || !description) {
    return null;
  }
  const { staticTexts } = params;

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <TextItemField
        fieldData={name}
        title={staticTexts.fullName}
        params={params}
        useItems={{ text: "simple", value: "image" }}
      />
      <CheckboxItemField
        title={staticTexts.isPremium ?? "N/A"}
        currentData={isPremium}
      />

      <TextItemField
        fieldData={description}
        params={params}
        useItems={{ text: "quill" }}
        title={staticTexts.descriptions}
      />
    </div>
  );
};
