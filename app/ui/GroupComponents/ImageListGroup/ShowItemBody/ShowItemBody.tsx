"use client";

import { FullData } from "@/app/lib/definitions";
import Image from "next/image";
import { DragEventHandler } from "react";
import styles from "./showItemBody.module.css";

export type Props = {
  widthItem?: number;
  imageData: FullData;
};

export const ShowItemBody = ({ widthItem, imageData }: Props) => {
  const value = imageData?.value;

  const preventDragHandler: DragEventHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div
      className={styles.container}
      style={{
        border: value ? undefined : "1px solid lightgray",
        height: widthItem ? `${widthItem}px` : widthItem,
      }}
    >
      {value ? (
        <Image
          src={value}
          fill// Fill the container
          alt="image"
          draggable="false" // This directly disables drag-and-drop
          onDragStart={preventDragHandler} // Ensures additional prevention
          className={styles.image}
        />
      ) : (
        <div className={styles.noImage}>{"No Image"}</div>
      )}
    </div>
  );
};
