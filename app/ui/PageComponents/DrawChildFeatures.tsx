import { GROUP, LAYOUT_PARENT, TABS } from "@/app/lib/constants";
import { FullData, MainParams } from "@/app/lib/definitions";
import { ShowFeatureGroup } from "./ShowFeatureGroup/ShowFeatureGroup";
import { Tabs } from "../GroupComponents/Tabs/Tabs";
import { LayoutParent } from "../GroupComponents/LayoutParent/LayoutParent";
import { CountIndex } from "@/app/dictionaries/definitions";

export type Props = {
  childFeatureDataList: FullData[];
  params: MainParams;
  pageFullDataList: FullData[];
  parentFeatureId: number;
  pageId: number;
  countIndex: CountIndex;
};

export const DrawChildFeature = ({
  childFeatureDataList,
  params,
  pageFullDataList,
  pageId,
  countIndex
}: Props) => {
  const childFeatureFirstItem = childFeatureDataList[0];

  if (!childFeatureFirstItem) {
    return null;
  }

  if (childFeatureFirstItem.type === GROUP) {
    return (
      <ShowFeatureGroup
        groupData={childFeatureDataList}
        pageFullDataList={pageFullDataList}
        params={params}
        pageId={pageId}
        countIndex={countIndex}
      />
    );
  }

  if (childFeatureFirstItem.type === TABS) {
    return (
      <Tabs
        tabsData={childFeatureFirstItem}
        pageFullDataList={pageFullDataList}
        params={params}
        pageId={pageId}
        countIndex={countIndex}
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
        countIndex={countIndex}
      />
    );
  }

  return <></>;
};
