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
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px",
        justifyContent: "center",
        fontWeight: 700,
      }}
    >
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
