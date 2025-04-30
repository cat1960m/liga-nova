import styles from "./eventDates.module.css";

export type Props = {
  label: string;
  value: number;
  setValue: (value: number) => void;
  start: number;
  count: number;
};

export const SelectNumberValue = ({
  label,
  value,
  setValue,
  start,
  count,
}: Props) => {
  return (
    <div className={styles.select_number_value}>
      {`${label}:`}
      <select
        value={value}
        onChange={(event) => {
          setValue(parseInt(event.target.value));
        }}
      >
        {Array.from({ length: count }, (_, i) => i + start).map(
          (item, index) => {
            return (
              <option key={index} value={item}>
                {item}
              </option>
            );
          }
        )}
      </select>
    </div>
  );
};
