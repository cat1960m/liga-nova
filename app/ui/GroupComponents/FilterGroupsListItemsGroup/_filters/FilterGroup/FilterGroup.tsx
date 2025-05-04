"use client";

import { FullData, MainParams } from "@/app/lib/definitions";
import { useState } from "react";
import { FILTER, FILTER_GROUP_TITLE } from "@/app/lib/constants";
import { ItemContainerAddTextDescriptionDeleteFeature } from "@/app/ui/CommonComponents/_itemGroupContainer/ItemContainerAddTextDescriptionDeleteFeature";
import { ShowTitle } from "./ShowTitle/ShowTitle";
import { ShowFilter } from "./ShowFilter/ShowFilter";
import styles from "./filterGroup.module.css";
import cn from "clsx";
import { StaticTexts } from "@/app/dictionaries/definitions";

export type Props = {
  filterGroupData: FullData[];
  onFilterSelectionChanged: (data: {
    filter: FullData;
    value: boolean;
  }) => void;
  selectedFilterTextDescriptionIds: number[];
  parentFeatureId: number | null;
  isEdit: boolean;
  lang: string;
  staticTexts: StaticTexts;
};

export const FilterGroup = ({
  filterGroupData,
  onFilterSelectionChanged,
  selectedFilterTextDescriptionIds,
  parentFeatureId,
  isEdit,
  lang,
  staticTexts
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

  return (
    <ItemContainerAddTextDescriptionDeleteFeature
      isEdit={isEdit}
      deleteButtonText={staticTexts.delete ?? "N/A"}
      featureData={filterGroupData}
      addButtonText={staticTexts.addGroupItem ?? "N/A"}
      textDescriptionType={FILTER}
      isChangeOrderHorizontal={false}
      marginTop={0}
      noDelete={false}
    >
      <div className={cn(styles.container, { [styles.edit]: isEdit })}>
        {titleData ? (
          <ShowTitle
            titleData={titleData}
            isEdit={isEdit}
            staticTexts={staticTexts}
            lang={lang}
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
                  isEdit={isEdit}
                  staticTexts={staticTexts}
                  lang={lang}
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
