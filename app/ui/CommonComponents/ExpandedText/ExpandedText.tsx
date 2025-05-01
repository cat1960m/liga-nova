"use client";

import { StaticTexts } from "@/app/dictionaries/definitions";
import { useState } from "react";
import { CommonButton } from "../_buttons/CommonButton";
import styles from "./expandedText.module.css";

export type Props = {
  descriptions: string[];
  staticTexts: StaticTexts;
  isHTML?: boolean;
  isButton?: boolean;
  minHeight?: number;
  fontSize?: number;
  fontWeight?: number;
};

export const ExpandedText = ({
  descriptions,
  staticTexts,
  isHTML,
  isButton,
  fontSize,
  fontWeight,
}: Props) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const buttonText = isExpanded ? staticTexts.wrap : staticTexts.expand;

  const minHeight = isButton ? 100 : 60;

  return (
    <div className={styles.container}>
      <div
        className={styles.descriptions}
        style={{
          maxHeight: isExpanded ? undefined : `${minHeight}px`,
          overflow: isExpanded ? undefined : "hidden",
        }}
      >
        {descriptions.map((item, index) => {
          return (
            <div key={index}>
              {isHTML ? (
                <div dangerouslySetInnerHTML={{ __html: item }} />
              ) : (
                <p style={{ fontSize, fontWeight }}> {item} </p>
              )}
            </div>
          );
        })}
        {isButton && !isExpanded ? (
          <div className={styles.gradient_background} />
        ) : null}
      </div>

      {isButton ? (
        <div className={styles.button_container}>
          <CommonButton
            text={buttonText}
            isAction
            onClick={handleExpand}
            styleValue={{ minWidth: 250 }}
          />
        </div>
      ) : (
        <button onClick={handleExpand} className={styles.button_text}>
          {buttonText}
        </button>
      )}
    </div>
  );
};
