"use client";

import { MAX_PAGE_WIDTH } from "@/app/lib/constants";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import styles from "./scrollContainer.module.css";
import cl from "clsx";

export type Props = {
  ids: string[];
  getItem: (id: string) => React.ReactElement;
};

export const ScrollContainer = ({ ids, getItem }: Props) => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [count, setCount] = useState(0);
  const [widthItem, setWidthItem] = useState(0);

  const start = useRef<number | null>(null);

  const getData = () => {
    let countVisible = 1;
    const w =
      //document.documentElement.clientWidth;
      window.innerWidth;

    if (ids.length > 1 && w > 500) {
      countVisible = w >= MAX_PAGE_WIDTH && ids.length > 2 ? 3 : 2;
    }

    let widthItem = w - 60 - 15;

    if (countVisible > 1) {
      const ww = w > MAX_PAGE_WIDTH ? MAX_PAGE_WIDTH : w;

      widthItem = (ww - (30 + 48) * 2 - 15) / countVisible;
    }

    return [countVisible, widthItem];
  };

  const changeData = () => {
    const [countVisible, widthItem] = getData();
    setCount(countVisible);
    setScrollPosition(0);
    setWidthItem(widthItem);
  };

  useEffect(() => {
    const handleResize = () => changeData();

    changeData();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!ids.length || !count || !widthItem) {
    return null;
  }

  const idsVisible: string[] = [...ids, ...ids, ...ids];

  const isIconsVisible = ids.length > count;

  const checkPosition = (newScrollPosition: number) => {
    if (newScrollPosition < 0) {
      return newScrollPosition + ids.length * widthItem;
    }

    if (newScrollPosition >= ids.length * widthItem) {
      return newScrollPosition - ids.length * widthItem;
    }

    return newScrollPosition;
  };

  const onLeftClick = () => {
    let newScrollPosition = scrollPosition - widthItem;
    setScrollPosition(checkPosition(newScrollPosition));
  };

  const onRightClick = () => {
    let newScrollPosition = scrollPosition + widthItem;
    setScrollPosition(checkPosition(newScrollPosition));
  };

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    if (start.current) {
      let newScrollPosition = e.screenX - start.current + scrollPosition;

      setScrollPosition(checkPosition(newScrollPosition));
      start.current = e.screenX;
    }
  };

  const handleMouseUp: MouseEventHandler<HTMLDivElement> = (e) => {
    start.current = null;
    const n = Math.round(scrollPosition / widthItem);
    let newScrollPosition = n * widthItem;
    setScrollPosition(checkPosition(newScrollPosition));
  };

  return (
    <div
      style={{
        width: "100%",
        padding: "10px",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
      }}
    >
      {isIconsVisible ? (
        <div
          onClick={onLeftClick}
          className={cl(styles.icon, styles.left)}
          style={{ width: "48px", marginTop: widthItem / 2 }}
        >
          <ChevronLeftIcon style={{ width: "32px" }} />
        </div>
      ) : null}

      <div
        style={{
          width: `${widthItem * count}px`,
          overflowX: "hidden",
          display: "flex",
        }}
      >
        <div
          style={{
            position: "relative",
            left: -widthItem * ids.length + scrollPosition,
            width: widthItem * ids.length * 3,
            height: "auto",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
            }}
            onMouseDown={(e) => (start.current = e.screenX)}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {idsVisible.map((id, index) => (
              <div
                style={{
                  width: `${widthItem}px`,
                }}
                key={id + "_" + index}
              >
                {getItem(id)}
              </div>
            ))}
          </div>
        </div>
      </div>
      {isIconsVisible ? (
        <div
          onClick={onRightClick}
          className={cl(styles.icon, styles.right)}
          style={{ width: "48px", marginTop: widthItem / 2 }}
        >
          <ChevronRightIcon style={{ width: "32px" }} />
        </div>
      ) : null}
    </div>
  );
};
