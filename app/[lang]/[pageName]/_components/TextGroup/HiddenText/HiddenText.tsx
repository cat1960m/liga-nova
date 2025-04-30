"use client";

import { StaticTexts } from "@/app/dictionaries/definitions";
import { useState } from "react";

import styles from "./hiddenText.module.css"

export type Props = {
  staticTexts: StaticTexts;
  descriptions: string[];
};

export const HiddenText = ({ staticTexts, descriptions }: Props) => {
  const [isHidden, setIsHidden] = useState(true);
  return (
    <div>
      {isHidden ? (
        <div className={styles.text} onClick={() => setIsHidden(false)}>
          {staticTexts.readMore}
        </div>
      ) : (
        <div>
          {descriptions.map((description, index) => {
            return (
              <div
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
                key={index}
              />
            );
          })}

          <div className={styles.text} onClick={() => setIsHidden(true)}>
            {staticTexts.readLess}
          </div>
        </div>
      )}
    </div>
  );
};
