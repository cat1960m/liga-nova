import { FullData, MainParams } from "@/app/lib/definitions";
import { InfoCheckGroupItem } from "./InfoCheckGroupItem";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { AddTextDescriptionDeleteFeatureButtons } from "../__commonComponents/_buttons/AddTextDescriptionDeleteFeatureButtons";

export type Props = {
  headerType: string;
  columnItemType: string;
  groupData: FullData[];
  isEdit: boolean;
  staticTexts: StaticTexts;
  parentFeatureId: number;
  params: MainParams;
};

export const InfoCheckGroup = ({
  headerType,
  columnItemType,
  groupData,
  isEdit,
  staticTexts,
  parentFeatureId,
  params,
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
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          padding: isEdit ? "10px" : 0,
          border: isEdit ? "1px dotted magenta" : undefined,
        }}
      >
        {headerData ? (
          <InfoCheckGroupItem
            isEdit={isEdit}
            currentData={headerData}
            staticTexts={staticTexts}
            params={params}
          />
        ) : null}

        {bodyData
          ? bodyData.map((data, index) => {
              return (
                <InfoCheckGroupItem
                  key={data.id + "_" + index}
                  isEdit={isEdit}
                  currentData={data}
                  staticTexts={staticTexts}
                  params={params}
                />
              );
            })
          : null}
      </div>

      {isEdit ? (
        <AddTextDescriptionDeleteFeatureButtons
          featureId={featureId}
          deleteButtonText={staticTexts.delete ?? "N/A"}
          featureData={groupData}
          parentFeatureId={parentFeatureId}
          addButtonText={staticTexts.addGroupItem ?? "N/A"}
          textDescriptionType={columnItemType}
        />
      ) : null}
    </div>
  );
};
