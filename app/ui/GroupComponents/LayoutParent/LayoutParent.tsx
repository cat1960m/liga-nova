"use client";

import { FullData, MainParams } from "@/app/lib/definitions";
import { DrawFeatureContainer } from "../../PageComponents/DrawFeatureContainer/DrawFeatureContainer";
import { LAYOUT_ITEM_LEFT, LAYOUT_ITEM_RIGHT } from "@/app/lib/constants";
import styles from "./layoutParent.module.css";
import cn from "clsx";
import { ItemContainerAddTextDescriptionDeleteFeature } from "@/app/ui/CommonComponents/_itemGroupContainer/ItemContainerAddTextDescriptionDeleteFeature";
import { getIsEditNoDelete } from "@/app/lib/utils";

export type Props = {
  tabsData: FullData;
  pageFullDataList: FullData[];
  params: MainParams;
  pageId: number;
};

export const LayoutParent = ({
  pageFullDataList,
  tabsData,
  params,
  pageId,
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
    <ItemContainerAddTextDescriptionDeleteFeature
      isEdit={isDeepMode}
      deleteButtonText={staticTexts.delete ?? "N/A"}
      featureData={[tabsData]}
      isNoAddButton
      addButtonText=""
      textDescriptionType=""
      isChangeOrderHorizontal={false}
      marginTop={20}
      noDelete={!isDeepMode}
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
    </ItemContainerAddTextDescriptionDeleteFeature>
  );
};
