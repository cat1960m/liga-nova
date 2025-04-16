"use client";

import { FullData } from "@/app/lib/definitions";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { MAX_PAGE_WIDTH } from "@/app/lib/constants";
import { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import styles from "./scrollContainer.module.css";
import cl from "clsx";

export type Props = {
  ids: string[];
  getItem: (id: string) => React.ReactElement;
};

export const ScrollContainer1 = ({ ids, getItem }: Props) => {
  const [startPosition, setStartPosition] = useState<number>(0);

  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!ids.length || !windowWidth) {
    return null;
  }

  let countVisible = 1;

  if (ids.length > 1 && windowWidth > 500) {
    countVisible = windowWidth >= MAX_PAGE_WIDTH && ids.length > 2 ? 3 : 2;
  }

  const idsVisible: string[] = [];

  for (let i = 0; i < countVisible; i++) {
    const index =
      i + startPosition < ids.length
        ? i + startPosition
        : (i + startPosition) % ids.length;
    idsVisible.push(ids[index]);
  }

  const isIconsVisible = ids.length > countVisible;

  const onLeftClick = () => {
    const newStartPosition =
      startPosition - 1 >= 0 ? startPosition - 1 : ids.length - 1;
    setStartPosition(newStartPosition);
  };

  const onRightClick = () => {
    const newStartPosition =
      startPosition + 1 < ids.length ? startPosition + 1 : 0;
    setStartPosition(newStartPosition);
  };

  const widthItem = 100 / countVisible;

  return (
    <div
      style={{
        width: "100%",
        padding: "10px",
        display: "flex",
        gap: "5px",
        alignItems: "center",
        position: "relative",
      }}
    >
      {isIconsVisible ? (
        <div onClick={onLeftClick} className={cl(styles.icon, styles.left)}>
          <ChevronLeftIcon style={{ width: "32px" }} />
        </div>
      ) : null}

      <div
        style={{
          width: "100%",
          padding: "10px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {idsVisible.map((id) => (
          <div
            style={{ width: `${widthItem}%` }}
            key={id}
            onTouchStartCapture={() => console.log("touch start")}
            onTouchEndCapture={() => console.log("touch end")}
          >
            {getItem(id)}
          </div>
        ))}
      </div>
      {isIconsVisible ? (
        <div onClick={onRightClick} className={cl(styles.icon, styles.right)}>
          <ChevronRightIcon style={{ width: "32px" }} />
        </div>
      ) : null}
    </div>
  );
};
