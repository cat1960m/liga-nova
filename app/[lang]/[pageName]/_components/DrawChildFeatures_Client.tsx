import {
  GROUP,
  GROUP1_SUBTYPE,
  GROUP2_SUBTYPE,
  GROUP_EXPANDED_SUBTYPE,
  LAYOUT_PARENT,
  SIMPLE_GROUP_SUBTYPES,
  TABS,
} from "@/app/lib/constants";
import { FullData, MainParams } from "@/app/lib/definitions";
import { ShowComplexGroup_Client } from "./ShowComplexGroup_Client";
import { ShowTabs_Client } from "./_tabs/ShowTabs_Client";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { ShowSimpleGroup_Client } from "./ShowSimpleGroup_Client";
import { LayoutParent } from "./_layout_parent/LayoutParent";

export type Props = {
  childFeatureDataList: FullData[];
  params: MainParams;
  pageFullDataList: FullData[];
  isEdit: boolean;
  staticTexts: StaticTexts;
  parentFeatureId: number;
  pageId: number;
};

export const DrawChildFeature_Client = ({
  childFeatureDataList,
  params,
  pageFullDataList,
  isEdit,
  staticTexts,
  parentFeatureId,
  pageId,
}: Props) => {
  const childFeatureFirstItem = childFeatureDataList[0];

  if (!childFeatureFirstItem) {
    return null;
  }

  const isSimpleGroup =
    childFeatureFirstItem.type === GROUP &&
    SIMPLE_GROUP_SUBTYPES.includes(childFeatureFirstItem.subtype);

  if (isSimpleGroup) {
    return (
      <ShowSimpleGroup_Client
        data={childFeatureDataList}
        isEdit={isEdit}
        staticTexts={staticTexts}
        parentFeatureId={parentFeatureId}
      />
    );
  }

  if (childFeatureFirstItem.type === GROUP) {
    return (
      <ShowComplexGroup_Client
        groupData={childFeatureDataList}
        isEdit={isEdit}
        staticTexts={staticTexts}
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
        isEdit={isEdit}
        staticTexts={staticTexts}
        parentFeatureId={parentFeatureId}
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
        isEdit={isEdit}
        staticTexts={staticTexts}
        parentFeatureId={parentFeatureId}
        pageId={pageId}
      />
    );
  }

  return <></>;
};
