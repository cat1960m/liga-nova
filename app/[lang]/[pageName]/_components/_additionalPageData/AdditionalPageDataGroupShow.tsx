import { LIST_ITEM, TRAINERS_PAGE_NAME } from "@/app/lib/constants";
import { FullData } from "@/app/lib/definitions";
import { getContainerData, getFilterIds } from "@/app/lib/utils";
import { useMemo } from "react";
import { ListItem } from "../_filterGroupsListItems/ListItem";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { ScrollContainer } from "../__commonComponents/_scrollContainer/ScrollContainer";

export type Props = {
  currentData: FullData;
  pageFullDataList: FullData[];
  pageName: string;
  staticTexts: StaticTexts;
};

export const AdditionalPageDataGroupShow = ({
  currentData,
  pageFullDataList,
  pageName,
  staticTexts,
}: Props) => {
  const pageFeatureId = currentData.id;
  const filterTextDescriptionIds = getFilterIds(currentData.filter_ids);

  const containerFullData = useMemo(
    () =>
      pageFeatureId
        ? getContainerData({
            pageName,
            pageFullData: pageFullDataList,
            parentFeatureId: null,
            type: LIST_ITEM,
            subtype: LIST_ITEM,
            selectedFilterTextDescriptionIds: filterTextDescriptionIds,
          })
        : null,
    [pageFullDataList, pageFeatureId]
  );

  if (!containerFullData) {
    return null;
  }

  const [data, itemIds] = containerFullData;

  if (pageName === TRAINERS_PAGE_NAME) {
    const getItem = ({ id }: { id: string }) => {
      return (
        <div
          style={{
            padding: "0 10px",
            width: "100%",
          }}
        >
          <ListItem
            currentData={data[id]}
            pageName={pageName}
            pageFullDataList={pageFullDataList}
            staticTexts={staticTexts}
          />
        </div>
      );
    };

    return (
      <ScrollContainer
        ids={containerFullData[1]}
        getItem={getItem}
        isEdit={false}
      />
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "stretch",
        width: "100%",
        justifyContent: "center",
        justifyItems: "center",
        alignContent: "center",
      }}
    >
      {itemIds.map((itemId) => {
        return (
          <div
            key={itemId}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              width: "33.3%",
              minWidth: "190px",
              padding: "10px",
              flexGrow: 2,
              maxWidth: "50%",
            }}
          >
            <ListItem
              currentData={data[itemId]}
              pageName={pageName}
              pageFullDataList={pageFullDataList}
              staticTexts={staticTexts}
            />
          </div>
        );
      })}
    </div>
  );
};
