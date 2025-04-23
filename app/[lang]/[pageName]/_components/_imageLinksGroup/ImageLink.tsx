import { FullData } from "@/app/lib/definitions";
import Image from "next/image";

import styles from "./imageLinks.module.css";
import { TOOLTIP } from "@/app/lib/constants";
import Link from "next/link";
import { StaticTexts } from "@/app/dictionaries/definitions";

export type Props = {
  data: FullData;
  groupData: FullData[];
  isModalShown: boolean;
  staticTexts: StaticTexts;
};

export const ImageLink = ({
  data,
  groupData,
  isModalShown,
  staticTexts,
}: Props) => {
  const tooltip = groupData.find(
    (item) =>
      item.text_description_id === data.text_description_id &&
      item.content_type === TOOLTIP
  );

  const link = data.link;
  return (
    <div className={styles.item}>
      {data.value ? (
        <Image
          src={data.value}
          alt=""
          layout="fill" // Fill the container
          objectFit="cover" // Make sure it covers the entire container
          quality={100} // Optional, for higher quality
          priority={false}
        />
      ) : null}
      {isModalShown ? null : (
        <div className={styles.text}>{data.text_content ?? ""}</div>
      )}
      <div className={styles.tooltip}>
        <div
          dangerouslySetInnerHTML={{
            __html: tooltip?.text_content ?? "",
          }}
        />
        {link ? (
          <Link href={link} className={styles.link}>
            {`${staticTexts.details} >`}
          </Link>
        ) : null}
      </div>
    </div>
  );
};
