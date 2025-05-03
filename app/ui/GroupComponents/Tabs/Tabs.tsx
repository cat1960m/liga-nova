"use client";

import { FullData, MainParams } from "@/app/lib/definitions";
import { useState } from "react";
import { ShowTabTitle_Client } from "./TabTitle";
import { DrawFeatureContainer_Client } from "../../PageComponents/DrawFeatureContainer_Client";
import { TAB, TAB_TITLE } from "@/app/lib/constants";
import { ItemContainerAddChildFeatureDeleteFeature } from "@/app/ui/CommonComponents/_itemGroupContainer/ItemContainerAddChildFeatureDeleteFeature";

import styles from "./tabs.module.css";
import { getIsEditNoDelete } from "@/app/lib/utils";

export type Props = {
  tabsData: FullData;
  pageFullDataList: FullData[];
  params: MainParams;
  pageId: number;
};

export const ShowTabs_Client = ({
  pageFullDataList,
  tabsData,
  params,
  pageId,
}: Props) => {
  const tabTitles = pageFullDataList.filter(
    (item) => item.parent_feature_id === tabsData.id
  );

  tabTitles.sort((item1, item2) =>
    item1.feature_order > item2.feature_order ? 1 : -1
  );

  const [selectedTabFeatureId, setSelectedTabFeatureId] = useState<
    number | null
  >(tabTitles?.[0].id ?? null);

  const handleSelectedTabFeatureIdChanged = (featureId: number) => {
    setSelectedTabFeatureId(featureId);
  };

  const { staticTexts, pageName } = params;
  const { isDeepMode } = getIsEditNoDelete(params);

  return (
    <ItemContainerAddChildFeatureDeleteFeature
      addButtonText={staticTexts.addTab ?? "N/A"}
      pageName={pageName}
      isEdit={isDeepMode}
      textTypes={[TAB_TITLE]}
      featureType={TAB}
      featureSubtype="1"
      deleteButtonText={staticTexts.deleteTabs ?? "N/A"}
      groupData={[tabsData]}
      marginTop={20}
      noDelete={!isDeepMode}
    >
      <div className={styles.container}>
        <div className={styles.tab_titles}>
          {tabTitles.map((tabTitle, index) => {
            return (
              <div key={tabTitle.id + "_" + index}>
                <ShowTabTitle_Client
                  tabTitle={tabTitle}
                  selectedTabFeatureId={selectedTabFeatureId}
                  onSelectedTabFeatureIdChanged={
                    handleSelectedTabFeatureIdChanged
                  }
                  params={params}
                />
              </div>
            );
          })}
        </div>

        {selectedTabFeatureId ? (
          <DrawFeatureContainer_Client
            params={params}
            featureId={selectedTabFeatureId}
            pageFullDataList={pageFullDataList}
            buttonText={staticTexts.addItemToTab ?? "N/A"}
            pageId={pageId}
          />
        ) : null}
      </div>
    </ItemContainerAddChildFeatureDeleteFeature>
  );
};
