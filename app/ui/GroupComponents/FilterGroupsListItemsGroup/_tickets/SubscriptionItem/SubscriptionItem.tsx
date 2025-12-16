import { CommonButton } from "@/app/ui/CommonComponents/_buttons/CommonButton";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { ActionButton } from "@/app/ui/CommonComponents/_buttons/ActionButton/ActionButton";

import styles from "./subscriptionItem.module.css";

export type Props = {
  staticTexts: StaticTexts;
  share?: string;
  name?: string;
  price?: string;
  oldPrice?: string;
  description?: string;
  isPostpone?: boolean;
};

export const SubscriptionItem = ({
  share,
  name,
  price,
  oldPrice,
  description,
  staticTexts,
  isPostpone,
}: Props) => {
  const priceValue = parseInt(price ?? "");
  const priceStr = Number.isNaN(priceValue)
    ? price ?? ""
    : price ? price.replace(priceValue.toString(), "") : "";

  return (
    <div className={styles.container}>
      {share ? <div className={styles.share}>{share}</div> : null}

      <div className={styles.name}>{name ?? "N/A"}</div>

      <div className={styles.price}>
        {Number.isNaN(priceValue) ? "" : priceValue}
      </div>
      <div className={styles.price_text}>{priceStr}</div>
      {oldPrice ? <div className={styles.old_price}>{oldPrice}</div> : null}

      <div className={styles.divider} />

      <div className={styles.description}>
        <div
          dangerouslySetInnerHTML={{
            __html: description ?? "N/A",
          }}
        />
      </div>

      {isPostpone ? (
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
