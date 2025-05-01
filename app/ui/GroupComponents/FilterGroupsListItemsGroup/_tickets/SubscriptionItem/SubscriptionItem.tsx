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
import { CommonButton } from "@/app/ui/CommonComponents/_buttons/CommonButton";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { ActionButton } from "@/app/ui/CommonComponents/_buttons/ActionButton/ActionButton";

import styles from "./subscriptionItem.module.css";

export type Props = {
  currentData: FullData[];
  staticTexts: StaticTexts;
};

export const SubscriptionItem = ({ currentData, staticTexts }: Props) => {
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

  if (!name || !price) {
    return null;
  }

  return (
    <div className={styles.container}>
      {share?.text_content ? (
        <div className={styles.share}>{share.text_content}</div>
      ) : null}

      <div className={styles.name}>{name.text_content ?? "N/A"}</div>

      <div className={styles.price}>{price.price}</div>
      <div className={styles.price_text}>{price.text_content}</div>
      {oldPrice?.text_content ? (
        <div className={styles.old_price}>{oldPrice?.text_content}</div>
      ) : null}

      <div className={styles.divider} />

      <div className={styles.description}>
        <div
          dangerouslySetInnerHTML={{
            __html: description?.text_content ?? "N/A",
          }}
        />
      </div>

      {isPostpone?.value === YES ? (
        <div className={styles.postponement}>
          <CommonButton
            text={staticTexts.postponement?.toUpperCase() ?? ""}
            isAction
            styleValue={{ width: "100%", fontSize: "12px", fontWeight: 700 }}
          />
        </div>
      ) : null}
      <div className={styles.buy}>
        <ActionButton
          text={staticTexts.buy?.toUpperCase()}
          onClick={() => {}}
          styleValue={{
            width: "100%",
            height: "40px",
            fontSize: "12px",
            fontWeight: 700,
          }}
        />
      </div>
    </div>
  );
};
