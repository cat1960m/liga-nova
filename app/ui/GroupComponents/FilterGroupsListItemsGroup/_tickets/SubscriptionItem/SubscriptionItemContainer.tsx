import { FullData } from "@/app/lib/definitions";
import {
  SUBSCRIPTION_ITEM_CAN_POSTPONE,
  SUBSCRIPTION_ITEM_DESCRIPTION,
  SUBSCRIPTION_ITEM_NAME,
  SUBSCRIPTION_ITEM_OLD_PRICE,
  SUBSCRIPTION_ITEM_PRICE,
  SUBSCRIPTION_ITEM_SHARE,
  YES,
} from "@/app/lib/constants";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { SubscriptionItem } from "./SubscriptionItem";

export type Props = {
  currentData: FullData[];
  staticTexts: StaticTexts;
};

export const SubscriptionItemContainer = ({ currentData, staticTexts }: Props) => {
  const name = currentData.find(
    (item) => item.text_type === SUBSCRIPTION_ITEM_NAME
  )?.text_content;
  const share = currentData.find(
    (item) => item.text_type === SUBSCRIPTION_ITEM_SHARE
  )?.text_content;
  const price = currentData.find(
    (item) => item.text_type === SUBSCRIPTION_ITEM_PRICE
  )?.text_content;
  const oldPrice = currentData.find(
    (item) => item.text_type === SUBSCRIPTION_ITEM_OLD_PRICE
  )?.text_content;
  const description = currentData.find(
    (item) => item.text_type === SUBSCRIPTION_ITEM_DESCRIPTION
  )?.text_content;

  const isPostponeData = currentData.find(
    (item) => item.text_type === SUBSCRIPTION_ITEM_CAN_POSTPONE
  );

  return (
    <SubscriptionItem
      staticTexts={staticTexts}
      share={share}
      name={name}
      price={price}
      oldPrice={oldPrice}
      description={description}
      isPostpone={isPostponeData?.value === YES}
    />
  );
};
