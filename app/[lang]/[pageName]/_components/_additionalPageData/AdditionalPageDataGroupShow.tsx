import { LIST_ITEM } from "@/app/lib/constants";
import { FullData } from "@/app/lib/definitions";
import { getContainerData, getFilterIds } from "@/app/lib/utils";
import { useMemo, useRef } from "react";
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
  const ref = useRef<HTMLDivElement>(null);
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

  const getItem = ({ id }: { id: string }) => {
    return (
      <div
        style={{
          padding: "0 10px",
          width: "100%",
          height: "100%",
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
    <div style={{ width: "100%" }} ref={ref}>
      <ScrollContainer
        ids={containerFullData[1]}
        getItem={getItem}
        refParent={ref}
      />
    </div>
  );

};
