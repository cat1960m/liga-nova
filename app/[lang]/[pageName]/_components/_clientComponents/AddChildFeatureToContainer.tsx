"use client";

import { addChildFeature } from "@/app/lib/actions_fitness";
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
  SERVICE_ITEM,
  SERVICES,
  SIMPLE_GROUP_ITEM,
  TAB,
  TAB_TITLE,
  TABS,
} from "@/app/lib/constants";
import { usePathname } from "next/navigation";
import { ChangeEventHandler, useMemo, useState } from "react";

export const AddChildFeatureToContainer = ({
  parentFeatureId,
}: {
  parentFeatureId: number | undefined;
}) => {
  const pathName = usePathname();
  const [selectedValue, setSelectedValue] = useState<string>("");

  const options = useMemo(() => {
    return [...FeatureTypes.GROUP, TABS];
  }, []);

  const handleChange: ChangeEventHandler<HTMLSelectElement> = async (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);

    if (!parentFeatureId) {
      return;
    }

    if (newValue === GROUP1 || newValue === GROUP2) {
      await addChildFeature({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        name: "",
        text_types: [SIMPLE_GROUP_ITEM],
        pathName,
      });
    }

    if (newValue === GROUP_2COLUMNS_2HEADERS) {
      await addChildFeature({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        name: "",
        text_types: [HEADER1, HEADER2, ITEM_COLUMN1, ITEM_COLUMN2],
        pathName,
      });
    }

    if (newValue === SERVICES) {
      await addChildFeature({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        name: "",
        text_types: [SERVICE_ITEM],
        pathName,
      });
    }

    if (newValue === TABS) {
      const tabsFeatureId = await addChildFeature({
        parentId: parentFeatureId,
        type: TABS,
        subtype: TABS,
        name: "",
        text_types: [],
        pathName,
      });

      if (tabsFeatureId) {
        await addChildFeature({
          parentId: tabsFeatureId,
          type: TAB,
          subtype: "1",
          name: "",
          text_types: [TAB_TITLE],
          pathName,
        });
      }
    }
    setSelectedValue("");
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
      <select value={selectedValue} onChange={handleChange}>
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
