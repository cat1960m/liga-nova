"use client";

import { addChildFeature } from "@/app/lib/actions_fitness";
import {
  FILTER,
  FILTER_GROUP_SUBTYPE,
  FILTER_GROUP_TITLE,
  GROUP,
  INFO_CHECK_GROUP_SUBTYPE,
  INFO_GROUP_SUBTYPE,
  IMAGE_GROUP_SUBTYPE,
  INFO_ADDRESS,
  INFO_BODY,
  INFO_TELEPHONE,
  INFO_TITLE,
  SCHEDULE_GROUP_SUBTYPE,
  SCHEDULE_ITEM1,
  SCHEDULE_ITEM2,
  SCHEDULE_ITEM3,
  SCHEDULE_ITEM4,
  SCHEDULE_ITEM5,
  SCHEDULE_ITEM6,
  SERVICE_ITEM,
  SERVICES_GROUP_SUBTYPE,
  SIMPLE_GROUP_ITEM,
  TAB,
  TAB_TITLE,
  TABS,
  ADDITIONAL_PAGE_DATA_GROUP_SUBTYPE,
  FILTER_GROUPS_LIST_ITEMS_SUBTYPE,
  PAGE_NAMES_TO_LIST_ITEMS_DATA,
  IMAGE,
  IMAGE_LIST_GROUP_SUBTYPE,
  ACTION_BANNER_GROUP_SUBTYPE,
  ACTION_BANNER_IMAGE,
  ACTION_BANNER_TITLE,
  LIGA_GROUP_SUBTYPE,
  LIGA_TITLE,
  LIGA_TELEPHONE,
  LIGA_ADDRESS,
  PHOTO_GALLERY_GROUP_SUBTYPE,
  LAYOUT_PARENT,
  LAYOUT_ITEM_LEFT,
  LAYOUT_ITEM,
  LAYOUT_ITEM_RIGHT,
  CALENDAR_EVENTS_GROUP_SUBTYPE,
  GroupFeatureSubtypes,
  GROUP_EXPANDED_SUBTYPE,
  SIMPLE_GROUP_SUBTYPES,
  INFO_CHECK_HEADER,
  INFO_CHECK_ITEM,
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
    const data = [...GroupFeatureSubtypes, TABS, LAYOUT_PARENT];

    if (!!PAGE_NAMES_TO_LIST_ITEMS_DATA[params.pageName]) {
      data.push(FILTER_GROUPS_LIST_ITEMS_SUBTYPE);
    }

    return data;
  }, []);

  const handleChange: ChangeEventHandler<HTMLSelectElement> = async (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);

    if (!parentFeatureId) {
      return;
    }

    if (SIMPLE_GROUP_SUBTYPES.includes(newValue)) {
      await addChildFeature({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        name: params.pageName,
        text_types: [SIMPLE_GROUP_ITEM],
        pathName,
      });
    }

    if (newValue === INFO_GROUP_SUBTYPE) {
      await addChildFeature({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        name: params.pageName,
        text_types: [INFO_TITLE, INFO_TELEPHONE, INFO_ADDRESS, INFO_BODY],
        pathName,
      });
    }
    if (newValue === IMAGE_GROUP_SUBTYPE) {
      await addChildFeature({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        name: params.pageName,
        text_types: [IMAGE],
        pathName,
      });
    }

    if (newValue === LIGA_GROUP_SUBTYPE) {
      await addChildFeature({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        name: params.pageName,
        text_types: [LIGA_TITLE, LIGA_TELEPHONE, LIGA_ADDRESS],
        pathName,
      });
    }

    if (newValue === IMAGE_LIST_GROUP_SUBTYPE) {
      await addChildFeature({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        name: params.pageName,
        text_types: [],
        pathName,
      });
    }

    if (newValue === PHOTO_GALLERY_GROUP_SUBTYPE) {
      await addChildFeature({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        name: params.pageName,
        text_types: [],
        pathName,
      });
    }

    if (newValue === ACTION_BANNER_GROUP_SUBTYPE) {
      await addChildFeature({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        name: params.pageName,
        text_types: [ACTION_BANNER_TITLE, ACTION_BANNER_IMAGE],
        pathName,
      });
    }

    if (newValue === INFO_CHECK_GROUP_SUBTYPE) {
      await addChildFeature({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        name: params.pageName,
        text_types: [INFO_CHECK_HEADER, INFO_CHECK_ITEM],
        pathName,
      });
    }

    if (newValue === SERVICES_GROUP_SUBTYPE) {
      await addChildFeature({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        name: params.pageName,
        text_types: [SERVICE_ITEM],
        pathName,
      });
    }

    if (newValue === SCHEDULE_GROUP_SUBTYPE) {
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

    if (newValue === ADDITIONAL_PAGE_DATA_GROUP_SUBTYPE) {
      await addChildFeature({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        name: params.pageName,
        text_types: [],
        pathName,
      });
    }

    if (newValue === FILTER_GROUPS_LIST_ITEMS_SUBTYPE) {
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
          subtype: FILTER_GROUP_SUBTYPE,
          name: params.pageName,
          text_types: [FILTER_GROUP_TITLE, FILTER],
          pathName,
        });
      }
    }

    if (newValue === CALENDAR_EVENTS_GROUP_SUBTYPE) {
      await addChildFeature({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: CALENDAR_EVENTS_GROUP_SUBTYPE,
        name: params.pageName,
        text_types: [],
        pathName,
      });
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
