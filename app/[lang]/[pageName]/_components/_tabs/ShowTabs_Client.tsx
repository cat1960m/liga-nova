"use client";

import { FullData, MainParams } from "@/app/lib/definitions";
import { useEffect, useState } from "react";
import { ShowTabTitle_Client } from "./ShowTabTitle_Client";
import { DrawFeatureContainer_Client } from "../DrawFeatureContainer_Client";
import { getContainerData } from "@/app/lib/utils";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { TAB, TAB_TITLE } from "@/app/lib/constants";
import { ItemContainerAddChildFeatureDeleteFeature } from "../__commonComponents/_itemGroupContainer/ItemContainerAddChildFeatureDeleteFeature";

export type Props = {
  tabsData: FullData;
  pageFullDataList: FullData[];
  params: MainParams;
  isEdit: boolean;
  staticTexts: StaticTexts;
  pageId: number;
};

export const ShowTabs_Client = ({
  pageFullDataList,
  tabsData,
  params,
  isEdit,
  staticTexts,
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

  const [selectedTabData, setSelectedTabData] = useState<
    [Record<string, FullData[]>, string[]] | null
  >(null);

  const handleSelectedTabFeatureIdChanged = (featureId: number) => {
    setSelectedTabFeatureId(featureId);
    const tabContainerData = getContainerData({
      pageName: params.pageName,
      pageFullData: pageFullDataList,
      parentFeatureId: featureId,
    });
    setSelectedTabData(tabContainerData);
  };

  useEffect(() => {
    const tabContainerData = getContainerData({
      pageName: params.pageName,
      pageFullData: pageFullDataList,
      parentFeatureId: selectedTabFeatureId ?? tabTitles?.[0].id,
    });

    setSelectedTabData(tabContainerData);
  }, [pageFullDataList]);

  return (
    <ItemContainerAddChildFeatureDeleteFeature
      addButtonText={staticTexts.addTab ?? "N/A"}
      params={params}
      textTypes={[TAB_TITLE]}
      featureType={TAB}
      featureSubtype="1"
      deleteButtonText={staticTexts.deleteTabs ?? "N/A"}
      groupData={[tabsData]}
      isEdit={isEdit}
      marginTop={20}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            width: "100%",
            alignItems: "center",
          }}
        >
          {tabTitles.map((tabTitle, index) => {
            return (
              <div key={tabTitle.id + "_" + index}>
                <ShowTabTitle_Client
                  tabTitle={tabTitle}
                  selectedTabFeatureId={selectedTabFeatureId}
                  onSelectedTabFeatureIdChanged={
                    handleSelectedTabFeatureIdChanged
                  }
                  isEdit={isEdit}
                  staticTexts={staticTexts}
                  params={params}
                />
              </div>
            );
          })}
        </div>

        {selectedTabData && selectedTabFeatureId ? (
          <DrawFeatureContainer_Client
            params={params}
            featureId={selectedTabFeatureId}
            pageFullDataList={pageFullDataList}
            containerFullData={selectedTabData}
            isEdit={isEdit}
            staticTexts={staticTexts}
            buttonText={staticTexts.addItemToTab ?? "N/A"}
            pageId={pageId}
          />
        ) : null}
      </div>
    </ItemContainerAddChildFeatureDeleteFeature>
  );
};
