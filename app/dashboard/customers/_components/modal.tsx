import { createPortal } from "react-dom";
import Font from "next/font";
import { Inter } from "next/font/google";

export const ModalEditName = ({ name }: { name: string }) => {
  const parent = document.getElementById("parentModal");
  if (!parent) {
    return null;
  }

  return (
    <div>
      {createPortal(
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 180, 200, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              border: "2px solid darkmagenta",
              borderRadius: "5px",
              width: "80%",
            }}
          >
            <div
              style={{
                height: "40px",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 500,
                fontSize: "large",
              }}
            >
              Change Name
            </div>
            {name}
            {"hhhh"}
          </div>
        </div>,
        parent
      )}
    </div>
  );
};
