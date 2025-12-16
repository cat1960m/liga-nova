import { FullData, MainParams } from "@/app/lib/definitions";
import { InfoCheckGroupItem } from "./InfoCheckGroupItem/InfoCheckGroupItem";
import { INFO_CHECK_HEADER, INFO_CHECK_ITEM } from "@/app/lib/constants";
import { getIsEditNoDelete } from "@/app/lib/utils";
import styles from "./infoCheckGroup.module.css";
import { ItemContainerDeleteFeature } from "../../CommonComponents/_itemGroupContainer/ItemContainerDeleteFeature";
import { ItemContainerAddTextDescription } from "../../CommonComponents/_itemGroupContainer/ItemContainerAddTextDescription";
import { CountIndex } from "@/app/dictionaries/definitions";

export type Props = {
  groupData: FullData[];
  params: MainParams;
  countIndex: CountIndex;
};

export const InfoCheckGroup = ({ groupData, params, countIndex }: Props) => {
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
    <ItemContainerDeleteFeature
      isEdit={isEdit}
      deleteText={staticTexts.delete ?? "N/A"}
      featureData={groupData}
      isChangeOrderHorizontal={false}
      marginTop={20}
      noDelete={noDelete}
      countIndex={countIndex}
      noChangeOrder={false}
    >
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

        <ItemContainerAddTextDescription
          isEdit={isEdit}
          featureData={groupData}
          addButtonText={staticTexts.addGroupItem ?? "N/A"}
          textDescriptionType={columnItemType}
          marginTop={20}
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
        </ItemContainerAddTextDescription>
      </div>
    </ItemContainerDeleteFeature>
  );
};
