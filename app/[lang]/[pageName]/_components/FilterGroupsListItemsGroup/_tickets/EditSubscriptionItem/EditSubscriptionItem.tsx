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
import { FullData, MainParams } from "@/app/lib/definitions";
import { CheckboxItemField } from "../../CheckboxItemField/CheckboxItemField";

import styles from "./editSubscriptionItem.module.css";

export type Props = {
  currentData: FullData[];
  params: MainParams;
};

export const EditSubscriptionItem = ({ currentData, params }: Props) => {
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

  const { staticTexts } = params;

  return (
    <div className={styles.container}>
      <TextItemField
        fieldData={name}
        title={staticTexts.name}
        params={params}
        useItems={{ text: "simple" }}
      />
      <TextItemField
        fieldData={price}
        title={staticTexts.price}
        params={params}
        useItems={{ text: "simple", price: "price" }}
      />
      <TextItemField
        fieldData={share}
        title={staticTexts.share}
        params={params}
        useItems={{ text: "simple" }}
      />
      <TextItemField
        fieldData={oldPrice}
        title={staticTexts.oldPrice}
        params={params}
        useItems={{ text: "simple" }}
      />

      <TextItemField
        fieldData={description}
        title={staticTexts.descriptions}
        params={params}
        useItems={{ text: "quill" }}
      />

      <CheckboxItemField
        title={staticTexts.postponement ?? "N/A"}
        currentData={isPostpone}
      />
    </div>
  );
};
