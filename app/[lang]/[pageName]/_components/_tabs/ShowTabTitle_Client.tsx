"use client";

import { FullData, MainParams } from "@/app/lib/definitions";
import { CommonButton } from "../__commonComponents/_buttons/CommonButton";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { ItemContainerUpdateTextDescriptionDeleteFeature } from "../__commonComponents/_itemGroupContainer/ItemContainerUpdateTextDescriptionDeleteFeature";

export type Props = {
  tabTitle: FullData;
  selectedTabFeatureId: number | null;
  onSelectedTabFeatureIdChanged: (num: number) => void;
  isEdit: boolean;
  staticTexts: StaticTexts;
  params: MainParams;
};

export const ShowTabTitle_Client = ({
  tabTitle,
  selectedTabFeatureId,
  onSelectedTabFeatureIdChanged,
  isEdit,
  staticTexts,
  params,
}: Props) => {
  const isTabSelected = selectedTabFeatureId === tabTitle.id;

  const handleTabClick = () => {
    onSelectedTabFeatureIdChanged(tabTitle.id);
  };

  const backgroundColor = isTabSelected ? "lightblue" : "lightgray";

  return (
    <ItemContainerUpdateTextDescriptionDeleteFeature
      isEdit={isEdit}
      currentData={tabTitle}
      staticTexts={staticTexts}
      useItems={{
        text: "simple",
      }}
      params={params}
      featureData={[tabTitle]}
      isChangeOrderHorizontal
      noDelete={isTabSelected}
    >
      <CommonButton
        backgroundColor={backgroundColor}
        text={tabTitle.text_content ?? "N/A"}
        onClick={handleTabClick}
        minWidth={isEdit ? 200 : undefined}
      />
    </ItemContainerUpdateTextDescriptionDeleteFeature>
  );
};
