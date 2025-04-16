"use client";

import { FullData, MainParams } from "@/app/lib/definitions";
import { useEffect, useState } from "react";
import { ShowTabTitle_Client } from "./ShowTabTitle_Client";
import { DrawFeatureContainer_Client } from "../DrawFeatureContainer_Client";
import { getContainerData } from "@/app/lib/utils";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { AddChildFeatureButton } from "../__commonComponents/_buttons/AddChildFeatureButton";
import { DeleteFeatureButton } from "../__commonComponents/_buttons/DeleteFeatureButton";
import { TAB, TAB_TITLE } from "@/app/lib/constants";

export type Props = {
  tabsData: FullData;
  pageFullDataList: FullData[];
  params: MainParams;
  isEdit: boolean;
  staticTexts: StaticTexts;
  parentFeatureId: number;
  pageId: number;
};

export const ShowTabs_Client = ({
  pageFullDataList,
  tabsData,
  params,
  isEdit,
  staticTexts,
  parentFeatureId,
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

  const [isEditTabShown, setIsEditTabShown] = useState(false);

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

  const isTabShown = !isEdit || isEditTabShown;

  return (
    <div
      style={
        isEdit
          ? {
              border: "4px dashed magenta",
              padding: "5px",
              margin: "20px 0 20px 0",
            }
          : undefined
      }
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
                  parentFeatureId={tabsData.id}
                  isEditTabShown={isEditTabShown}
                  onShowTabClick={() => setIsEditTabShown(!isEditTabShown)}
                  params={params}
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
              <AddChildFeatureButton
                parentFeatureId={tabsData.id}
                text={staticTexts.addTab ?? "N/A"}
                params={params}
                textTypes={[TAB_TITLE]}
                type={TAB}
                subtype="1"
              />
              <DeleteFeatureButton
                featureId={tabsData.id}
                deleteText={staticTexts.deleteTabs ?? "N/A"}
                featureData={[tabsData]}
                parentFeatureId={parentFeatureId}
              />
            </div>
          </div>
        ) : null}

        {selectedTabData && selectedTabFeatureId && isTabShown ? (
          <div
            style={{
              border: isEdit ? "1px dashed magenta" : undefined,
              padding: isEdit ? "5px" : undefined,
            }}
          >
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
          </div>
        ) : null}
      </div>
    </div>
  );
};
