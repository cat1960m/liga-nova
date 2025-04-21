"use client";

import { ACTION_BUTTON_BACKGROUND } from "@/app/lib/constants";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export const CommonButton = ({
  text,
  onClick,
  isDisabled,
  backgroundColor,
  children,
  width,
  isAction,
  minWidth,
}: {
  text?: string;
  onClick?: (pathName: string) => void;
  isDisabled?: boolean;
  backgroundColor?: string;
  children?: ReactNode;
  width?: string;
  isAction?: boolean;
  minWidth?: number;
}) => {
  const pathName = usePathname();
  const bgColor = isAction ? ACTION_BUTTON_BACKGROUND : backgroundColor;
  const color = isAction ? "white" : "black";

  return (
    <button
      disabled={isDisabled}
      onClick={() => onClick?.(pathName)}
      style={{
        color: isDisabled ? "lightgray" : color,
        backgroundColor: bgColor,
        display: "flex",
        justifyContent: "center",
        width,
        opacity: isDisabled ? 0.5 : 1,
        minWidth,
        padding: children ? "10px" : undefined,
      }}
      className="flex h-10 items-center rounded-lg bg-blue-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
    >
      {children ?? text ?? ""}
    </button>
  );
};
