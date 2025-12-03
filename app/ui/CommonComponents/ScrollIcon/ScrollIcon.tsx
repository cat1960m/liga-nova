"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import cl from "clsx";
import styles from "./scrollIcon.module.css";
import { ICON_BUTTON_WIDTH, ICON_IN_BUTTON_WIDTH } from "@/app/lib/constants";

export type Props = {
  direction: "left" | "right";
  isStaticPosition?: boolean;
  marginTop?: number;
  onScrollItemClick?: (direction: "left" | "right") => void;
  color?: string;
};

export const ScrollIcon = ({
  direction,
  isStaticPosition,
  marginTop,
  onScrollItemClick,
  color = "black",
}: Props) => {
  const onClick = () => {
    onScrollItemClick?.(direction);
  };
  const isRight = direction === "right";

  const currentClassName = isRight
    ? cl(styles.icon, styles.right, {
        [styles.oneItemRight]: !isStaticPosition,
      })
    : cl(styles.icon, styles.left, {
        [styles.oneItemLeft]: !isStaticPosition,
      });

  return (
    <div
      onClick={onClick}
      className={currentClassName}
      style={{
        width: ICON_BUTTON_WIDTH,
        marginTop: marginTop ? marginTop + "px" : undefined,
      }}
    >
      {isRight ? (
        <ChevronRightIcon style={{ width: ICON_IN_BUTTON_WIDTH, color }} />
      ) : (
        <ChevronLeftIcon style={{ width: ICON_IN_BUTTON_WIDTH, color }} />
      )}
    </div>
  );
};
