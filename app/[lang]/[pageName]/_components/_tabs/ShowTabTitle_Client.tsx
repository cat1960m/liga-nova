"use client";

import { FullData, MainParams } from "@/app/lib/definitions";
import { CommonButton } from "../__commonComponents/_buttons/CommonButton";
import { ItemContainerUpdateTextDescriptionDeleteFeature } from "../__commonComponents/_itemGroupContainer/ItemContainerUpdateTextDescriptionDeleteFeature";

export type Props = {
  tabTitle: FullData;
  selectedTabFeatureId: number | null;
  onSelectedTabFeatureIdChanged: (num: number) => void;
  params: MainParams;
};

export const ShowTabTitle_Client = ({
  tabTitle,
  selectedTabFeatureId,
  onSelectedTabFeatureIdChanged,
  params,
}: Props) => {
  const isTabSelected = selectedTabFeatureId === tabTitle.id;

  const handleTabClick = () => {
    onSelectedTabFeatureIdChanged(tabTitle.id);
  };

  const backgroundColor = isTabSelected ? "#bfbfef" : "lightgray";
  const color = isTabSelected ? "blue" : "gray";
  const { isEdit } = params;

  return (
    <ItemContainerUpdateTextDescriptionDeleteFeature
      currentData={tabTitle}
      useItems={{
        text: "simple",
      }}
      params={params}
      featureData={[tabTitle]}
      isChangeOrderHorizontal
      noDelete={isTabSelected}
      marginTop={0}
    >
      <CommonButton
        backgroundColor={backgroundColor}
        text={tabTitle.text_content ?? "N/A"}
        onClick={handleTabClick}
        styleValue={{
          borderRadius: 10,
          minWidth: isEdit ? 200 : undefined,
          color,
        }}
      />
    </ItemContainerUpdateTextDescriptionDeleteFeature>
  );
};
