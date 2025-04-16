"use client";

import styles from "./actionButton.module.css";

export const ActionButton = ({
  text,
  onClick,
}: {
  text?: string;
  onClick: () => void;
}) => {
  return (
    <button onClick={onClick} className={styles.button}>
      {text}{" "}
    </button>
  );
};
