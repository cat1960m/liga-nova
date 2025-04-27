"use client";

import { StaticTexts } from "@/app/dictionaries/definitions";
import { addChildFeature } from "@/app/lib/actions_fitness";
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
import { FullData, GroupDefinition, MainParams } from "@/app/lib/definitions";
import { usePathname } from "next/navigation";
import { ChangeEventHandler, useMemo, useState } from "react";

export const AddChildFeatureToContainer = ({
  parentFeatureId,
  text,
  params,
  pageFullDataList,
  pageId,
  staticTexts,
}: {
  parentFeatureId: number | undefined;
  text: string;
  params: MainParams;
  pageFullDataList: FullData[];
  pageId: number;
  staticTexts: StaticTexts;
}) => {
  const pathName = usePathname();
  const [selectedValue, setSelectedValue] = useState<string>("");

  const [optionsAdditionalPagename, setOptionsAdditionalPagename] = useState<
    string[]
  >([]);

  const options = useMemo(() => {
    const data = [...GroupFeatureSubtypes, TABS, LAYOUT_PARENT];

    if (!!PAGE_NAMES_TO_LIST_ITEMS_DATA[params.pageName]) {
      data.push(FILTER_GROUPS_LIST_ITEMS_SUBTYPE);
    }

    const pageData = pageFullDataList.find((data) => data.id === pageId);
    const additionalPageNames = (pageData?.additional_page_name ?? "").split(
      ","
    );
    if (!!additionalPageNames[0]?.length) {
      data.push(ADDITIONAL_PAGE_DATA_GROUP_SUBTYPE);
    }

    return data;
  }, []);

  const handleChangeAdditionalPagename: ChangeEventHandler<
    HTMLSelectElement
  > = async (event) => {
    const newValue = event.target.value;

    if (!parentFeatureId) {
      return;
    }

    await addChildFeature({
      parentId: parentFeatureId,
      type: GROUP,
      subtype: ADDITIONAL_PAGE_DATA_GROUP_SUBTYPE,
      name: params.pageName,
      text_types: [],
      pathName,
      additionalPageName: newValue,
    });

    setOptionsAdditionalPagename([]);
  };

  const handleChange: ChangeEventHandler<HTMLSelectElement> = async (event) => {
    const newValue = event.target.value;
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
        await addChildFeature({
          parentId: parentFeatureId,
          type: GROUP,
          subtype: newValue,
          name: params.pageName,
          text_types: [],
          pathName,
          additionalPageName: additionalPageNames[0],
        });
      }
    }

    if ([ACTION_BANNER_GROUP_SUBTYPE, ACTION_BANNER_TRY_GROUP_SUBTYPE].includes(newValue)) {
      await addChildFeature({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        name: params.pageName,
        text_types: [ACTION_BANNER_TITLE_IMAGE],
        pathName,
      });
    }

    if (newValue === ACTION_BANNER_LIST_GROUP_SUBTYPE) {
      const actionBannerListGroupId = await addChildFeature({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        name: params.pageName,
        text_types: [],
        pathName,
      });

      if (actionBannerListGroupId) {
        await addChildFeature({
          parentId: actionBannerListGroupId,
          type: ACTION_BANNER_LIST_GROUP_ITEM,
          subtype: ACTION_BANNER_LIST_GROUP_ITEM,
          name: params.pageName,
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
      const textListGroupFeatureId = await addChildFeature({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        name: params.pageName,
        text_types: [],
        pathName,
      });

      if (textListGroupFeatureId) {
        await addChildFeature({
          parentId: textListGroupFeatureId,
          type: TEXT_LIST_GROUP_ITEM,
          subtype: TEXT_LIST_GROUP_ITEM,
          name: params.pageName,
          text_types: [TEXT_LIST_NAME, TEXT_LIST_BODY],
          pathName,
        });
      }
    }

    if (newValue === TEXT_HEADER_GROUP_SUBTYPE) {
      await addChildFeature({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        name: params.pageName,
        text_types: [SIMPLE_GROUP_ITEM],
        pathName,
      });
    }

    if (TEXT_GROUP_SUBTYPES.includes(newValue)) {
      await addChildFeature({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        name: params.pageName,
        text_types: [SIMPLE_GROUP_ITEM],
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

    if (IMAGE_LINKS_GROUP_SUBTYPE === newValue) {
      await addChildFeature({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        name: params.pageName,
        text_types: [IMAGE_LINKS_ITEM],
        pathName,
      });
    }

    if (IMAGE_ACTIONS_GROUP_SUBTYPE === newValue) {
      await addChildFeature({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        name: params.pageName,
        text_types: [IMAGE_ACTIONS_ITEM],
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
    if (newValue === INFO_SUBTYPE) {
      await addChildFeature({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        name: params.pageName,
        text_types: [INFO_TITLE, INFO_BODY, INFO_TELEPHONE, INFO_ADDRESS],
        pathName,
      });
    }
    if (INFO_ACTION_SUBTYPES.includes(newValue)) {
      await addChildFeature({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        name: params.pageName,
        text_types: [INFO_TITLE, INFO_BODY],
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
        text_types: [SCHEDULE_NAME, SCHEDULE_ITEM],
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

    if (newValue === DIVIDER) {
      await addChildFeature({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: DIVIDER,
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
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        gap: "20px",
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

      {optionsAdditionalPagename.length ? (
        <select value={selectedValue} onChange={handleChangeAdditionalPagename}>
          <option value="" disabled>
            {staticTexts.selectPageName}
          </option>
          {optionsAdditionalPagename.map((option, index) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
      ) : null}
    </div>
  );
};
