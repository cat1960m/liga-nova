"use client";

import { addFeatureGroup } from "@/app/lib/actions_fitness";
import {
  FeatureTypes,
  GROUP,
  GROUP1,
  GROUP2,
  GROUP_2COLUMNS_2HEADERS,
  HEADER1,
  HEADER2,
  ITEM_COLUMN1,
  ITEM_COLUMN2,
  SIMPLE_GROUP_ITEM,
} from "@/app/lib/constants";
import { usePathname } from "next/navigation";
import { ChangeEventHandler, useMemo, useState } from "react";

export const AddChildFeatureToPage = ({
  pageId,
  lang,
}: {
  pageId: number | undefined;
  lang: string;
}) => {
  const pathName = usePathname();

  const options = useMemo(() => {
    return [...FeatureTypes.GROUP, ...FeatureTypes.tabs];
  }, []);

  const handleChange: ChangeEventHandler<HTMLSelectElement> = async (event) => {
    const newValue = event.target.value;

    if (!pageId) {
      return;
    }

    if (newValue === GROUP1 || newValue === GROUP2) {
      await addFeatureGroup({
        parentId: pageId,
        type: GROUP,
        subtype: newValue,
        name: "",
        text_types: [SIMPLE_GROUP_ITEM],
        pathName,
      });
    }

    if (newValue === GROUP_2COLUMNS_2HEADERS) {
      await addFeatureGroup({
        parentId: pageId,
        type: GROUP,
        subtype: newValue,
        name: "",
        text_types: [HEADER1, HEADER2, ITEM_COLUMN1, ITEM_COLUMN2],
        pathName,
      });
    }
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        border: "1px solid lightgray",
      }}
    >
      <select defaultValue="" onChange={handleChange}>
        <option value="" disabled>
          Add an item
        </option>
        {options.map((option, index) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
