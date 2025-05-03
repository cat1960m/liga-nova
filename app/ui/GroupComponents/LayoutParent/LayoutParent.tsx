import { FullData, MainParams } from "@/app/lib/definitions";
import { DrawFeatureContainer_Client } from "../../PageComponents/DrawFeatureContainer_Client";
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
          className={cn(styles.item, styles.left, {
            [styles.edit]: isDeepMode,
          })}
        >
          <DrawFeatureContainer_Client
            params={params}
            featureId={layoutItemLeft.id}
            pageFullDataList={pageFullDataList}
            buttonText={staticTexts.addItems ?? "N/A"}
            pageId={pageId}
          />
        </div>
        <div
          className={cn(styles.item, styles.right, {
            [styles.edit]: isDeepMode,
          })}
        >
          <DrawFeatureContainer_Client
            params={params}
            featureId={layoutItemRight.id}
            pageFullDataList={pageFullDataList}
            buttonText={staticTexts.addItems ?? "N/A"}
            pageId={pageId}
          />
        </div>
      </div>
    </ItemContainerAddTextDescriptionDeleteFeature>
  );
};
