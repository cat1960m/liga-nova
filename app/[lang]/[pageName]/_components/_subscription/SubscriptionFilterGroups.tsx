"use client";

import { StaticTexts } from "@/app/dictionaries/definitions";
import { FullData, MainParams } from "@/app/lib/definitions";
import {
  SUBSCRIPTIONS_FILTER,
  SUBSCRIPTIONS_FILTER_GROUP,
  SUBSCRIPTIONS_FILTER_GROUP_TITLE,
} from "@/app/lib/constants";
import { FilterGroups } from "../FilterGroups";

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

export const SubscriptionFilterGroups = (props: Props) => {
  return (
    <FilterGroups
      {...props}
      titleTextType={SUBSCRIPTIONS_FILTER_GROUP_TITLE}
      itemTextType={SUBSCRIPTIONS_FILTER}
      subtype={SUBSCRIPTIONS_FILTER_GROUP}
    />
  );
};
