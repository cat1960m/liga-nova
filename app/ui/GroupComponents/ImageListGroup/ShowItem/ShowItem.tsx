"use client";

import { IMAGE } from "@/app/lib/constants";
import { FullData } from "@/app/lib/definitions";
import Image from "next/image";
import { DragEventHandler } from "react";
import styles from "./showItem.module.css"

export type Props = {
  widthItem?: number;
  imageData: FullData;
};

export const ShowItem = ({ widthItem, imageData }: Props) => {
  const value = imageData?.value;

  const preventDragHandler: DragEventHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div
      style={{
        borderRadius: "10px",
        overflow: "hidden",
        width: "100%",
        position: "relative",
        border: value ? undefined : "1px solid lightgray",
        height: widthItem ? `${widthItem}px` : widthItem,
      }}
    >
      {value ? (
        <Image
          src={value}
          layout="fill" // Fill the container
          fill
          //quality={100} // Optional, for higher quality
          alt="image"
          draggable="false" // This directly disables drag-and-drop
          onDragStart={preventDragHandler} // Ensures additional prevention
          className={styles.image}
        />
      ) : (
        <div style={{ width: "100%", padding: "30px", textAlign: "center" }}>
          {"No Image"}
        </div>
      )}
    </div>
  );
};
