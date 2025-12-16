import { StaticTexts } from "@/app/dictionaries/definitions";
import { CommonButton } from "../_buttons/CommonButton";
import styles from "./editTitleCancel.module.css";

export type Props = {
  title: string;
  onCancel?: () => void;
  staticTexts?: StaticTexts;
  onSave?: () => void;
  isSaveDisabled?: boolean;
};

export const EditTitleCancel = ({
  title,
  onCancel,
  staticTexts,
  onSave,
  isSaveDisabled,
}: Props) => {
  return (
    <div className={styles.header}>
      <div className={styles.title}>{title}</div>
      {onCancel && staticTexts ? (
        <CommonButton text={staticTexts.close} onClick={onCancel} />
      ) : null}
      {onSave && staticTexts ? (
        <CommonButton
          text={staticTexts.save}
          onClick={onSave}
          isDisabled={isSaveDisabled}
        />
      ) : null}
    </div>
  );
};
