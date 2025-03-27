"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";

export const CommonButton = ({
  text,
  onClick,
  isDisabled,
  backgroundColor,
  children,
  width,
}: {
  text?: string;
  onClick?: (pathName: string) => void;
  isDisabled?: boolean;
  backgroundColor?: string;
  children?: ReactNode;
  width?: string;
}) => {
  const pathName = usePathname();

  return (
    <button
      disabled={isDisabled}
      onClick={() => onClick?.(pathName)}
      style={{
        color: isDisabled ? "lightgray" : "black",
        backgroundColor,
        display: "flex",
        justifyContent: "center",
        width,
      }}
      className="flex h-10 items-center rounded-lg bg-blue-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
    >
      {children ?? text ?? ""}
    </button>
  );
};
