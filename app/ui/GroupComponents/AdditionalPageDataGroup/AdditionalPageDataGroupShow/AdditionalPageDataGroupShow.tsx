import { FullData, StructuredFeatureData } from "@/app/lib/definitions";
import { useRef } from "react";
import { ListItem } from "../../FilterGroupsListItemsGroup/ListItem/ListItem";
import { StaticTexts } from "@/app/dictionaries/definitions";

import styles from "./additionalPageDataGroupShow.module.css";
import { ScrollContainer } from "@/app/ui/CommonComponents/ScrollContainer/ScrollContainer";
import { useIcons } from "@/app/ui/hooks/useIcons";
import { TRAINERS_PAGE_NAME } from "@/app/lib/constants";

export type Props = {
  pageFullDataList: FullData[];
  pageName: string;
  staticTexts: StaticTexts;
  structuredListItemsData: StructuredFeatureData;
  lang: string;
};

export const AdditionalPageDataGroupShow = ({
  pageFullDataList,
  pageName,
  staticTexts,
  structuredListItemsData,
  lang
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const {premiumIcon} = useIcons({lang, isNoUseIcon: pageName !== TRAINERS_PAGE_NAME})

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
          srcPremiumIcon={premiumIcon?.value ?? ""}
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
