import { INFO_CHECK_HEADER } from "@/app/lib/constants";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { FullData, MainParams } from "@/app/lib/definitions";
import { ItemContainerUpdateDeleteTextDescription } from "../__commonComponents/_itemGroupContainer/ItemContainerUpdateDeleteTextDescription";

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
        fontWeight: isHeader ? 700 : 400,
      }}
    >
      <ItemContainerUpdateDeleteTextDescription
        isEdit={isEdit}
        useItems={{ text: "simple" }}
        staticTexts={staticTexts}
        params={params}
        currentData={currentData}
        isChangeOrder={!isHeader}
        isHorizontal={false}
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
      </ItemContainerUpdateDeleteTextDescription>
    </div>
  );
};
