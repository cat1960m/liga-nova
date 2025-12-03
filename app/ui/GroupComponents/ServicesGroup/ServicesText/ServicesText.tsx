"use client";

import { StaticTexts } from "@/app/dictionaries/definitions";
import styles from "./servicesText.module.css";

export type Props = {
  text: string;
  title: string;
  price: string;
  staticTexts: StaticTexts;
};

export const ServicesText = ({ text, title, price, staticTexts }: Props) => {
  return (
    <div className={styles.container}>
      <div title={title} className={styles.title}>
        {text}
        {title ? <div className={styles.ring}>i</div> : null}
      </div>
      {price ? (
        <div className={styles.price}>{price}</div>
      ) : (
        <div className={styles.no_price}
        >
          {staticTexts.byAgreement}{" "}
        </div>
      )}
    </div>
  );
};
