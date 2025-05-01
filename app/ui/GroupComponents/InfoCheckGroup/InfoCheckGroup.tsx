import { FullData, MainParams } from "@/app/lib/definitions";
import { InfoCheckGroupItem } from "./InfoCheckGroupItem";
import { ItemContainerAddTextDescriptionDeleteFeature } from "@/app/ui/CommonComponents/_itemGroupContainer/ItemContainerAddTextDescriptionDeleteFeature";
import { INFO_CHECK_HEADER, INFO_CHECK_ITEM } from "@/app/lib/constants";

export type Props = {
  groupData: FullData[];
  params: MainParams;
};

export const InfoCheckGroup = ({ groupData, params }: Props) => {
  const headerType = INFO_CHECK_HEADER;
  const columnItemType = INFO_CHECK_ITEM;

  const featureId = groupData[0]?.id;
  const headerData = groupData.find((data) => data.text_type === headerType);
  const bodyData = groupData.filter(
    (data) => data.text_type === columnItemType
  );

  if (!featureId) {
    return null;
  }
  const { staticTexts, isEdit } = params;

  return (
    <ItemContainerAddTextDescriptionDeleteFeature
      isEdit={isEdit}
      deleteButtonText={staticTexts.delete ?? "N/A"}
      featureData={groupData}
      addButtonText={staticTexts.addGroupItem ?? "N/A"}
      textDescriptionType={columnItemType}
      isChangeOrderHorizontal={false}
      marginTop={20}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {headerData ? (
          <InfoCheckGroupItem currentData={headerData} params={params} />
        ) : null}

        {bodyData
          ? bodyData.map((data, index) => {
              return (
                <InfoCheckGroupItem
                  key={data.id + "_" + index}
                  currentData={data}
                  params={params}
                />
              );
            })
          : null}
      </div>
    </ItemContainerAddTextDescriptionDeleteFeature>
  );
};
