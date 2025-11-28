import { FullData, StructuredFeatureData } from "@/app/lib/definitions";
import { useRef } from "react";
import { ListItem } from "../../FilterGroupsListItemsGroup/ListItem/ListItem";
import { StaticTexts } from "@/app/dictionaries/definitions";

import styles from "./additionalPageDataGroupShow.module.css";
import { ScrollContainer } from "@/app/ui/CommonComponents/ScrollContainer/ScrollContainer";

export type Props = {
  pageFullDataList: FullData[];
  pageName: string;
  staticTexts: StaticTexts;
  structuredListItemsData: StructuredFeatureData;
};

export const AdditionalPageDataGroupShow = ({
  pageFullDataList,
  pageName,
  staticTexts,
  structuredListItemsData
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  if (!structuredListItemsData.sortedChildFeaFeatureIds.length) {
    return null;
  }

  const getItem = ({ id }: { id: string }) => {
    return (
      <div className={styles.item}>
        <ListItem
          currentData={structuredListItemsData.childFeatureIdToFullDataList[id]}
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
        ids={structuredListItemsData.sortedChildFeaFeatureIds}
        getItem={getItem}
        refParent={ref}
      />
    </div>
  );
};
