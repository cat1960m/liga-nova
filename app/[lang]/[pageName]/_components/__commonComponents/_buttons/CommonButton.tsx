"use client";

import { ACTION_BUTTON_BACKGROUND } from "@/app/lib/constants";
import { usePathname } from "next/navigation";
import { CSSProperties, ReactNode } from "react";

export const CommonButton = ({
  text,
  onClick,
  isDisabled,
  backgroundColor,
  children,
  width,
  isAction,
  minWidth,
  color,
  styleValue,
}: {
  text?: string;
  onClick?: (pathName: string) => void;
  isDisabled?: boolean;
  backgroundColor?: string;
  children?: ReactNode;
  width?: string;
  isAction?: boolean;
  minWidth?: number;
  color?: string;
  styleValue?: CSSProperties;
}) => {
  const pathName = usePathname();
  const bgColor = isAction
    ? ACTION_BUTTON_BACKGROUND
    : backgroundColor ?? styleValue?.backgroundColor;
  const colorValue =
    color ?? styleValue?.color ?? (isAction ? "white" : "black");

  return (
    <button
      disabled={isDisabled}
      onClick={() => onClick?.(pathName)}
      style={{
        ...styleValue,
        color: isDisabled ? "lightgray" : colorValue ?? colorValue,
        backgroundColor: bgColor,
        display: "flex",
        justifyContent: "center",
        width: width ?? styleValue?.width,
        opacity: isDisabled ? 0.5 : 1,
        minWidth: minWidth ?? styleValue?.minWidth,
        padding: children ? "10px" : undefined,
        borderRadius: styleValue?.borderRadius ?? 20,
      }}
      className="flex h-10 items-center rounded-lg bg-blue-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
    >
      {children ?? text ?? ""}
    </button>
  );
};
