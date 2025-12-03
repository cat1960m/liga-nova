"use client";

import Image from "next/image";

import styles from "./imageLinks.module.css";
import Link from "next/link";
import { StaticTexts } from "@/app/dictionaries/definitions";

export type Props = {
  value?: string;
  text?: string;
  isModalShown: boolean;
  staticTexts: StaticTexts;
  tooltip: string;
  link?: string;
};
// main page
export const ImageLink = ({
  value,
  text,
  isModalShown,
  staticTexts,
  tooltip, 
  link
}: Props) => {
  return (
    <div className={styles.item}>
      {value ? (
        <Image
          src={value}
          alt=""
          fill
          quality={100} // Optional, for higher quality
          priority={false}
          className={styles.image}
        />
      ) : null}
      {isModalShown ? null : (
        <div className={styles.text}>{text ?? ""}</div>
      )}
      <div className={styles.tooltip}>
        <div className={styles.text_tooltip}>
        <div 
          dangerouslySetInnerHTML={{
            __html: tooltip,
          }}
        />
        </div>
        {link ? (
          <Link href={link} className={styles.link}>
            {`${staticTexts.details} >`}
          </Link>
        ) : null}
      </div>
    </div>
  );
};
