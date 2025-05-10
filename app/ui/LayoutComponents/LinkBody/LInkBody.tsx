"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import clsx from "clsx";
import styles from "./linkBody.module.css";

export const LinkBody = ({
  pageName,
  pageTitle,
  isMain,
  lang,
  onClick,
}: {
  pageName: string;
  pageTitle: string;
  isMain?: boolean;
  lang: string;
  onClick?: () => void;
}) => {
  const params = useParams();

  return (
    <Link
      href={`/${lang}/${pageName}`}
      onClick={() => {
        onClick?.();
      }}
    >
      <div
        className={clsx(styles.linkBody, {
          [styles.main]: isMain,
          [styles.active]: pageName === params.pageName,
        })}
      >
        {isMain ? pageTitle : pageTitle.toUpperCase()}
      </div>
    </Link>
  );
};
