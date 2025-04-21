"use client";

import { MAX_PAGE_WIDTH } from "@/app/lib/constants";
import {
  MouseEventHandler,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./scrollContainer.module.css";
import { ScrollIcon } from "../_scrollIcon/ScrollIcon";

const ICON_WIDTH = 48;
const MAX_COUNT_VISIBLE = 3;

type DataType = {
  isScrollIconsNeeded: boolean;
  isScrollOnSide: boolean;
  countItemsShown: number;
  itemWidth: number;
};

export type Props = {
  ids: string[];
  getItem: (value: {
    id: string;
    widthItem?: number;
    index: number;
    scrollPosition: number;
    countItemsShown: number;
    f: (value: "left" | "right") => void;
    indexSelected: (index: number) => void;
  }) => React.ReactElement;
  countVisibleItems?: number;
  lastAddedId?: number | null;
  isNoScrollItems?: boolean;
  refParent: RefObject<HTMLDivElement | null>;
  minItemWidth?: number;
  maxItemWidth?: number;
};

export const ScrollContainer = ({
  ids,
  getItem,
  countVisibleItems,
  lastAddedId,
  isNoScrollItems,
  refParent,
  minItemWidth = 300,
  maxItemWidth,
}: Props) => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const start = useRef<number | null>(null);
  const [dataType, setDataType] = useState<DataType | null>(null);

  const getData = () => {
    if (!refParent?.current) {
      return;
    }
    const dataType: DataType = {
      isScrollIconsNeeded: false,
      isScrollOnSide: false,
      countItemsShown: 0,
      itemWidth: 0,
    };
    const parentWidth = refParent.current.getBoundingClientRect().width;

    const useScrollIconOnSide = isNoScrollItems
      ? false
      : parentWidth > MAX_PAGE_WIDTH / 2 + ICON_WIDTH * 2;

    const scrollIconWidths = useScrollIconOnSide ? 2 * ICON_WIDTH : 0;

    const maxCount =
      countVisibleItems ??
      Math.min(
        Math.floor((parentWidth - scrollIconWidths) / minItemWidth),
        MAX_COUNT_VISIBLE
      );

    if (ids.length <= maxCount) {
      const count = ids.length;
      dataType.countItemsShown = count;
      dataType.isScrollIconsNeeded = false;
      dataType.isScrollOnSide = false;
      dataType.itemWidth = maxItemWidth
        ? Math.min(parentWidth / count, maxItemWidth)
        : parentWidth / count;
    } else {
      const count = maxCount;
      dataType.countItemsShown = count;
      dataType.isScrollIconsNeeded = !isNoScrollItems;
      dataType.isScrollOnSide = useScrollIconOnSide;
      dataType.itemWidth = (parentWidth - scrollIconWidths) / count - 1;
    }
    console.log("-----dataType", dataType, "length=", ids.length);

    return dataType;
  };

  const changeData = () => {
    const newDataType = getData();

    if (!newDataType) {
      return;
    }

    setDataType(newDataType);

    if (lastAddedId) {
      const index = ids.findIndex((id) => id === lastAddedId?.toString());

      setScrollPosition(
        checkPosition(-index * newDataType.itemWidth, newDataType)
      );
    } else {
      setScrollPosition(0);
    }
  };

  useEffect(() => {
    const handleResize = () => changeData();

    changeData();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [ids]);

  const checkPosition = (
    newScrollPosition: number,
    data: DataType | null = dataType
  ) => {
    if (!data) {
      return scrollPosition;
    }
    const totalWidth = ids.length * data.itemWidth;
    if (newScrollPosition < 0) {
      return newScrollPosition + totalWidth;
    }

    if (newScrollPosition >= totalWidth) {
      return newScrollPosition - totalWidth;
    }

    return newScrollPosition;
  };

  if (!ids.length || !dataType) {
    return null;
  }

  const idsVisible: string[] = [...ids, ...ids, ...ids];

  const onScrollItemClick = (direction: "left" | "right") => {
    const value =
      direction === "left" ? -dataType.itemWidth : dataType.itemWidth;
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
    const n = Math.round(scrollPosition / dataType.itemWidth);
    let newScrollPosition = n * dataType.itemWidth;
    setScrollPosition(checkPosition(newScrollPosition));
  };

  const indexSelected = (index: number) => {
    setScrollPosition(checkPosition(-index * dataType.itemWidth));
  };

  return (
    <div className={styles.container}>
      {dataType.isScrollIconsNeeded ? (
        <ScrollIcon
          direction={"left"}
          isStaticPosition={dataType.isScrollOnSide}
          onScrollItemClick={onScrollItemClick}
          marginTop={dataType.itemWidth / 2}
        />
      ) : null}

      <div
        style={{
          width: `${dataType.itemWidth * dataType.countItemsShown}px`,
          overflowX: "hidden",
          display: "flex",
        }}
      >
        <div
          style={{
            position: "relative",
            left: -dataType.itemWidth * ids.length + scrollPosition,
            width: dataType.itemWidth * ids.length * 3,
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
                  width: `${dataType.itemWidth}px`,
                }}
                key={id + "_" + index}
              >
                {getItem({
                  id,
                  widthItem: dataType.itemWidth,
                  index,
                  indexSelected,
                  f: onScrollItemClick,
                  scrollPosition,
                  countItemsShown: dataType.countItemsShown,
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {dataType.isScrollIconsNeeded ? (
        <ScrollIcon
          direction={"right"}
          marginTop={dataType.itemWidth / 2}
          isStaticPosition={dataType.isScrollOnSide}
          onScrollItemClick={onScrollItemClick}
        />
      ) : null}
    </div>
  );
};
