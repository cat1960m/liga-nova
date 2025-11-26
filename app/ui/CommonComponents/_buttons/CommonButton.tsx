"use client";

import { ACTION_BUTTON_BACKGROUND } from "@/app/lib/constants";
import { usePathname } from "next/navigation";
import { CSSProperties, ReactNode } from "react";
import clsx from "clsx";

export const CommonButton = ({
  text,
  onClick,
  isDisabled,
  children,
  width,
  isAction,
  styleValue,
}: {
  text?: string;
  onClick?: (pathName: string) => void;
  isDisabled?: boolean;
  children?: ReactNode;
  width?: string;
  isAction?: boolean;
  styleValue?: CSSProperties;
}) => {
  const pathName = usePathname();
  const bgColor = isAction
    ? ACTION_BUTTON_BACKGROUND
    : styleValue?.backgroundColor;
  const colorValue = styleValue?.color ?? (isAction ? "white" : "black");

  return (
    <button
      disabled={isDisabled}
      onClick={() => onClick?.(pathName)}
      style={{
        ...styleValue,
        color: isDisabled ? "black" : colorValue,
        backgroundColor: bgColor,
        display: "flex",
        justifyContent: "center",
        width: width ?? styleValue?.width,
        opacity: isDisabled ? 0.3 : 1,
        padding: styleValue?.padding ?? (children ? "10px" : undefined),
        borderRadius: styleValue?.borderRadius ?? 20,
      }}
      className={clsx(
        "flex h-10 items-center rounded-lg bg-blue-100 px-4 text-sm font-medium text-gray-600 transition-colors ",
        { "hover:bg-gray-200": !isDisabled }
      )}
    >
      {children ?? text ?? ""}
    </button>
  );
};
