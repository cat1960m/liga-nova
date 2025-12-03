"use client";

import { PreviewParams } from "@/app/lib/definitions";
import Image from "next/image";
import { ShowTitle } from "../ShowTitle/ShowTitle";
import { ScrollIcon } from "@/app/ui/CommonComponents/ScrollIcon/ScrollIcon";
import { CommonButton } from "@/app/ui/CommonComponents/_buttons/CommonButton";
import { ShowDescription } from "../ShowDescription/ShowDescription";
import styles from "./showItem.module.css";
import cn from "clsx";


export const Preview = ({price, value, staticTexts, baseParams}: PreviewParams) => {
    const color = price === 1 ? "white" : "black";
    const ids = (baseParams?.["ids"] ?? "").split(",").map(item => parseInt(item));
    const id = parseInt( baseParams?.["id"] ?? "");
    const isEdit = false;

    return (
      <div className={styles.main}>
        <div className={styles.container}>
          {value ? (
            <Image
              src={value}
              fill
              quality={100} // Optional, for higher quality
              alt="image"
              className={styles.image}
              draggable="false" // This directly disables drag-and-drop
            />
          ) : null}
          {/* changes for mobile needed */}
          <div
            className={styles.infoContainer}
            style={{ padding: isEdit ? "20px" : undefined }}
          >
            <div className={styles.title_container}>
              <ShowTitle title={baseParams?.share ?? ""} color={color} />
              <ShowTitle title={baseParams?.ticket ?? ""} color={color} />
            </div>

            <ShowDescription description={baseParams?.description ?? ""} color={color} />

            <div className={styles.buttons}>
              <CommonButton
                text={staticTexts?.details ?? "N/A"}
                isAction
                styleValue={{ minWidth: "200px", color }}
              />
              <CommonButton
                text={staticTexts?.freeTraining ?? "N/A"}
                styleValue={{
                  border: `2px solid ${color}`,
                  backgroundColor: "transparent",
                  color: color,
                }}
              />
            </div>

            <div className={styles.groupButtons}>
              <ScrollIcon direction="left" isStaticPosition color={color} />
              {ids.map((currentId) => {
                return (
                  <div
                    className={cn(styles.ring, {
                      [styles.selected]: currentId === id,
                    })}
                    key={currentId}
                    style={{ borderColor: color }}
                  />
                );
              })}
              <ScrollIcon direction="right" isStaticPosition color={color} />
            </div>
          </div>
        </div>
      </div>
    );
  };
 
