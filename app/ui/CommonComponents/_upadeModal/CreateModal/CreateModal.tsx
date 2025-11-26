"use client";

import { createPortal } from "react-dom";
import styles from "./createModal.module.css";

export const CreateModal = ({
  onClose,
  children,
  left,
  width
}: {
  onClose: () => void;
  children: React.ReactNode;
  left?: string;
  width?: string;
}) => {
  const parent = document.getElementById("parentModal");
  if (!parent) {
    onClose();
    return null;
  }

  const rect = parent.getBoundingClientRect();
  const scrollPositionY = window.scrollY;

  return (
    <div>
      {createPortal(
        <div
          className={styles.container}
          style={{
            minHeight: rect.height + 1000,
          }}
        >
          <div
            className={styles.body}
            style={{
              top: `${scrollPositionY + 20}px`,
              left,
              width,
            }}
          >
            {children}
          </div>
        </div>,
        parent
      )}
    </div>
  );
};
