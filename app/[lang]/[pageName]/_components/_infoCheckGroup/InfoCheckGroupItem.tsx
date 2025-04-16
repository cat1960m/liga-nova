import { INFO_CHECK_HEADER } from "@/app/lib/constants";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { FullData, MainParams } from "@/app/lib/definitions";
import { UpdateDeleteTextButtons } from "../__commonComponents/_buttons/UpdateDeleteTextButtons";

export type Props = {
  isEdit: boolean;
  staticTexts: StaticTexts;
  currentData: FullData;
  params: MainParams;
};

export const InfoCheckGroupItem = ({
  isEdit,
  staticTexts,
  currentData,
  params,
}: Props) => {
  const isHeader = currentData.text_type === INFO_CHECK_HEADER;
  const text = currentData.text_content ?? "N/A";

  return (
    <div
      style={{
        flexGrow: 2,
        display: "flex",
        flexDirection: "column",
        fontWeight: isHeader ? 700 : 400,
        gap: "10px",
      }}
    >
      <div style={{ display: "flex", gap: "5px", alignItems: "flex-start" }}>
        {!isHeader ? (
          <div
            style={{
              width: "16px",
              minWidth: "16px",
              height: "16px",
              borderRadius: "8px",
              border: "2px solid blue",
              color: "#2575fc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "small",
              marginTop: "5px",
            }}
          >
            v
          </div>
        ) : null}
        <div>{text}</div>
      </div>
      {isEdit ? (
        <UpdateDeleteTextButtons
          currentData={currentData}
          staticTexts={staticTexts}
          isChangeOrder={!isHeader}
          useItems={{ text: "simple" }}
          params={params}
        />
      ) : null}
    </div>
  );
};
