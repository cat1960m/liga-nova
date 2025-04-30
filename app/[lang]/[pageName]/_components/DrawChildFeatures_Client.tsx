import {
  GROUP,
  TEXT_HEADER_GROUP_SUBTYPE,
  LAYOUT_PARENT,
  TABS,
  DIVIDER,
} from "@/app/lib/constants";
import { FullData, MainParams } from "@/app/lib/definitions";
import { ShowComplexGroup_Client } from "./ShowComplexGroup_Client";
import { ShowTabs_Client } from "./Tabs/Tabs";
import { TextHeaderGroup } from "./TextHeaderGroup/TextHeaderGroup";
import { LayoutParent } from "./LayoutParent/LayoutParent";
import { DividerGroup } from "./DividerGroup/DividerGroup";

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
      <DividerGroup
        staticTexts={staticTexts}
        isEdit={isEdit}
        featureData={childFeatureDataList}
      />
    );
  }

  if (isSimpleGroup) {
    return (
      <TextHeaderGroup data={childFeatureDataList} params={params} />
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
