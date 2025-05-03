import { FullData, MainParams } from "@/app/lib/definitions";
import { DrawFeatureContainer_Client } from "../../PageComponents/DrawFeatureContainer_Client";
import { getContainerData } from "@/app/lib/utils";
import { LAYOUT_ITEM_LEFT, LAYOUT_ITEM_RIGHT } from "@/app/lib/constants";
import styles from "./layoutParent.module.css";
import cn from "clsx";
import { ItemContainerAddTextDescriptionDeleteFeature } from "@/app/ui/CommonComponents/_itemGroupContainer/ItemContainerAddTextDescriptionDeleteFeature";

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

  const layoutItemLeftData = getContainerData({
    pageName: params.pageName,
    pageFullData: pageFullDataList,
    parentFeatureId: layoutItemLeft.id,
  });

  const layoutItemRightData = getContainerData({
    pageName: params.pageName,
    pageFullData: pageFullDataList,
    parentFeatureId: layoutItemRight.id,
  });
  const { staticTexts, editMode } = params;
  const isDeepMode = editMode === "2";

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
          className={cn(styles.item, styles.left, { [styles.edit]: isDeepMode })}
        >
          <DrawFeatureContainer_Client
            params={params}
            featureId={layoutItemLeft.id}
            pageFullDataList={pageFullDataList}
            containerFullData={layoutItemLeftData}
            buttonText={staticTexts.addItems ?? "N/A"}
            pageId={pageId}
          />
        </div>
        <div
          className={cn(styles.item, styles.right, { [styles.edit]: isDeepMode })}
        >
          <DrawFeatureContainer_Client
            params={params}
            featureId={layoutItemRight.id}
            pageFullDataList={pageFullDataList}
            containerFullData={layoutItemRightData}
            buttonText={staticTexts.addItems ?? "N/A"}
            pageId={pageId}
          />
        </div>
      </div>
    </ItemContainerAddTextDescriptionDeleteFeature>
  );
};
