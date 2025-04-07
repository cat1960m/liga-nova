export type Props = {
  label: string;
  value: number;
  setValue: (value: number) => void;
};

export const NumberValue = ({ label, value, setValue }: Props) => {
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
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value) ?? 0)}
        style={{ width: "70px" }}
      />
    </div>
  );
};
