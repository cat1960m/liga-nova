"use client";

import { NameValueUrl, StaticTexts } from "@/app/dictionaries/definitions";
import { addFeatureData } from "@/app/lib/actionsContainer";
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
import { usePathname } from "next/navigation";
import { ChangeEventHandler, useMemo, useState } from "react";
import styles from "./addChildFeatureToContainer.module.css";
import { SelectNewItem } from "../SelectNewItem/SelectNewItem";

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
  const pathName = usePathname();
  const [selectedValue, setSelectedValue] = useState<string>("");

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

    await addFeatureData({
      parentId: parentFeatureId,
      type: GROUP,
      subtype: ADDITIONAL_PAGE_DATA_GROUP_SUBTYPE,
      name: pageName,
      text_types: [],
      pathName,
      additionalPageName: newValue,
    });

    setOptionsAdditionalPagename([]);
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
        await addFeatureData({
          parentId: parentFeatureId,
          type: GROUP,
          subtype: newValue,
          name: pageName,
          text_types: [],
          pathName,
          additionalPageName: additionalPageNames[0],
        });
      }
    }

    if (
      [ACTION_BANNER_GROUP_SUBTYPE, ACTION_BANNER_TRY_GROUP_SUBTYPE].includes(
        newValue
      )
    ) {
      await addFeatureData({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        name: pageName,
        text_types: [ACTION_BANNER_TITLE_IMAGE],
        pathName,
      });
    }

    if (newValue === ACTION_BANNER_LIST_GROUP_SUBTYPE) {
      const actionBannerListGroupId = await addFeatureData({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        name: pageName,
        text_types: [],
        pathName,
      });

      if (actionBannerListGroupId) {
        await addFeatureData({
          parentId: actionBannerListGroupId,
          type: ACTION_BANNER_LIST_GROUP_ITEM,
          subtype: ACTION_BANNER_LIST_GROUP_ITEM,
          name: pageName,
          text_types: [
            ACTION_BANNER_LIST_SHARE,
            ACTION_BANNER_LIST_TICKET,
            ACTION_BANNER_LIST_DESCRIPTION,
            ACTION_BANNER_LIST_IMAGE,
          ],
          pathName,
        });
      }
    }

    if (newValue === TEXT_LIST_GROUP_SUBTYPE) {
      const textListGroupFeatureId = await addFeatureData({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        name: pageName,
        text_types: [],
        pathName,
      });

      if (textListGroupFeatureId) {
        await addFeatureData({
          parentId: textListGroupFeatureId,
          type: TEXT_LIST_GROUP_ITEM,
          subtype: TEXT_LIST_GROUP_ITEM,
          name: pageName,
          text_types: [TEXT_LIST_NAME, TEXT_LIST_BODY],
          pathName,
        });
      }
    }

    if (newValue === TEXT_HEADER_GROUP_SUBTYPE) {
      await addFeatureData({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        name: pageName,
        text_types: [SIMPLE_GROUP_ITEM],
        pathName,
      });
    }

    if (TEXT_GROUP_SUBTYPES.includes(newValue)) {
      await addFeatureData({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        name: pageName,
        text_types: [SIMPLE_GROUP_ITEM],
        pathName,
      });
    }

    if (newValue === IMAGE_GROUP_SUBTYPE) {
      await addFeatureData({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        name: pageName,
        text_types: [IMAGE],
        pathName,
      });
    }

    if (newValue === LIGA_GROUP_SUBTYPE) {
      await addFeatureData({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        name: pageName,
        text_types: [LIGA_TITLE, LIGA_TELEPHONE, LIGA_ADDRESS],
        pathName,
      });
    }

    if (newValue === IMAGE_LIST_GROUP_SUBTYPE) {
      await addFeatureData({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        name: pageName,
        text_types: [],
        pathName,
      });
    }

    if (IMAGE_LINKS_GROUP_SUBTYPE === newValue) {
      await addFeatureData({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        name: pageName,
        text_types: [IMAGE_LINKS_ITEM],
        pathName,
      });
    }

    if (IMAGE_ACTIONS_GROUP_SUBTYPE === newValue) {
      await addFeatureData({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        name: pageName,
        text_types: [IMAGE_ACTIONS_ITEM],
        pathName,
      });
    }

    if (newValue === PHOTO_GALLERY_GROUP_SUBTYPE) {
      await addFeatureData({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        name: pageName,
        text_types: [],
        pathName,
      });
    }

    if (newValue === INFO_CHECK_GROUP_SUBTYPE) {
      await addFeatureData({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        name: pageName,
        text_types: [INFO_CHECK_HEADER, INFO_CHECK_ITEM],
        pathName,
      });
    }
    if (newValue === INFO_SUBTYPE) {
      await addFeatureData({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        name: pageName,
        text_types: [INFO_TITLE, INFO_BODY, INFO_TELEPHONE, INFO_ADDRESS],
        pathName,
      });
    }
    if (INFO_ACTION_SUBTYPES.includes(newValue)) {
      await addFeatureData({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        name: pageName,
        text_types: [INFO_TITLE, INFO_BODY],
        pathName,
      });
    }

    if (newValue === SERVICES_GROUP_SUBTYPE) {
      await addFeatureData({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        name: pageName,
        text_types: [SERVICE_ITEM],
        pathName,
      });
    }

    if (newValue === SCHEDULE_GROUP_SUBTYPE) {
      await addFeatureData({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        name: pageName,
        text_types: [SCHEDULE_NAME, SCHEDULE_ITEM],
        pathName,
      });
    }

    if (newValue === FILTER_GROUPS_LIST_ITEMS_SUBTYPE) {
      const filterGroupsListItemsId = await addFeatureData({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        name: pageName,
        text_types: [],
        pathName,
      });

      if (filterGroupsListItemsId) {
        await addFeatureData({
          parentId: filterGroupsListItemsId,
          type: GROUP,
          subtype: FILTER_GROUP_SUBTYPE,
          name: pageName,
          text_types: [FILTER_GROUP_TITLE, FILTER],
          pathName,
        });
      }
    }

    if (newValue === CALENDAR_EVENTS_GROUP_SUBTYPE) {
      await addFeatureData({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: CALENDAR_EVENTS_GROUP_SUBTYPE,
        name: pageName,
        text_types: [],
        pathName,
      });
    }

    if (newValue === DIVIDER) {
      await addFeatureData({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: DIVIDER,
        name: pageName,
        text_types: [],
        pathName,
      });
    }

    if (newValue === TABS) {
      const tabsFeatureId = await addFeatureData({
        parentId: parentFeatureId,
        type: TABS,
        subtype: TABS,
        name: pageName,
        text_types: [],
        pathName,
      });

      if (tabsFeatureId) {
        await addFeatureData({
          parentId: tabsFeatureId,
          type: TAB,
          subtype: "1",
          name: pageName,
          text_types: [TAB_TITLE],
          pathName,
        });
      }
    }

    if (newValue === LAYOUT_PARENT) {
      const layoutFeatureId = await addFeatureData({
        parentId: parentFeatureId,
        type: LAYOUT_PARENT,
        subtype: LAYOUT_PARENT,
        name: pageName,
        text_types: [],
        pathName,
      });

      if (layoutFeatureId) {
        await addFeatureData({
          parentId: layoutFeatureId,
          type: LAYOUT_ITEM,
          subtype: LAYOUT_ITEM_LEFT,
          name: pageName,
          text_types: [],
          pathName,
        });

        await addFeatureData({
          parentId: layoutFeatureId,
          type: LAYOUT_ITEM,
          subtype: LAYOUT_ITEM_RIGHT,
          name: pageName,
          text_types: [],
          pathName,
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
