import { FullData, MainParams } from "@/app/lib/definitions";
import { DrawFeatureContainer_Client } from "../DrawFeatureContainer_Client";
import { getContainerData } from "@/app/lib/utils";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { DeleteFeatureButton } from "../_buttons/DeleteFeatureButton";
import { LAYOUT_ITEM_LEFT, LAYOUT_ITEM_RIGHT } from "@/app/lib/constants";
import styles from "./layoutParent.module.css";
import cn from "clsx";

export type Props = {
  tabsData: FullData;
  pageFullDataList: FullData[];
  params: MainParams;
  isEdit: boolean;
  staticTexts: StaticTexts;
  parentFeatureId: number;
  pageId: number;
};

export const LayoutParent = ({
  pageFullDataList,
  tabsData,
  params,
  isEdit,
  staticTexts,
  parentFeatureId,
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
    <div
      style={
        isEdit ? { border: "4px dashed magenta", padding: "10px" } : undefined
      }
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
      {isEdit ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <div style={{ display: "flex", gap: "20px" }}>
            <DeleteFeatureButton
              featureId={tabsData.id}
              deleteText={staticTexts.delete ?? "N/A"}
              featureData={[tabsData]}
              parentFeatureId={parentFeatureId}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};
