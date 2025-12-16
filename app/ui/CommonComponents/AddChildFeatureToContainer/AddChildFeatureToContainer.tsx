"use client";

import { NameValueUrl, StaticTexts } from "@/app/dictionaries/definitions";
import {
  FILTER,
  FILTER_GROUP_SUBTYPE,
  FILTER_GROUP_TITLE,
  GROUP,
  INFO_CHECK_GROUP_SUBTYPE,
  IMAGE_GROUP_SUBTYPE,
  SCHEDULE_GROUP_SUBTYPE,
  SCHEDULE_NAME,
  SCHEDULE_ITEM,
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
  IMAGE_LINKS_GROUP_SUBTYPE,
  ACTION_BANNER_GROUP_SUBTYPE,
  ACTION_BANNER_TRY_GROUP_SUBTYPE,
  ACTION_BANNER_TITLE_IMAGE,
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
  INFO_CHECK_HEADER,
  INFO_CHECK_ITEM,
  IMAGE_LINKS_ITEM,
  INFO_SUBTYPE,
  INFO_BODY,
  INFO_TITLE,
  INFO_TELEPHONE,
  INFO_ADDRESS,
  INFO_ACTION_SUBTYPES,
  IMAGE_ACTIONS_GROUP_SUBTYPE,
  IMAGE_ACTIONS_ITEM,
  ACTION_BANNER_LIST_GROUP_SUBTYPE,
  ACTION_BANNER_LIST_SHARE,
  ACTION_BANNER_LIST_TICKET,
  ACTION_BANNER_LIST_DESCRIPTION,
  ACTION_BANNER_LIST_IMAGE,
  ACTION_BANNER_LIST_GROUP_ITEM,
  TEXT_LIST_GROUP_SUBTYPE,
  TEXT_LIST_GROUP_ITEM,
  TEXT_LIST_NAME,
  TEXT_LIST_BODY,
  TEXT_GROUP_SUBTYPES,
  TEXT_HEADER_GROUP_SUBTYPE,
  DIVIDER,
} from "@/app/lib/constants";
import { FullData } from "@/app/lib/definitions";
import { ChangeEventHandler, useMemo, useState } from "react";
import styles from "./addChildFeatureToContainer.module.css";
import { SelectNewItem } from "../SelectNewItem/SelectNewItem";
import { useAddFeature } from "../../hooks/useAddFeature";

