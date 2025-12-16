"use client";

import { FullData, MainParams } from "@/app/lib/definitions";
import { DrawFeatureContainer } from "../../PageComponents/DrawFeatureContainer/DrawFeatureContainer";
import { LAYOUT_ITEM_LEFT, LAYOUT_ITEM_RIGHT } from "@/app/lib/constants";
import styles from "./layoutParent.module.css";
import cn from "clsx";
import { getIsEditNoDelete } from "@/app/lib/utils";
import { ItemContainerDeleteFeature } from "../../CommonComponents/_itemGroupContainer/ItemContainerDeleteFeature";
import { CountIndex } from "@/app/dictionaries/definitions";

export type Props = {
  tabsData: FullData;
  pageFullDataList: FullData[];
  params: MainParams;
  pageId: number;
  countIndex: CountIndex;
};

export const LayoutParent = ({
  pageFullDataList,
  tabsData,
  params,
  pageId,
  countIndex,
}: Props) => {
  const layoutItems = pageFullDataList.filter(
    (item) => item.parent_feature_id === tabsData.id
  );

  if (layoutItems.length !== 2) {
    return null;
  }

  const layoutItemLeft = layoutItems.find(
    (item) => item.subtype === LAYOUT_ITEM_LEFT
  );
  const layoutItemRight = layoutItems.find(
    (item) => item.subtype === LAYOUT_ITEM_RIGHT
  );

  if (!layoutItemLeft || !layoutItemRight) {
    return null;
  }

  const { staticTexts } = params;
  const { isDeepMode } = getIsEditNoDelete(params);

  return (
    <ItemContainerDeleteFeature
      isEdit={isDeepMode}
      deleteText={staticTexts.delete ?? "N/A"}
      featureData={[tabsData]}
      isChangeOrderHorizontal={false}
      marginTop={20}
      noDelete={!isDeepMode}
      countIndex={countIndex}
      noChangeOrder={false}
    >
      <div className={styles.container}>
        <div
          className={cn(styles.itemLeft, {
            [styles.edit]: isDeepMode,
          })}
        >
          <DrawFeatureContainer
            params={params}
            featureId={layoutItemLeft.id}
            pageFullDataList={pageFullDataList}
            buttonText={staticTexts.addItems ?? "N/A"}
            pageId={pageId}
            isOneChildren
          />
        </div>

        <div
          className={cn(styles.itemRight, {
            [styles.edit]: isDeepMode,
          })}
        >
          <DrawFeatureContainer
            params={params}
            featureId={layoutItemRight.id}
            pageFullDataList={pageFullDataList}
            buttonText={staticTexts.addItems ?? "N/A"}
            pageId={pageId}
            isOneChildren
          />
        </div>
      </div>
    </ItemContainerDeleteFeature>
  );
};
