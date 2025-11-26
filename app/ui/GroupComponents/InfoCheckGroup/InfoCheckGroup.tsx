import { FullData, MainParams } from "@/app/lib/definitions";
import { InfoCheckGroupItem } from "./InfoCheckGroupItem/InfoCheckGroupItem";
import { ItemContainerAddTextDescriptionDeleteFeature } from "@/app/ui/CommonComponents/_itemGroupContainer/ItemContainerAddTextDescriptionDeleteFeature";
import { INFO_CHECK_HEADER, INFO_CHECK_ITEM } from "@/app/lib/constants";
import { getIsEditNoDelete } from "@/app/lib/utils";
import styles from "./infoCheckGroup.module.css";

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
  const { staticTexts, lang } = params;
  const { isEdit, noDelete } = getIsEditNoDelete(params);

  return (
    <div className={styles.container}>
      {headerData ? (
        <InfoCheckGroupItem
          currentData={headerData}
          isEdit={isEdit}
          staticTexts={staticTexts}
          lang={lang}
          countIndex={null}
        />
      ) : null}

      <ItemContainerAddTextDescriptionDeleteFeature
        isEdit={isEdit}
        deleteButtonText={staticTexts.delete ?? "N/A"}
        featureData={groupData}
        addButtonText={staticTexts.addGroupItem ?? "N/A"}
        textDescriptionType={columnItemType}
        isChangeOrderHorizontal={false}
        marginTop={20}
        noDelete={noDelete}
      >
        {bodyData
          ? bodyData.map((data, index) => {
              return (
                <div
                  style={{ paddingBottom: "10px" }}
                  key={data.id + "_" + index}
                >
                  <InfoCheckGroupItem
                    currentData={data}
                    isEdit={isEdit}
                    staticTexts={staticTexts}
                    lang={lang}
                    countIndex={{ count: bodyData.length, index }}
                  />
                </div>
              );
            })
          : null}
      </ItemContainerAddTextDescriptionDeleteFeature>
    </div>
  );
};
