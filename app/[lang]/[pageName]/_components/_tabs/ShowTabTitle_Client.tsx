"use client";

import { FullData, MainParams } from "@/app/lib/definitions";
import { CommonButton } from "../__commonComponents/_buttons/CommonButton";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { UpdateTextDescriptionData } from "../__commonComponents/_upadeModal/UpdateTextDescriptionData";
import { DeleteFeatureButton } from "../__commonComponents/_buttons/DeleteFeatureButton";

export type Props = {
  tabTitle: FullData;
  selectedTabFeatureId: number | null;
  onSelectedTabFeatureIdChanged: (num: number) => void;
  isEdit: boolean;
  staticTexts: StaticTexts;
  parentFeatureId: number;
  isEditTabShown: boolean;
  onShowTabClick: () => void;
  params: MainParams;
};

export const ShowTabTitle_Client = ({
  tabTitle,
  selectedTabFeatureId,
  onSelectedTabFeatureIdChanged,
  isEdit,
  staticTexts,
  parentFeatureId,
  isEditTabShown,
  onShowTabClick,
  params,
}: Props) => {
  const isTabSelected = selectedTabFeatureId === tabTitle.id;

  const handleTabClick = () => {
    onSelectedTabFeatureIdChanged(tabTitle.id);
  };

  const backgroundColor = isTabSelected ? "lightblue" : "lightgray";
  const buttonText = isEditTabShown ? staticTexts.hideTAB : staticTexts.showTAB;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        border: isEdit ? "1px dotted magenta" : undefined,
        padding: isEdit ? "5px" : undefined,
        gap: "10px",
      }}
    >
      <CommonButton
        backgroundColor={backgroundColor}
        text={tabTitle.text_content ?? "N/A"}
        onClick={handleTabClick}
      />

      {isEdit ? (
        <div style={{ display: "flex", gap: "20px" }}>
          <UpdateTextDescriptionData
            currentData={tabTitle}
            staticTexts={staticTexts}
            useItems={{
              text: "simple",
            }}
            params={params}
          />

          {!isTabSelected ? (
            <DeleteFeatureButton
              featureId={tabTitle.id}
              deleteText={staticTexts.deleteTab ?? "N/A"}
              key={2}
              featureData={[tabTitle]}
              parentFeatureId={parentFeatureId}
              isHorizontal
            />
          ) : (
            <CommonButton text={buttonText} onClick={onShowTabClick} />
          )}
        </div>
      ) : null}
    </div>
  );
};
