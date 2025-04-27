import { StaticTexts } from "@/app/dictionaries/definitions";

export type Props = {
  text: string;
  title: string;
  price: string;
  staticTexts: StaticTexts;
};

export const ShowGroupServicesText = ({
  text,
  title,
  price,
  staticTexts,
}: Props) => {
  return (
    <div
      style={{
        flexGrow: 2,
        flexShrink: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div
        title={title}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          fontSize: 18,
          color: "#4f4f4f",
        }}
      >
        {text}
        {title ? (
          <div
            style={{
              display: "flex",
              width: "16px",
              minWidth: "16px",
              height: "16px",
              borderRadius: "8px",
              border: "1px solid blue",
              color: "blue",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 10px",
            }}
          >
            i
          </div>
        ) : null}
      </div>
      {price ? (
        <div style={{ fontSize: 14, fontWeight: 600 }}>{price}</div>
      ) : (
        <div
          style={{
            backgroundColor: "#d6d6d6",
            color: "#4f4f4f",
            padding: "5px",
            fontSize: 12,
            fontWeight: 500,
          }}
        >
          {staticTexts.byAgreement}{" "}
        </div>
      )}
    </div>
  );
};
