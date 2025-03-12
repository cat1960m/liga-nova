"use client";

import { addChildFeature } from "@/app/lib/actions_fitness";
import {
  FeatureTypes,
  SUBSCRIPTIONS_FILTER,
  SUBSCRIPTIONS_FILTER_GROUP,
  SUBSCRIPTIONS_FILTER_GROUP_TITLE,
  GROUP,
  GROUP1,
  GROUP2,
  GROUP_2COLUMNS_2HEADERS,
  HEADER1,
  HEADER2,
  INFO,
  INFO_ADDRESS,
  INFO_BODY,
  INFO_TELEPHONE,
  INFO_TITLE,
  ITEM_COLUMN1,
  ITEM_COLUMN2,
  SCHEDULE,
  SCHEDULE_ITEM1,
  SCHEDULE_ITEM2,
  SCHEDULE_ITEM3,
  SCHEDULE_ITEM4,
  SCHEDULE_ITEM5,
  SCHEDULE_ITEM6,
  SERVICE_ITEM,
  SERVICES,
  SIMPLE_GROUP_ITEM,
  SUBSCRIPTIONS,
  TAB,
  TAB_TITLE,
  TABS,
  PAGE_SUBSCRIPTIONS,
  TRAINERS,
  TRAINERS_FILTER_GROUP,
  TRAINERS_FILTER_GROUP_TITLE,
  TRAINERS_FILTER,
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
        name: params.pageName,
        text_types: [SIMPLE_GROUP_ITEM],
        pathName,
      });
    }

    if (newValue === INFO) {
      await addChildFeature({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        name: params.pageName,
        text_types: [INFO_TITLE, INFO_TELEPHONE, INFO_ADDRESS, INFO_BODY],
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

    if (newValue === SERVICES) {
      await addChildFeature({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        name: params.pageName,
        text_types: [SERVICE_ITEM],
        pathName,
      });
    }

    if (newValue === SCHEDULE) {
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

    if (newValue === SUBSCRIPTIONS) {
      const subscriptionsId = await addChildFeature({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        name: params.pageName,
        text_types: [],
        pathName,
      });

      if (subscriptionsId) {
        await addChildFeature({
          parentId: subscriptionsId,
          type: GROUP,
          subtype: SUBSCRIPTIONS_FILTER_GROUP,
          name: params.pageName,
          text_types: [SUBSCRIPTIONS_FILTER_GROUP_TITLE, SUBSCRIPTIONS_FILTER],
          pathName,
        });
      }
    }

    if (newValue === PAGE_SUBSCRIPTIONS) {
      await addChildFeature({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        name: params.pageName,
        text_types: [],
        pathName,
      });
    }

    if (newValue === TRAINERS) {
      const trainersId = await addChildFeature({
        parentId: parentFeatureId,
        type: GROUP,
        subtype: newValue,
        name: params.pageName,
        text_types: [],
        pathName,
      });

      if (trainersId) {
        await addChildFeature({
          parentId: trainersId,
          type: GROUP,
          subtype: TRAINERS_FILTER_GROUP,
          name: params.pageName,
          text_types: [TRAINERS_FILTER_GROUP_TITLE, TRAINERS_FILTER],
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
