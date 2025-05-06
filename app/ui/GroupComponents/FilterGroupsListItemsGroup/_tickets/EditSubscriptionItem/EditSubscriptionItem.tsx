"use client";

import { TextItemField } from "../../TextItemField/TextItemField";
import {
  SUBSCRIPTION_ITEM_CAN_POSTPONE,
  SUBSCRIPTION_ITEM_DESCRIPTION,
  SUBSCRIPTION_ITEM_NAME,
  SUBSCRIPTION_ITEM_OLD_PRICE,
  SUBSCRIPTION_ITEM_PRICE,
  SUBSCRIPTION_ITEM_SHARE,
} from "@/app/lib/constants";
import { FullData } from "@/app/lib/definitions";
import { CheckboxItemField } from "../../CheckboxItemField/CheckboxItemField";

import styles from "./editSubscriptionItem.module.css";
import { StaticTexts } from "@/app/dictionaries/definitions";

export type Props = {
  currentData: FullData[];
  staticTexts: StaticTexts;
  lang: string;
  isEdit: boolean;
};

export const EditSubscriptionItem = ({
  currentData,
  staticTexts,
  lang,
  isEdit,
}: Props) => {
  const name = currentData.find(
    (item) => item.text_type === SUBSCRIPTION_ITEM_NAME
  );
  const share = currentData.find(
    (item) => item.text_type === SUBSCRIPTION_ITEM_SHARE
  );
  const price = currentData.find(
    (item) => item.text_type === SUBSCRIPTION_ITEM_PRICE
  );
  const oldPrice = currentData.find(
    (item) => item.text_type === SUBSCRIPTION_ITEM_OLD_PRICE
  );
  const description = currentData.find(
    (item) => item.text_type === SUBSCRIPTION_ITEM_DESCRIPTION
  );

  const isPostpone = currentData.find(
    (item) => item.text_type === SUBSCRIPTION_ITEM_CAN_POSTPONE
  );

  if (!name || !price || !share || !oldPrice || !description || !isPostpone) {
    return null;
  }

  return (
    <div className={styles.container}>
      <TextItemField
        fieldData={name}
        title={staticTexts.name}
        useItems={{ text: "simple" }}
        isEdit={isEdit}
        staticTexts={staticTexts}
        lang={lang}
      />
      <TextItemField
        fieldData={price}
        title={staticTexts.price}
        useItems={{ text: "simple", price: "price" }}
        isEdit={isEdit}
        staticTexts={staticTexts}
        lang={lang}
      />
      <TextItemField
        fieldData={share}
        title={staticTexts.share}
        useItems={{ text: "simple" }}
        isEdit={isEdit}
        staticTexts={staticTexts}
        lang={lang}
      />
      <TextItemField
        fieldData={oldPrice}
        title={staticTexts.oldPrice}
        useItems={{ text: "simple" }}
        isEdit={isEdit}
        staticTexts={staticTexts}
        lang={lang}
      />

      <TextItemField
        fieldData={description}
        title={staticTexts.descriptions}
        useItems={{ text: "quill" }}
        isEdit={isEdit}
        staticTexts={staticTexts}
        lang={lang}
      />

      <CheckboxItemField
        title={staticTexts.postponement ?? "N/A"}
        currentData={isPostpone}
      />
    </div>
  );
};
