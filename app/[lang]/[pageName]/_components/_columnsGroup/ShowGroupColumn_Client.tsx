import { FullData } from "@/app/lib/definitions";
import { ShowGroupColumnText_Client } from "./ShowGroupColumnText_Client";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { AddTextDescriptionButton } from "../_clientComponents/AddTextDescriptionButton";

export type Props = {
  headerType: string;
  columnItemType: string;
  groupData: FullData[];
  isEdit: boolean;
  staticTexts: StaticTexts;
};

export const ShowGroupColumn_Client = ({
  headerType,
  columnItemType,
  groupData,
  isEdit,
  staticTexts,
}: Props) => {
  const featureId = groupData[0]?.id;
  const headerData = groupData.find((data) => data.text_type === headerType);
  const bodyData = groupData.filter(
    (data) => data.text_type === columnItemType
  );

  if (!featureId) {
    return null;
  }

  return (
    <div
      style={{
        display: "flex",
        flexGrow: 2,
        flexDirection: "column",
        gap: "10px",
        padding: isEdit ? "10px" : 0,
        border: isEdit ? "1px dotted magenta" : undefined,
      }}
    >
      {headerData ? (
        <ShowGroupColumnText_Client
          isEdit={isEdit}
          currentData={headerData}
          staticTexts={staticTexts}
        />
      ) : null}

      {bodyData
        ? bodyData.map((data, index) => {
            return (
              <ShowGroupColumnText_Client
                key={data.id + "_" + index}
                isEdit={isEdit}
                currentData={data}
                staticTexts={staticTexts}
              />
            );
          })
        : null}

      {isEdit ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            paddingTop: "10px",
          }}
        >
          <AddTextDescriptionButton
            featureId={featureId}
            textType={columnItemType}
            buttonText={staticTexts.addColumnItem ?? "N/A"}
            price={null}
          />
        </div>
      ) : null}
    </div>
  );
};
