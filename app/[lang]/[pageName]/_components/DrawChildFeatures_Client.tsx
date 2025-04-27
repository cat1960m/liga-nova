import {
  GROUP,
  TEXT_HEADER_GROUP_SUBTYPE,
  LAYOUT_PARENT,
  TABS,
  DIVIDER,
} from "@/app/lib/constants";
import { FullData, MainParams } from "@/app/lib/definitions";
import { ShowComplexGroup_Client } from "./ShowComplexGroup_Client";
import { ShowTabs_Client } from "./_tabs/ShowTabs_Client";
import { ShowSimpleGroup_Client } from "./_simpleGroup/ShowSimpleGroup_Client";
import { LayoutParent } from "./_layout_parent/LayoutParent";
import { ItemContainerAddTextDescriptionDeleteFeature } from "./__commonComponents/_itemGroupContainer/ItemContainerAddTextDescriptionDeleteFeature";

export type Props = {
  childFeatureDataList: FullData[];
  params: MainParams;
  pageFullDataList: FullData[];
  parentFeatureId: number;
  pageId: number;
};

export const DrawChildFeature_Client = ({
  childFeatureDataList,
  params,
  pageFullDataList,
  parentFeatureId,
  pageId,
}: Props) => {
  const childFeatureFirstItem = childFeatureDataList[0];

  if (!childFeatureFirstItem) {
    return null;
  }

  const isSimpleGroup =
    childFeatureFirstItem.type === GROUP &&
    TEXT_HEADER_GROUP_SUBTYPE === childFeatureFirstItem.subtype;

  const isDivider =
    childFeatureFirstItem.type === GROUP &&
    DIVIDER === childFeatureFirstItem.subtype;
  const { staticTexts, isEdit } = params;

  if (isDivider) {
    return (
      <ItemContainerAddTextDescriptionDeleteFeature
        isNoAddButton
        deleteButtonText={staticTexts.delete ?? "N/A"}
        featureData={childFeatureDataList}
        isEdit={isEdit}
        addButtonText=""
        textDescriptionType=""
        isChangeOrderHorizontal={false}
        marginTop={10}
      >
        <div
          style={{
            width: "100%",
            borderTop: "1px solid lightgray",
            marginBottom: "30px",
          }}
        />
      </ItemContainerAddTextDescriptionDeleteFeature>
    );
  }

  if (isSimpleGroup) {
    return (
      <ShowSimpleGroup_Client data={childFeatureDataList} params={params} />
    );
  }

  if (childFeatureFirstItem.type === GROUP) {
    return (
      <ShowComplexGroup_Client
        groupData={childFeatureDataList}
        pageFullDataList={pageFullDataList}
        params={params}
        parentFeatureId={parentFeatureId}
        pageId={pageId}
      />
    );
  }

  if (childFeatureFirstItem.type === TABS) {
    return (
      <ShowTabs_Client
        tabsData={childFeatureFirstItem}
        pageFullDataList={pageFullDataList}
        params={params}
        pageId={pageId}
      />
    );
  }

  if (childFeatureFirstItem.type === LAYOUT_PARENT) {
    return (
      <LayoutParent
        tabsData={childFeatureFirstItem}
        pageFullDataList={pageFullDataList}
        params={params}
        pageId={pageId}
      />
    );
  }

  return <></>;
};
