"use client";

import { TextItemField } from "../../TextItemField/TextItemField";
import { FullData, MainParams } from "@/app/lib/definitions";
import {
  TRAINER_ITEM_DESCRIPTION,
  TRAINER_ITEM_IS_PREMIUM,
  TRAINER_ITEM_NAME,
} from "@/app/lib/constants";
import { CheckboxItemField } from "../../CheckboxItemField/CheckboxItemField";
import { StaticTexts } from "@/app/dictionaries/definitions";

import styles from "./editTrainerItem.module.css";

export type Props = {
  currentData: FullData[];
  staticTexts: StaticTexts;
  lang: string;
  isEdit: boolean;
};

export const EditTrainerItem = ({
  currentData,
  staticTexts,
  isEdit,
  lang,
}: Props) => {
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

  return (
    <div className={styles.container}>
      <TextItemField
        fieldData={name}
        title={staticTexts.fullName}
        useItems={{ text: "simple", value: "image" }}
        isEdit={isEdit}
        staticTexts={staticTexts}
        lang={lang}
      />
      <CheckboxItemField
        title={staticTexts.isPremium ?? "N/A"}
        currentData={isPremium}
      />

      <TextItemField
        fieldData={description}
        useItems={{ text: "quill" }}
        title={staticTexts.descriptions}
        isEdit={isEdit}
        staticTexts={staticTexts}
        lang={lang}
      />
    </div>
  );
};
