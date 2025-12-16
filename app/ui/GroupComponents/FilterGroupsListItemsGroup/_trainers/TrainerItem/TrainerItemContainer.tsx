"use client";

import { FullData } from "@/app/lib/definitions";
import {
  TRAINER_ITEM_DESCRIPTION,
  TRAINER_ITEM_IS_PREMIUM,
  TRAINER_ITEM_NAME,
  YES,
} from "@/app/lib/constants";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { TrainerItem } from "./TrainerItem";
import { getFilterIds } from "@/app/lib/utils";
import { useFiltersData } from "@/app/ui/hooks/useFiltersData";

export type Props = {
  currentData: FullData[];
  pageFullDataList: FullData[];
  staticTexts: StaticTexts;
  srcPremiumIcon: string;
};

export const TrainerItemContainer = ({
  currentData,
  pageFullDataList,
  staticTexts,
  srcPremiumIcon,
}: Props) => {
  const name = currentData.find((item) => item.text_type === TRAINER_ITEM_NAME);
  const isPremium = currentData.find(
    (item) => item.text_type === TRAINER_ITEM_IS_PREMIUM
  );
  const description =
    currentData.find((item) => item.text_type === TRAINER_ITEM_DESCRIPTION)
      ?.text_content ?? "";

  const {filtersData} = useFiltersData({pageFullDataList, 
    filterTextDescriptionIds: getFilterIds(currentData[0]?.filter_ids)})

  if (!name || !isPremium) {
    return null;
  }

  const isPremiumValue = isPremium.value === YES;

  const photoValue = name.value;
  return (
    <TrainerItem
      currentDataId={currentData[0]?.id ?? 0}
      staticTexts={staticTexts}
      filters={filtersData}
      srcPremiumIcon={srcPremiumIcon}
      isPremiumValue={isPremiumValue}
      srcPhotoValue={photoValue}
      name={name.text_content ?? ""}
      description={description}
    />
  );
};
