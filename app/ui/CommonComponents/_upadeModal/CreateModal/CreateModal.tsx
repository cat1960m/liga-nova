"use client";

import { createPortal } from "react-dom";
import styles from "./createModal.module.css";
import { useEditContext } from "@/app/ui/PageComponents/EditContextProvider";
import { useEffect } from "react";

export const CreateModal = ({
  onClose,
  children,
  width,
}: {
  onClose: () => void;
  children: React.ReactNode;
  width?: string;
}) => {
    const { changeIsUndoDisabled } = useEditContext();
  
    useEffect(() => {
      changeIsUndoDisabled(true);
      return () => changeIsUndoDisabled(false);
    }, [changeIsUndoDisabled]);
  
  
  const parent = document.getElementById("parentModal");
  if (!parent) {
    onClose();
    return null;
  }

  const rect = parent.getBoundingClientRect();

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
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0, 
              bottom: 0,
              display: "flex",
              backgroundColor: "transparent",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <div
              className={styles.body}
              style={{
                overflow: "auto",
                width,
                maxHeight: window.innerHeight - 40,
                maxWidth: 1070,
                minHeight: 100
              }}
            >
                {children}
            </div>
          </div>
        </div>,
        parent
      )}
    </div>
  );
};
