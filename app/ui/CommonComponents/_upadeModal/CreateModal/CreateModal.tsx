"use client";

import { createPortal } from "react-dom";
import styles from "./createModal.module.css";

export const CreateModal = ({
  onClose,
  children,
}: {
  onClose: () => void;
  children: React.ReactNode;
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
