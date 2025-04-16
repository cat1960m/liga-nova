import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import cl from "clsx";
import styles from "./scrollContainer.module.css";

export type Props = {
  direction: "left" | "right";
  widthItem: number;
  countVisibleItems?: number;
  onScrollItemClick: (direction: "left" | "right") => void;
};

export const ScrollIcon = ({
  direction,
  widthItem,
  countVisibleItems,
  onScrollItemClick,
}: Props) => {
  const onClick = () => {
    onScrollItemClick(direction);
  };
  const isRight = direction === "right";

  const currentClassName = isRight
    ? cl(styles.icon, styles.right, {
        [styles.oneItemRight]: !!countVisibleItems,
      })
    : cl(styles.icon, styles.left, {
        [styles.oneItemLeft]: !!countVisibleItems,
      });

  return (
    <div
      onClick={onClick}
      className={currentClassName}
      style={{ width: "48px", marginTop: widthItem / 2 }}
    >
      {isRight ? (
        <ChevronRightIcon style={{ width: "32px" }} />
      ) : (
        <ChevronLeftIcon style={{ width: "32px" }} />
      )}
    </div>
  );
};
