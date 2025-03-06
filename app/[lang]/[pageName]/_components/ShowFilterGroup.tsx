"use client";

import { StaticTexts } from "@/app/dictionaries/definitions";
import { FullData } from "@/app/lib/definitions";
import { UpdateDeleteText } from "./UpdateDeleteText";
import { AddTextDescriptionButton } from "./_clientComponents/AddTextDescriptionButton";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { DeleteFeatureButton } from "./_clientComponents/DeleteFeatureButton";

export type Props = {
  groupData: FullData[];
  isEdit: boolean;
  staticTexts: StaticTexts;
  titleTextType: string;
  itemTextType: string;
  onFilterSelectionChanged: (data: {
    filter: FullData;
    value: boolean;
  }) => void;
  selectedFilterTextDescriptionIds: number[];
};

export const ShowFilterGroup = ({
  groupData,
  isEdit,
  staticTexts,
  titleTextType,
  itemTextType,
  onFilterSelectionChanged,
  selectedFilterTextDescriptionIds,
}: Props) => {
  const featureId = groupData[0]?.id;
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  if (!featureId) {
    return null;
  }

  const titleData = groupData.find((item) => item.text_type === titleTextType);

  const filters = groupData.filter((item) => item.text_type === itemTextType);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        border: isEdit ? "1px dotted magenta" : undefined,
        padding: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          border: isEdit ? "1px dotted magenta" : undefined,
          padding: "5px",
        }}
      >
        <div
          style={{
            fontWeight: 700,
            fontSize: 16,
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {titleData?.text_content ?? "N/A-----"}
          {isExpanded ? (
            <ChevronUpIcon
              onClick={() => setIsExpanded(false)}
              style={{ width: "24px" }}
            />
          ) : (
            <ChevronDownIcon
              onClick={() => setIsExpanded(true)}
              style={{ width: "24px" }}
            />
          )}
        </div>
        {isEdit ? (
          <UpdateDeleteText staticTexts={staticTexts} currentData={titleData} />
        ) : null}
      </div>

      {isExpanded || isEdit
        ? filters.map((filter) => {
            const textDescriptionId = filter.text_description_id;
            const inputValue =
              !!selectedFilterTextDescriptionIds?.includes(textDescriptionId);
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  border: isEdit ? "1px dotted magenta" : undefined,
                  padding: "5px",
                }}
                key={filter.text_description_id}
              >
                <div
                  style={{ display: "flex", gap: "5px", alignItems: "center" }}
                >
                  <input
                    type="checkbox"
                    disabled={isEdit}
                    checked={inputValue}
                    onChange={(event) => {
                      onFilterSelectionChanged({
                        filter,
                        value: event.target.checked,
                      });
                    }}
                  />
                  <div style={{ fontSize: 14 }}>
                    {filter.text_content ?? "N/A"}
                  </div>
                </div>
                {isEdit ? (
                  <UpdateDeleteText
                    staticTexts={staticTexts}
                    currentData={filter}
                  />
                ) : null}
              </div>
            );
          })
        : null}

      {isEdit ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "5px",
            flexWrap: "wrap",
          }}
        >
          <AddTextDescriptionButton
            featureId={featureId}
            textType={itemTextType}
            buttonText={staticTexts.addGroupItem ?? "N/A"}
            price={null}
          />
          <DeleteFeatureButton
            featureId={featureId}
            deleteText={staticTexts.delete ?? "N/A"}
          />
        </div>
      ) : null}
    </div>
  );
};
