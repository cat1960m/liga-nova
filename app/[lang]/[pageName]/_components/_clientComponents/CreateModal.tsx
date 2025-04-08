"use client";

import { createPortal } from "react-dom";

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
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            minHeight: rect.height + 1000,
            backgroundColor: "rgba(255, 180, 200, 0.5)",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              border: "2px solid darkmagenta",
              borderRadius: "5px",
              width: "80%",
              position: "absolute",
              top: `${scrollPositionY + 20}px`,
              left: "10%",
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
