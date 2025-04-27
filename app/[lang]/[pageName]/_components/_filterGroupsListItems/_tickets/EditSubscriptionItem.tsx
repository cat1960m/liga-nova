"use client";

import { StaticTexts } from "@/app/dictionaries/definitions";
import { AddTextDescriptionButton } from "../../__commonComponents/_buttons/AddTextDescriptionButton";
import { TextItemField } from "../TextItemField";
import {
  SUBSCRIPTION_ITEM_CAN_POSTPONE,
  SUBSCRIPTION_ITEM_DESCRIPTION,
  SUBSCRIPTION_ITEM_NAME,
  SUBSCRIPTION_ITEM_OLD_PRICE,
  SUBSCRIPTION_ITEM_PRICE,
  SUBSCRIPTION_ITEM_SHARE,
  YES,
} from "@/app/lib/constants";
import { FullData, MainParams } from "@/app/lib/definitions";
import { ChangeEventHandler } from "react";
import { updateTextDescriptionValue } from "@/app/lib/actions_fitness";
import { usePathname } from "next/navigation";
import { CheckboxItemField } from "../CheckboxItemField";

export type Props = {
  staticTexts: StaticTexts;
  currentData: FullData[];
  params: MainParams;
};

export const EditSubscriptionItem = ({
  staticTexts,
  currentData,
  params,
}: Props) => {
  const pathName = usePathname();
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

  const handleIsPostponeChange: ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    const value = event.target.checked ? YES : "no";
    await updateTextDescriptionValue({
      value,
      textDescriptionId: isPostpone.text_description_id,
      pathName,
    });
  };

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
        staticTexts={staticTexts}
        title={staticTexts.name}
        params={params}
        useItems={{ text: "simple" }}
      />
      <TextItemField
        fieldData={price}
        staticTexts={staticTexts}
        title={staticTexts.price}
        params={params}
        useItems={{ text: "simple", price: "price" }}
      />
      <TextItemField
        fieldData={share}
        staticTexts={staticTexts}
        title={staticTexts.share}
        params={params}
        useItems={{ text: "simple" }}
      />
      <TextItemField
        fieldData={oldPrice}
        staticTexts={staticTexts}
        title={staticTexts.oldPrice}
        params={params}
        useItems={{ text: "simple" }}
      />

      <TextItemField
        fieldData={description}
        staticTexts={staticTexts}
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
