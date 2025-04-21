"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import cl from "clsx";
import styles from "./scrollIcon.module.css";

export type Props = {
  direction: "left" | "right";
  isStaticPosition?: boolean;
  marginTop?: number;
  onScrollItemClick: (direction: "left" | "right") => void;
};

export const ScrollIcon = ({
  direction,
  isStaticPosition,
  marginTop,
  onScrollItemClick,
}: Props) => {
  const onClick = () => {
    onScrollItemClick(direction);
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
      style={{ width: "48px", marginTop: marginTop ?  marginTop + "px" : undefined}}
    >
      {isRight ? (
        <ChevronRightIcon style={{ width: "32px" }} />
      ) : (
        <ChevronLeftIcon style={{ width: "32px" }} />
      )}
    </div>
  );
};
