"use client";

import { addChildFeature } from "@/app/lib/actions_fitness";
import {
  FeatureTypes,
  FILTER,
  FILTER_GROUP,
  FILTER_GROUP_TITLE,
  GROUP,
  GROUP1,
  GROUP2,
  GROUP_2COLUMNS_2HEADERS,
  HEADER1,
  HEADER2,
  INFO_GROUP,
  INFO_ADDRESS,
  INFO_BODY,
  INFO_TELEPHONE,
  INFO_TITLE,
  ITEM_COLUMN1,
  ITEM_COLUMN2,
  SCHEDULE_GROUP,
  SCHEDULE_ITEM1,
  SCHEDULE_ITEM2,
  SCHEDULE_ITEM3,
  SCHEDULE_ITEM4,
  SCHEDULE_ITEM5,
  SCHEDULE_ITEM6,
  SERVICE_ITEM,
  SERVICES_GROUP,
  SIMPLE_GROUP_ITEM,
  TAB,
  TAB_TITLE,
  TABS,
  ADDITIONAL_PAGE_DATA_GROUP,
  FILTER_GROUPS_LIST_ITEMS,
  PAGE_NAMES_TO_LIST_ITEMS_DATA,
  IMAGE,
  IMAGE_LIST_GROUP,
  ACTION_BANNER_GROUP,
  ACTION_BANNER_IMAGE,
  ACTION_BANNER_TITLE,
  LIGA_GROUP,
  LIGA_TITLE,
  LIGA_TELEPHONE,
  LIGA_ADDRESS,
  PHOTO_GALLERY_GROUP,
  LAYOUT_PARENT,
  LAYOUT_ITEM_LEFT,
  LAYOUT_ITEM,
  LAYOUT_ITEM_RIGHT,
} from "@/app/lib/constants";
import { MainParams } from "@/app/lib/definitions";
import { usePathname } from "next/navigation";
import { ChangeEventHandler, useMemo, useState } from "react";

export const AddChildFeatureToContainer = ({
  parentFeatureId,
  text,
  params,
}: {
  parentFeatureId: number | undefined;
  text: string;
  params: MainParams;
}) => {
  const pathName = usePathname();
  const [selectedValue, setSelectedValue] = useState<string>("");

  const options = useMemo(() => {
    const data = [...FeatureTypes.GROUP, TABS, LAYOUT_PARENT];

    if (!!PAGE_NAMES_TO_LIST_ITEMS_DATA[params.pageName]) {
      data.push(FILTER_GROUPS_LIST_ITEMS);
    }

    return data;
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
        name: params.pageName,
        text_types: [SIMPLE_GROUP_ITEM],
        pathName,
      });
    }

    if (newValue === INFO_GROUP) {
      await addChildFeature({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        name: params.pageName,
        text_types: [
          INFO_TITLE,
          INFO_TELEPHONE,
          INFO_ADDRESS,
          INFO_BODY,
          IMAGE,
        ],
        pathName,
      });
    }

    if (newValue === LIGA_GROUP) {
      await addChildFeature({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        name: params.pageName,
        text_types: [LIGA_TITLE, LIGA_TELEPHONE, LIGA_ADDRESS],
        pathName,
      });
    }

    if (newValue === IMAGE_LIST_GROUP) {
      await addChildFeature({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        name: params.pageName,
        text_types: [],
        pathName,
      });
    }

    if (newValue === PHOTO_GALLERY_GROUP) {
      await addChildFeature({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        name: params.pageName,
        text_types: [],
        pathName,
      });
    }

    if (newValue === ACTION_BANNER_GROUP) {
      await addChildFeature({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        name: params.pageName,
        text_types: [ACTION_BANNER_TITLE, ACTION_BANNER_IMAGE],
        pathName,
      });
    }

    if (newValue === GROUP_2COLUMNS_2HEADERS) {
      await addChildFeature({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        name: params.pageName,
        text_types: [HEADER1, HEADER2, ITEM_COLUMN1, ITEM_COLUMN2],
        pathName,
      });
    }

    if (newValue === SERVICES_GROUP) {
      await addChildFeature({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        name: params.pageName,
        text_types: [SERVICE_ITEM],
        pathName,
      });
    }

    if (newValue === SCHEDULE_GROUP) {
      await addChildFeature({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        name: params.pageName,
        text_types: [
          SCHEDULE_ITEM1,
          SCHEDULE_ITEM2,
          SCHEDULE_ITEM3,
          SCHEDULE_ITEM4,
          SCHEDULE_ITEM5,
          SCHEDULE_ITEM6,
        ],
        pathName,
      });
    }

    if (newValue === ADDITIONAL_PAGE_DATA_GROUP) {
      await addChildFeature({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        name: params.pageName,
        text_types: [],
        pathName,
      });
    }

    if (newValue === FILTER_GROUPS_LIST_ITEMS) {
      const filterGroupsListItemsId = await addChildFeature({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        name: params.pageName,
        text_types: [],
        pathName,
      });

      if (filterGroupsListItemsId) {
        await addChildFeature({
          parentId: filterGroupsListItemsId,
          type: GROUP,
          subtype: FILTER_GROUP,
          name: params.pageName,
          text_types: [FILTER_GROUP_TITLE, FILTER],
          pathName,
        });
      }
    }

    if (newValue === TABS) {
      const tabsFeatureId = await addChildFeature({
        parentId: parentFeatureId,
        type: TABS,
        subtype: TABS,
        name: params.pageName,
        text_types: [],
        pathName,
      });

      if (tabsFeatureId) {
        await addChildFeature({
          parentId: tabsFeatureId,
          type: TAB,
          subtype: "1",
          name: params.pageName,
          text_types: [TAB_TITLE],
          pathName,
        });
      }
    }

    if (newValue === LAYOUT_PARENT) {
      const layoutFeatureId = await addChildFeature({
        parentId: parentFeatureId,
        type: LAYOUT_PARENT,
        subtype: LAYOUT_PARENT,
        name: params.pageName,
        text_types: [],
        pathName,
      });

      if (layoutFeatureId) {
        await addChildFeature({
          parentId: layoutFeatureId,
          type: LAYOUT_ITEM,
          subtype: LAYOUT_ITEM_LEFT,
          name: params.pageName,
          text_types: [],
          pathName,
        });

        await addChildFeature({
          parentId: layoutFeatureId,
          type: LAYOUT_ITEM,
          subtype: LAYOUT_ITEM_RIGHT,
          name: params.pageName,
          text_types: [],
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
        // border: "1px solid lightgray",
      }}
    >
      <select value={selectedValue} onChange={handleChange}>
        <option value="" disabled>
          {text}
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
