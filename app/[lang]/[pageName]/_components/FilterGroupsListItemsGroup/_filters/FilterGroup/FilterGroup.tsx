"use client";

import { FullData, MainParams } from "@/app/lib/definitions";
import { useState } from "react";
import { FILTER, FILTER_GROUP_TITLE } from "@/app/lib/constants";
import { ItemContainerAddTextDescriptionDeleteFeature } from "../../../__commonComponents/_itemGroupContainer/ItemContainerAddTextDescriptionDeleteFeature";
import { ShowTitle } from "./ShowTitle";
import { ShowFilter } from "./ShowFilter";
import styles from "./filterGroup.module.css";
import cn from "clsx";

export type Props = {
  filterGroupData: FullData[];
  onFilterSelectionChanged: (data: {
    filter: FullData;
    value: boolean;
  }) => void;
  selectedFilterTextDescriptionIds: number[];
  parentFeatureId: number | null;
  params: MainParams;
};

export const FilterGroup = ({
  filterGroupData,
  onFilterSelectionChanged,
  selectedFilterTextDescriptionIds,
  parentFeatureId,
  params,
}: Props) => {
  const featureId = filterGroupData[0]?.id;
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  if (!featureId) {
    return null;
  }

  const titleData = filterGroupData.find(
    (item) => item.text_type === FILTER_GROUP_TITLE
  );

  const filters = filterGroupData.filter((item) => item.text_type === FILTER);

  const { staticTexts, isEdit } = params;

  return (
    <ItemContainerAddTextDescriptionDeleteFeature
      isEdit={isEdit}
      deleteButtonText={staticTexts.delete ?? "N/A"}
      featureData={filterGroupData}
      addButtonText={staticTexts.addGroupItem ?? "N/A"}
      textDescriptionType={FILTER}
      isChangeOrderHorizontal={false}
      marginTop={0}
    >
      <div className={cn(styles.container, { [styles.edit]: isEdit })}>
        {titleData ? (
          <ShowTitle
            titleData={titleData}
            params={params}
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
          />
        ) : null}

        {isExpanded || isEdit
          ? filters.map((filter) => {
              const textDescriptionId = filter.text_description_id;
              const inputValue =
                !!selectedFilterTextDescriptionIds?.includes(textDescriptionId);

              return (
                <ShowFilter
                  key={filter.text_description_id}
                  filter={filter}
                  params={params}
                  inputValue={inputValue}
                  onFilterSelectionChanged={onFilterSelectionChanged}
                />
              );
            })
          : null}
      </div>
    </ItemContainerAddTextDescriptionDeleteFeature>
  );
};
