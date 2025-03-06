import { HEADER1, HEADER2 } from "@/app/lib/constants";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { FullData } from "@/app/lib/definitions";
import { UpdateDeleteText } from "../UpdateDeleteText";

export type Props = {
  isEdit: boolean;
  staticTexts: StaticTexts;
  currentData: FullData;
};

export const ShowGroupColumnText_Client = ({
  isEdit,
  staticTexts,
  currentData,
}: Props) => {
  const isHeader = [HEADER1, HEADER2].includes(currentData.text_type);
  const canDelete = !!currentData.can_delete;

  const text = currentData.text_content ?? "N/A";
  const textDescriptionId = currentData.text_description_id;

  return (
    <div
      style={{
        flexGrow: 2,
        display: "flex",
        flexWrap: "wrap",
        fontWeight: isHeader ? 700 : 400,
        gap: "10px",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
        {!isHeader ? (
          <div
            style={{
              width: "16px",
              height: "16px",
              borderRadius: "8px",
              border: "2px solid blue",
              color: "blue",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "small",
            }}
          >
            v
          </div>
        ) : null}
        <div>{text}</div>
      </div>
      {isEdit ? (
        <UpdateDeleteText currentData={currentData} staticTexts={staticTexts} />
      ) : null}
    </div>
  );
};
