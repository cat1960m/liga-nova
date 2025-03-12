"use client";

import { StaticTexts } from "@/app/dictionaries/definitions";
import { FullData, MainParams } from "@/app/lib/definitions";
import { FilterGroups } from "../FilterGroups";
import {
  TRAINERS_FILTER,
  TRAINERS_FILTER_GROUP,
  TRAINERS_FILTER_GROUP_TITLE,
} from "@/app/lib/constants";

export type Props = {
  isEdit: boolean;
  staticTexts: StaticTexts;
  pageFullDataList: FullData[];
  params: MainParams;
  onFilterSelectionChanged: (data: {
    filter: FullData;
    value: boolean;
  }) => void;
  selectedFilterTextDescriptionIds: number[];
  parentFeatureId: number;
};

export const TrainerFilterGroups = (props: Props) => {
  return (
    <FilterGroups
      {...props}
      titleTextType={TRAINERS_FILTER_GROUP_TITLE}
      itemTextType={TRAINERS_FILTER}
      subtype={TRAINERS_FILTER_GROUP}
    />
  );
};
