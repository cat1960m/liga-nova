import { FullData, MainParams } from "@/app/lib/definitions";
import { ItemContainerUpdateDeleteTextDescription } from "../__commonComponents/_itemGroupContainer/ItemContainerUpdateDeleteTextDescription";
import { StaticTexts } from "@/app/dictionaries/definitions";

export type Props = {
  isMain: boolean;
  textBody: FullData;
  isEdit: boolean;
  params: MainParams;
  staticTexts: StaticTexts
};

export const ShowBody = ({ isMain, textBody, isEdit, staticTexts, params }: Props) => {
  const text = textBody?.text_content ?? "N/A";
  return (
    <ItemContainerUpdateDeleteTextDescription
      isEdit={isEdit}
      staticTexts={staticTexts}
      currentData={textBody}
      useItems={{ text: "area" }}
      params={params}
      isChangeOrder={false}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
        }}
      >
        {isMain ? (
          <div
            style={{
              height: "20px",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              fontSize: "40px",
              color: "#6f6fff",
              lineHeight: "30px",
            }}
          >
            "
          </div>
        ) : null}
        <div
          style={{
            fontSize: isMain ? 16 : 12,
            fontWeight: 200,
            whiteSpace: "pre-line",
            padding: isMain ? "0 30px" : undefined,
          }}
        >
          {text}
        </div>
        {isMain ? (
          <div
            style={{
              height: "40px",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              fontSize: "40px",
              color: "#6f6fff",
              lineHeight: "30px",
            }}
          >
            "
          </div>
        ) : null}
      </div>
    </ItemContainerUpdateDeleteTextDescription>
  );
};
