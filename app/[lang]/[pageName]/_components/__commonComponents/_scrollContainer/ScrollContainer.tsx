"use client";

import { MAX_PAGE_WIDTH } from "@/app/lib/constants";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import styles from "./scrollContainer.module.css";
import { ScrollIcon } from "./ScrollIcon";

const ICON_WIDTH = 48;
const PAGE_PADDING = 30;
const OTHER_PADDINGS = 20; //15;
const BORDERS_WIDTH = 20;

export type Props = {
  ids: string[];
  getItem: (value: { id: string; widthItem?: number }) => React.ReactElement;
  countVisibleItems?: number;
  isEdit: boolean;
  lastAddedId?: number | null;
  isScrollTypeSpec?: boolean;
};

export const ScrollContainer = ({
  ids,
  getItem,
  countVisibleItems,
  isEdit,
  lastAddedId,
  isScrollTypeSpec,
}: Props) => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [count, setCount] = useState(0);
  const [widthItem, setWidthItem] = useState(0);

  const start = useRef<number | null>(null);

  const getData = () => {
    const w =
      //document.documentElement.clientWidth;
      window.innerWidth;
    const bordersWidth = isEdit ? BORDERS_WIDTH : 0;
    console.log("bordersWidth", bordersWidth);

    let countVisible = countVisibleItems;

    if (!countVisible) {
      countVisible = 1;

      if (ids.length > 1 && w > 500) {
        countVisible = w >= MAX_PAGE_WIDTH && ids.length > 2 ? 3 : 2;
      }
    }

    const widthOtherOneSideWithoutIcon =
      PAGE_PADDING + OTHER_PADDINGS + bordersWidth;

    let widthItem = w - widthOtherOneSideWithoutIcon * 2;

    if (countVisible > 1) {
      const ww = w > MAX_PAGE_WIDTH ? MAX_PAGE_WIDTH : w;

      widthItem =
        (ww - (widthOtherOneSideWithoutIcon + ICON_WIDTH) * 2) / countVisible;
    }

    return [countVisible, widthItem];
  };

  const changeData = () => {
    const [countVisible, widthItem] = getData();
    setCount(countVisible);
    setScrollPosition(0);
    setWidthItem(widthItem);
    console.log("-----widthItem", widthItem);
  };

  useEffect(() => {
    const handleResize = () => changeData();

    changeData();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!lastAddedId) {
      return;
    }

    const index = ids.findIndex((id) => id === lastAddedId?.toString());

    setScrollPosition(checkPosition(-index * widthItem));
  }, [lastAddedId, ids]);

  if (!ids.length || !count || !widthItem) {
    return null;
  }

  const idsVisible: string[] = [...ids, ...ids, ...ids];

  const isIconsVisible = ids.length > count && !isScrollTypeSpec;

  const checkPosition = (newScrollPosition: number) => {
    if (newScrollPosition < 0) {
      return newScrollPosition + ids.length * widthItem;
    }

    if (newScrollPosition >= ids.length * widthItem) {
      return newScrollPosition - ids.length * widthItem;
    }

    return newScrollPosition;
  };

  const onScrollItemClick = (direction: "left" | "right") => {
    const value = direction === "left" ? -widthItem : widthItem;
    let newScrollPosition = scrollPosition + value;
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

  console.log("isIconsVisible", isIconsVisible, ids.length, count);

  return (
    <div className={styles.container}>
      {isIconsVisible ? (
        <ScrollIcon
          direction={"left"}
          widthItem={widthItem}
          countVisibleItems={countVisibleItems}
          onScrollItemClick={onScrollItemClick}
        />
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
            className={styles.items}
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
                {getItem({ id, widthItem })}
              </div>
            ))}
            {isScrollTypeSpec ? (
              <div
                style={{
                  position: "absolute",
                  bottom: "10px",
                  height: "10px",
                  left: 0,
                  right: 0,
                }}
              >
                {" "}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {isIconsVisible ? (
        <ScrollIcon
          direction={"right"}
          widthItem={widthItem}
          countVisibleItems={countVisibleItems}
          onScrollItemClick={onScrollItemClick}
        />
      ) : null}
    </div>
  );
};