export const AddChildFeatureToContainer = ({
  parentFeatureId,
  pageFullDataList,
  pageId,
  staticTexts,
  pageName,
}: {
  parentFeatureId: number | undefined;
  text: string;
  pageFullDataList: FullData[];
  pageId: number;
  staticTexts: StaticTexts;
  pageName: string;
}) => {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const { addFeature } = useAddFeature();

  const [optionsAdditionalPagename, setOptionsAdditionalPagename] = useState<
    string[]
  >([]);

  const groupOptions = useMemo(() => {
    const data: NameValueUrl[] = [
      ...GroupFeatureSubtypes,
      { value: TABS, name: "Tabs", url: "/images/tabs.png" },
      { value: LAYOUT_PARENT, name: "Layout", url: "/images/layout.png" },
    ];

    if (!!PAGE_NAMES_TO_LIST_ITEMS_DATA[pageName]) {
      data.push({
        value: FILTER_GROUPS_LIST_ITEMS_SUBTYPE,
        name: "Trainers/ Tickets",
        url: "/images/tickets.png",
      });
    }

    const pageData = pageFullDataList.find((data) => data.id === pageId);
    const additionalPageNames = (pageData?.additional_page_name ?? "").split(
      ","
    );
    if (!!additionalPageNames[0]?.length) {
      data.push({
        value: ADDITIONAL_PAGE_DATA_GROUP_SUBTYPE,
        name: "Additional data",
        url: "/images/trainers.png",
      });
    }

    return data;
  }, [pageFullDataList, pageId, pageName]);

  const handleChangeAdditionalPagename: ChangeEventHandler<
    HTMLSelectElement
  > = async (event) => {
    const newValue = event.target.value;

    if (!parentFeatureId) {
      return;
    }

    await commonAddFeatureData({
      parentId: parentFeatureId,
      type: GROUP,
      subtype: ADDITIONAL_PAGE_DATA_GROUP_SUBTYPE,
      text_types: [],
      additionalPageName: newValue,
    });

    setOptionsAdditionalPagename([]);
  };

  const commonAddFeatureData = async (props: {
    parentId: number;
    type: string;
    subtype: string;
    text_types: string[];
    additionalPageName?: string | null;
  }) => {
    const { parentId, type, subtype, text_types, additionalPageName } = props;
    //can not be added to history first child that is added automatically
    const isWithoutHistory = ![GROUP, LAYOUT_PARENT, TABS].includes(props.type);

    const result = await addFeature({
      type,
      parentId,
      subtype,
      text_types,
      additionalPageName,
      isWithoutHistory,
    });

    return result;
  };

  /*  const handleChange: ChangeEventHandler<HTMLSelectElement> = async (event) => {
    const newValue = event.target.value;
    selectData(newValue);
  } */
  const selectData = async (newValue: string) => {
    setSelectedValue(newValue);

    if (!parentFeatureId) {
      return;
    }

    if (newValue === ADDITIONAL_PAGE_DATA_GROUP_SUBTYPE) {
      const pageData = pageFullDataList.find((data) => data.id === pageId);
      const additionalPageNames = (pageData?.additional_page_name ?? "").split(
        ","
      );

      if (!additionalPageNames.length) {
        return;
      }

      if (additionalPageNames.length > 1) {
        setOptionsAdditionalPagename(additionalPageNames);
      }

      if (additionalPageNames.length === 1) {
        await commonAddFeatureData({
          parentId: parentFeatureId,
          type: GROUP,
          subtype: newValue,
          text_types: [],
          additionalPageName: additionalPageNames[0],
        });
      }
    }

    if (
      [ACTION_BANNER_GROUP_SUBTYPE, ACTION_BANNER_TRY_GROUP_SUBTYPE].includes(
        newValue
      )
    ) {
      await commonAddFeatureData({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        text_types: [ACTION_BANNER_TITLE_IMAGE],
      });
    }

    if (newValue === ACTION_BANNER_LIST_GROUP_SUBTYPE) {
      const actionBannerListGroupId = await commonAddFeatureData({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        text_types: [],
      });

      if (actionBannerListGroupId) {
        await commonAddFeatureData({
          parentId: actionBannerListGroupId,
          type: ACTION_BANNER_LIST_GROUP_ITEM,
          subtype: ACTION_BANNER_LIST_GROUP_ITEM,
          text_types: [
            ACTION_BANNER_LIST_SHARE,
            ACTION_BANNER_LIST_TICKET,
            ACTION_BANNER_LIST_DESCRIPTION,
            ACTION_BANNER_LIST_IMAGE,
          ],
        });
      }
    }

    if (newValue === TEXT_LIST_GROUP_SUBTYPE) {
      const textListGroupFeatureId = await commonAddFeatureData({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        text_types: [],
      });

      if (textListGroupFeatureId) {
        await commonAddFeatureData({
          parentId: textListGroupFeatureId,
          type: TEXT_LIST_GROUP_ITEM,
          subtype: TEXT_LIST_GROUP_ITEM,
          text_types: [TEXT_LIST_NAME, TEXT_LIST_BODY],
        });
      }
    }

    if (newValue === TEXT_HEADER_GROUP_SUBTYPE) {
      await commonAddFeatureData({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        text_types: [SIMPLE_GROUP_ITEM],
      });
    }

    if (TEXT_GROUP_SUBTYPES.includes(newValue)) {
      await commonAddFeatureData({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        text_types: [SIMPLE_GROUP_ITEM],
      });
    }

    if (newValue === IMAGE_GROUP_SUBTYPE) {
      await commonAddFeatureData({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        text_types: [IMAGE],
      });
    }

    if (newValue === LIGA_GROUP_SUBTYPE) {
      await commonAddFeatureData({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        text_types: [LIGA_TITLE, LIGA_TELEPHONE, LIGA_ADDRESS],
      });
    }

    if (newValue === IMAGE_LIST_GROUP_SUBTYPE) {
      await commonAddFeatureData({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        text_types: [],
      });
    }

    if (IMAGE_LINKS_GROUP_SUBTYPE === newValue) {
      await commonAddFeatureData({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        text_types: [IMAGE_LINKS_ITEM],
      });
    }

    if (IMAGE_ACTIONS_GROUP_SUBTYPE === newValue) {
      await commonAddFeatureData({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        text_types: [IMAGE_ACTIONS_ITEM],
      });
    }

    if (newValue === PHOTO_GALLERY_GROUP_SUBTYPE) {
      await commonAddFeatureData({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        text_types: [],
      });
    }

    if (newValue === INFO_CHECK_GROUP_SUBTYPE) {
      await commonAddFeatureData({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        text_types: [INFO_CHECK_HEADER, INFO_CHECK_ITEM],
      });
    }
    if (newValue === INFO_SUBTYPE) {
      await commonAddFeatureData({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        text_types: [INFO_TITLE, INFO_BODY, INFO_TELEPHONE, INFO_ADDRESS],
      });
    }
    if (INFO_ACTION_SUBTYPES.includes(newValue)) {
      await commonAddFeatureData({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        text_types: [INFO_TITLE, INFO_BODY],
      });
    }

    if (newValue === SERVICES_GROUP_SUBTYPE) {
      await commonAddFeatureData({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        text_types: [SERVICE_ITEM],
      });
    }

    if (newValue === SCHEDULE_GROUP_SUBTYPE) {
      await commonAddFeatureData({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        text_types: [SCHEDULE_NAME, SCHEDULE_ITEM],
      });
    }

    if (newValue === FILTER_GROUPS_LIST_ITEMS_SUBTYPE) {
      const filterGroupsListItemsId = await commonAddFeatureData({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        text_types: [],
      });

      if (filterGroupsListItemsId) {
        await commonAddFeatureData({
          parentId: filterGroupsListItemsId,
          type: GROUP,
          subtype: FILTER_GROUP_SUBTYPE,
          text_types: [FILTER_GROUP_TITLE, FILTER],
        });
      }
    }

    if (newValue === CALENDAR_EVENTS_GROUP_SUBTYPE) {
      await commonAddFeatureData({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: CALENDAR_EVENTS_GROUP_SUBTYPE,
        text_types: [],
      });
    }

    if (newValue === DIVIDER) {
      await commonAddFeatureData({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: DIVIDER,
        text_types: [],
      });
    }

    if (newValue === TABS) {
      const tabsFeatureId = await commonAddFeatureData({
        parentId: parentFeatureId,
        type: TABS,
        subtype: TABS,
        text_types: [],
      });

      if (tabsFeatureId) {
        await commonAddFeatureData({
          parentId: tabsFeatureId,
          type: TAB,
          subtype: "1",
          text_types: [TAB_TITLE],
        });
      }
    }

    if (newValue === LAYOUT_PARENT) {
      const layoutFeatureId = await commonAddFeatureData({
        parentId: parentFeatureId,
        type: LAYOUT_PARENT,
        subtype: LAYOUT_PARENT,
        text_types: [],
      });

      if (layoutFeatureId) {
        await commonAddFeatureData({
          parentId: layoutFeatureId,
          type: LAYOUT_ITEM,
          subtype: LAYOUT_ITEM_LEFT,
          text_types: [],
        });

        await commonAddFeatureData({
          parentId: layoutFeatureId,
          type: LAYOUT_ITEM,
          subtype: LAYOUT_ITEM_RIGHT,
          text_types: [],
        });
      }
    }

    setSelectedValue("");
  };

  return (
    <div className={styles.container}>
      {/*  <select
        value={selectedValue}
        onChange={handleChange}
        className={styles.select}
      >
        <option value="" disabled>
          {text}
        </option>
        {groupOptions.map((groupOption) => (
          <option value={groupOption.value} key={groupOption.value}>
            {groupOption.name}
          </option>
        ))}
      </select> */}
      <SelectNewItem groupOptions={groupOptions} onSelect={selectData} />

      {optionsAdditionalPagename.length ? (
        <>
          <select
            value={selectedValue}
            onChange={handleChangeAdditionalPagename}
            className={styles.select}
          >
            <option value="" disabled>
              {staticTexts.selectPageName}
            </option>
            {optionsAdditionalPagename.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
        </>
      ) : null}
    </div>
  );
};
