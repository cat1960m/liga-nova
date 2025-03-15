import { GROUP, GROUP1, GROUP2, TABS } from "@/app/lib/constants";
import { FullData, MainParams } from "@/app/lib/definitions";
import { ShowComplexGroup_Client } from "./ShowComplexGroup_Client";
import { ShowTabs_Client } from "./_tabs/ShowTabs_Client";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { ShowSimpleGroup_Client } from "./ShowSimpleGroup_Client";

export type Props = {
  childFeatureDataList: FullData[];
  params: MainParams;
  pageFullDataList: FullData[];
  isEdit: boolean;
  staticTexts: StaticTexts;
};

export const DrawChildFeature_Client = ({
  childFeatureDataList,
  params,
  pageFullDataList,
  isEdit,
  staticTexts,
}: Props) => {
  const childFeatureFirstItem = childFeatureDataList[0];

  if (!childFeatureFirstItem) {
    return null;
  }

  const isSimpleGroup =
    childFeatureFirstItem.type === GROUP &&
    [GROUP1, GROUP2].includes(childFeatureFirstItem.subtype);

  if (isSimpleGroup) {
    return (
      <ShowSimpleGroup_Client
        data={childFeatureFirstItem}
        isEdit={isEdit}
        staticTexts={staticTexts}
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
      />
    );
  }
  return <></>;
};
