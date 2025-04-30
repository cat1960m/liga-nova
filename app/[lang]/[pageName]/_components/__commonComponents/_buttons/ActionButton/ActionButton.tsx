"use client";

import { CSSProperties } from "react";
import styles from "./actionButton.module.css";

export const ActionButton = ({
  text,
  onClick,
  styleValue,
  children,
}: {
  text?: string;
  onClick: () => void;
  styleValue?: CSSProperties;
  children?: React.ReactNode;
}) => {
  return (
    <button onClick={onClick} className={styles.button} style={styleValue}>
      {children ?? <div>{text}</div>}
    </button>
  );
};
