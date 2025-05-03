"use client";

import { FullData, MainParams } from "@/app/lib/definitions";
import { getIsEditNoDelete } from "@/app/lib/utils";
import { CommonButton } from "@/app/ui/CommonComponents/_buttons/CommonButton";
import { ItemContainerUpdateTextDescriptionDeleteFeature } from "@/app/ui/CommonComponents/_itemGroupContainer/ItemContainerUpdateTextDescriptionDeleteFeature";

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
  const { staticTexts, lang } = params;
  const { isEdit, noDelete } = getIsEditNoDelete(params);

  return (
    <ItemContainerUpdateTextDescriptionDeleteFeature
      currentData={tabTitle}
      useItems={{
        text: "simple",
      }}
      isEdit={isEdit}
      staticTexts={staticTexts}
      lang={lang}
      featureData={[tabTitle]}
      isChangeOrderHorizontal
      noDelete={isTabSelected || noDelete}
      marginTop={0}
    >
      <CommonButton
        text={tabTitle.text_content ?? "N/A"}
        onClick={handleTabClick}
        styleValue={{
          borderRadius: 10,
          minWidth: isEdit ? 200 : undefined,
          color,
          backgroundColor: backgroundColor,
        }}
      />
    </ItemContainerUpdateTextDescriptionDeleteFeature>
  );
};
