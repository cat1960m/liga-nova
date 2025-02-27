"use client";

import { FullData, MainParams } from "@/app/lib/definitions";
import { useEffect, useState } from "react";
import { ShowTabTitle_Client } from "./ShowTabTitle_Client";
import { DrawFeatureContainer_Client } from "./DrawFeatureContainer_Client";
import { getContainerData } from "@/app/lib/utils";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { AddTabButton } from "./AddTabButton";
import { DeleteFeatureButton } from "./DeleteFeatureButton";

export type Props = {
  tabsData: FullData;
  pageFullDataList: FullData[];
  params: MainParams;
  isEdit: boolean;
  staticTexts: StaticTexts;
};

export const ShowTabs_Client = ({
  pageFullDataList,
  tabsData,
  params,
  isEdit,
  staticTexts,
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

  const [selectedTabData, setSelectedTabData] = useState<Record<
    string,
    FullData[]
  > | null>(null);

  const handleSelectedTabFeatureIdChanged = (featureId: number) => {
    setSelectedTabFeatureId(featureId);
    const tabContainerData = getContainerData({
      pageFullData: pageFullDataList,
      featureId,
    });
    setSelectedTabData(tabContainerData);
  };

  useEffect(() => {
    const tabContainerData = getContainerData({
      pageFullData: pageFullDataList,
      featureId: selectedTabFeatureId ?? tabTitles?.[0].id,
    });

    setSelectedTabData(tabContainerData);
  }, [pageFullDataList]);

  return (
    <div style={isEdit ? { border: "4px dashed magenta" } : undefined}>
      <div
        style={{
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            width: "100%",
            padding: "20px",
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
                  tabIndex={index}
                  pageFullDataList={pageFullDataList}
                />
              </div>
            );
          })}
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
                deleteText={staticTexts.deleteTabs ?? "N/A"}
              />
              <AddTabButton
                tabsFeatureId={tabsData.id}
                text={staticTexts.addTab ?? "N/A"}
                params={params}
              />
            </div>
          </div>
        ) : null}

        {selectedTabData && selectedTabFeatureId && pageFullDataList ? (
          <div
            style={{
              border: isEdit ? "1px dashed magenta" : undefined,
              margin: "10px",
            }}
          >
            <DrawFeatureContainer_Client
              params={params}
              featureId={selectedTabFeatureId}
              pageFullDataList={pageFullDataList}
              containerFullData={selectedTabData}
              isEdit={isEdit}
              staticTexts={staticTexts}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};
