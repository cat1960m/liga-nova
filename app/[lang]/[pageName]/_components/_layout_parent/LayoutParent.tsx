import { FullData, MainParams } from "@/app/lib/definitions";
import { DrawFeatureContainer_Client } from "../DrawFeatureContainer_Client";
import { getContainerData } from "@/app/lib/utils";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { LAYOUT_ITEM_LEFT, LAYOUT_ITEM_RIGHT } from "@/app/lib/constants";
import styles from "./layoutParent.module.css";
import cn from "clsx";
import { ItemContainerAddTextDescriptionDeleteFeature } from "../__commonComponents/_itemGroupContainer/ItemContainerAddTextDescriptionDeleteFeature";

export type Props = {
  tabsData: FullData;
  pageFullDataList: FullData[];
  params: MainParams;
  isEdit: boolean;
  staticTexts: StaticTexts;
  pageId: number;
};

export const LayoutParent = ({
  pageFullDataList,
  tabsData,
  params,
  isEdit,
  staticTexts,
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

  return (
    <ItemContainerAddTextDescriptionDeleteFeature
      isEdit={isEdit}
      deleteButtonText={staticTexts.delete ?? "N/A"}
      featureData={[tabsData]}
      isNoAddButton
      addButtonText=""
      textDescriptionType=""
      isChangeOrderHorizontal={false}
      marginTop={20}
    >
      <div className={styles.container}>
        <div
          style={{
            padding: isEdit ? "10px" : undefined,
            border: isEdit ? "1px dotted magenta" : undefined,
          }}
          className={cn(styles.item, styles.left)}
        >
          <DrawFeatureContainer_Client
            params={params}
            featureId={layoutItemLeft.id}
            pageFullDataList={pageFullDataList}
            containerFullData={layoutItemLeftData}
            isEdit={isEdit}
            staticTexts={staticTexts}
            buttonText={staticTexts.addItems ?? "N/A"}
            pageId={pageId}
          />
        </div>
        <div
          style={{
            padding: isEdit ? "10px" : undefined,
            border: isEdit ? "1px dotted magenta" : undefined,
          }}
          className={cn(styles.item, styles.right)}
        >
          <DrawFeatureContainer_Client
            params={params}
            featureId={layoutItemRight.id}
            pageFullDataList={pageFullDataList}
            containerFullData={layoutItemRightData}
            isEdit={isEdit}
            staticTexts={staticTexts}
            buttonText={staticTexts.addItems ?? "N/A"}
            pageId={pageId}
          />
        </div>
      </div>
    </ItemContainerAddTextDescriptionDeleteFeature>
  );
};
