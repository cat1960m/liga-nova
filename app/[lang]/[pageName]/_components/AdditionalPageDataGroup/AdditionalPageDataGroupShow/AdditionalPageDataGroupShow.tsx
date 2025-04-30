import { LIST_ITEM } from "@/app/lib/constants";
import { FullData } from "@/app/lib/definitions";
import { getContainerData, getFilterIds } from "@/app/lib/utils";
import { useMemo, useRef } from "react";
import { ListItem } from "../../FilterGroupsListItemsGroup/ListItem";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { ScrollContainer } from "../../__commonComponents/ScrollContainer/ScrollContainer";

import styles from "./additionalPageDataGroupShow.module.css";

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
      <div className={styles.item}>
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
    <div className={styles.container} ref={ref}>
      <ScrollContainer
        ids={containerFullData[1]}
        getItem={getItem}
        refParent={ref}
      />
    </div>
  );
};
