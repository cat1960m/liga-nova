import { INFO_CHECK_HEADER } from "@/app/lib/constants";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { FullData } from "@/app/lib/definitions";
import { UpdateDeleteTextButtons } from "../_buttons/UpdateDeleteTextButtons";

export type Props = {
  isEdit: boolean;
  staticTexts: StaticTexts;
  currentData: FullData;
};

export const InfoCheckGroupItem = ({
  isEdit,
  staticTexts,
  currentData,
}: Props) => {
  const isHeader = [INFO_CHECK_HEADER].includes(currentData.text_type);
  const text = currentData.text_content ?? "N/A";
  const changeOrderTextType = [INFO_CHECK_HEADER].includes(
    currentData.text_type
  )
    ? undefined
    : currentData.text_type;

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
              color: "blue",
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
          changeOrderTextType={changeOrderTextType}
        />
      ) : null}
    </div>
  );
};
