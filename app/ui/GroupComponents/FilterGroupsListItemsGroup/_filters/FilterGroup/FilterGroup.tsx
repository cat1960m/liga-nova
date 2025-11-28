"use client";

import { FilterGroupEditMode, FullData } from "@/app/lib/definitions";
import { useState } from "react";
import { FILTER, FILTER_GROUP_TITLE } from "@/app/lib/constants";
import { ShowTitle } from "./ShowTitle/ShowTitle";
import { ShowFilter } from "./ShowFilter/ShowFilter";
import styles from "./filterGroup.module.css";
import cn from "clsx";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { ItemGroupContainerCommon } from "@/app/ui/CommonComponents/_itemGroupContainer/ItemGroupContainerCommon/ItemGroupContainerCommon";
import { AddTextDescriptionButton } from "@/app/ui/CommonComponents/_buttons/AddTextDescriptionButton";

export type Props = {
  filterGroupData: FullData[];
  onFilterSelectionChanged: (data: {
    filter: FullData;
    value: boolean;
  }) => void;
  selectedFilterTextDescriptionIds: number[];
  editMode: FilterGroupEditMode;
  lang: string;
  staticTexts: StaticTexts;
  startNotExpanded?: boolean;
};

export const FilterGroup = ({
  filterGroupData,
  onFilterSelectionChanged,
  selectedFilterTextDescriptionIds,
  editMode,
  lang,
  staticTexts,
  startNotExpanded,
}: Props) => {
  const featureFilerGroupId = filterGroupData[0]?.id;
  const [isExpanded, setIsExpanded] = useState<boolean>(
    startNotExpanded ? false : true
  );

  if (!featureFilerGroupId) {
    return null;
  }

  const titleData = filterGroupData.find(
    (item) => item.text_type === FILTER_GROUP_TITLE
  );

  const filters = filterGroupData.filter((item) => item.text_type === FILTER);

  const isGroupItemEdit = editMode === "groupItems";

  const getEditButtons = () => {
    return (
      <div className={styles.buttons}>
        {
          <AddTextDescriptionButton
            featureId={featureFilerGroupId}
            textType={FILTER}
            buttonText={staticTexts.addNewFilter ?? ""}
            price={null}
          />
        }
      </div>
    );
  };

  return (
    <div
      className={cn(styles.container, {
        [styles.edit]: editMode === "groupItems",
      })}
    >
      {titleData ? (
        <ShowTitle
          titleData={titleData}
          isEdit={isGroupItemEdit}
          staticTexts={staticTexts}
          lang={lang}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
        />
      ) : null}

      {isExpanded || isGroupItemEdit ? (
        <div
          className={cn(styles.base, {
            [styles.edit]: editMode === "groupItems",
            [styles.group]: editMode === "groupItems",
          })}
        >
          <ItemGroupContainerCommon
            showGroupButtons={editMode === "groupItems"}
            getEditButtons={getEditButtons}
            marginTop={0}
            heightValue="100%"
          >
            {filters.map((filter, index) => {
              const textDescriptionId = filter.text_description_id;
              const inputValue =
                !!selectedFilterTextDescriptionIds?.includes(textDescriptionId);

              return (
                <ShowFilter
                  key={filter.text_description_id}
                  filter={filter}
                  isEdit={isGroupItemEdit}
                  staticTexts={staticTexts}
                  lang={lang}
                  inputValue={inputValue}
                  onFilterSelectionChanged={onFilterSelectionChanged}
                  countIndex={{ count: filters.length, index }}
                />
              );
            })}
          </ItemGroupContainerCommon>
        </div>
      ) : null}
    </div>
  );
};
