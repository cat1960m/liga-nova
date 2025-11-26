import { StaticTexts } from "@/app/dictionaries/definitions";
import { CommonButton } from "../_buttons/CommonButton";
import styles from "./editTitleCancel.module.css"

export type Props = {
  title: string;
  onCancel?: () => void;
  staticTexts?: StaticTexts;
};

export const EditTitleCancel = ({ title, onCancel, staticTexts }: Props) => {
  return (
    <div className={styles.header}>
      <div className={styles.title}>{title}</div>
      {onCancel && staticTexts? <CommonButton text={staticTexts.close} onClick={onCancel} /> : null}
    </div>
  );
};
