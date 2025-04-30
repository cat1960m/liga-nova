import styles from "./addEditCalendarEvents.module.css";

export type Props = {
  label: string;
  value: number;
  setValue: (value: number) => void;
};

export const NumberValue = ({ label, value, setValue }: Props) => {
  return (
    <div className={styles.numberValue}>
      {`${label}:`}
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value) ?? 0)}
        style={{ width: "70px" }}
      />
    </div>
  );
};
