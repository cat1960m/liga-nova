import { FullData, MainParams } from "@/app/lib/definitions";
import { InfoCheckGroupItem } from "./InfoCheckGroupItem";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { ItemContainerAddTextDescriptionDeleteFeature } from "../__commonComponents/_itemGroupContainer/ItemContainerAddTextDescriptionDeleteFeature";

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
    <ItemContainerAddTextDescriptionDeleteFeature
      isEdit={isEdit}
      deleteButtonText={staticTexts.delete ?? "N/A"}
      featureData={groupData}
      addButtonText={staticTexts.addGroupItem ?? "N/A"}
      textDescriptionType={columnItemType}
      isChangeOrderHorizontal={false}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
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
    </ItemContainerAddTextDescriptionDeleteFeature>
  );
};
