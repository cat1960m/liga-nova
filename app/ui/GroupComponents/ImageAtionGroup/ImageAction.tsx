
import styles from "./imageActions.module.css";
import Image from "next/image";

export type Props = {
  value: string;
  text: string;
  tooltipText: string;
  isModalShown: boolean;
};

export const ImageAction = ({ value, text, tooltipText, isModalShown }: Props) => {
  return (
    <div className={styles.item}>
      {value ? (
        <Image
          src={value}
          alt=""
          width={800}
          height={600}
          style={{ width: "100%", height: "auto" }}
        />
      ) : (
        <div className={styles.noImage}>No image </div>
      )}
      {isModalShown ? null : (
        <div className={styles.text}>{text}</div>
      )}
      <div
        className={styles.tooltip}
        dangerouslySetInnerHTML={{
          __html: tooltipText,
        }}
      />
    </div>
  );
};
