import { LIST_ITEM } from "@/app/lib/constants";
import { FullData } from "@/app/lib/definitions";
import { getContainerData, getFilterIds } from "@/app/lib/utils";
import { useMemo } from "react";
import { ListItem } from "../_listItem/ListItem";

export type Props = {
  currentData: FullData;
  pageFullDataList: FullData[];
  pageName: string;
};

export const AdditionalPageDataGroupShow = ({
  currentData,
  pageFullDataList,
  pageName,
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
            <ListItem currentData={data[itemId]} pageName={pageName} />
          </div>
        );
      })}
    </div>
  );
};
