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
    <div
      style={{
        flexGrow: 2,
        display: "flex",
        flexDirection: "column",
        minHeight: "100px",
        fontSize: 14,
        padding: "10px 0",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          maxHeight: isExpanded ? undefined : `${minHeight}px`,
          overflow: isExpanded ? undefined : "hidden",
          display: "flex",
          flexDirection: "column",
          position: "relative",
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
        <div
          style={{
            marginTop: "40px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CommonButton
            text={buttonText}
            isAction
            onClick={handleExpand}
            styleValue={{ minWidth: 250 }}
          />
        </div>
      ) : (
        <button
          onClick={handleExpand}
          style={{ color: "darkblue", fontWeight: 700, marginTop: "10px" }}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};
