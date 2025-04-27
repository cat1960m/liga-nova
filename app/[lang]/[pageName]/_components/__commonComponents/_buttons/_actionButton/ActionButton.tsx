"use client";

import { CSSProperties } from "react";
import styles from "./actionButton.module.css";

export const ActionButton = ({
  text,
  onClick,
  styleValue,
}: {
  text?: string;
  onClick: () => void;
  styleValue?: CSSProperties;
}) => {
  return (
    <button onClick={onClick} className={styles.button} style={styleValue}>
      {text}
    </button>
  );
};
