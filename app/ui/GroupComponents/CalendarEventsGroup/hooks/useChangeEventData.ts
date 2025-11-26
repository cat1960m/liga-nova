"use client";

import { revalidate } from "@/app/lib/actions_fitness";
import {
  addFeatureData,
  addTextData,
  addTextDescriptionData,
  getTextContentsData,
  updateFeatureSubtypeFilterIdsData,
  updatePriceValueLinkData,
  updateTextData,
} from "@/app/lib/actionsContainer";
import {
  CALENDAR_EVENTS_COUNT,
  CALENDAR_EVENTS_DESCRIPTION,
  CALENDAR_EVENTS_TIME,
  CALENDAR_EVENTS_TITLE,
  CALENDAR_EVENTS_TRAINER,
  CALENDAR_EVENTS_TYPE,
  CONTENT_TYPE_MAIN,
} from "@/app/lib/constants";
import { FullData, TabType } from "@/app/lib/definitions";
import { usePathname } from "next/navigation";

export type SaveArgs = {
  type: string;
  title: TabType[] | null;
  trainer: TabType[] | null;
  description: TabType[] | null;
  count: number;
  price: number;
  time: string;
  confirmedDates: string[];
  pageName: string;
  calendarFeatureId: number;
};

export type UpdateArgs = {
  eventFeatureId: number;
  type: string;
  title: TabType[] | null;
  trainer: TabType[] | null;
  description: TabType[] | null;
  count: number;
  price: number;
  time: string;
  confirmedDates: string[];
  titleInit: FullData;
  countInit: FullData;
  timeInit: FullData;
  trainerInit: FullData;
  descriptionInit: FullData;
};

export const useChangeEventData = () => {
  const pathName = usePathname();

  const saveTabs = async ({
    featureId,
    textType,
    tabs,
    price = null,
    promises,
  }: {
    featureId: number;
    textType: string;
    tabs: TabType[];
    price?: number | null;
    promises: Promise<any>[];
  }) => {
    const newTextDescriptionId = await addTextDescriptionData({
      featureId,
      textType,
      pathName,
      canDelete: false,
      price,
    });

    if (newTextDescriptionId) {
      tabs.forEach((tab) => {
        const tabLang = tab.langUpperCase.toLocaleLowerCase();

        promises.push(
          addTextData({
            textDescriptionId: newTextDescriptionId,
            lang: tabLang,
            text: tab.value,
            contentType: CONTENT_TYPE_MAIN,
          })
        );
      });
    }
  };

  const saveEvent = async ({
    type,
    title,
    trainer,
    description,
    count,
    price,
    time,
    confirmedDates,
    pageName,
    calendarFeatureId,
  }: SaveArgs) => {
    try {
      const calendarEventsGroupFeatureId = await addFeatureData({
        parentId: calendarFeatureId,
        type: CALENDAR_EVENTS_TYPE,
        subtype: type,
        name: pageName,
        text_types: [],
        filter_ids: confirmedDates.join(","),
      });

      if (!calendarEventsGroupFeatureId) {
        return;
      }

      const promises: Promise<any>[] = [];

      promises.push(saveTabs({
        featureId: calendarEventsGroupFeatureId,
        textType: CALENDAR_EVENTS_TITLE,
        tabs: title ?? [],
        price,
        promises,
      }));

      promises.push(saveTabs({
        featureId: calendarEventsGroupFeatureId,
        textType: CALENDAR_EVENTS_TRAINER,
        tabs: trainer ?? [],
        promises,
      }));

      promises.push(saveTabs({
        featureId: calendarEventsGroupFeatureId,
        textType: CALENDAR_EVENTS_DESCRIPTION,
        tabs: description ?? [],
        promises,
      }));

      promises.push(
        addTextDescriptionData({
          featureId: calendarEventsGroupFeatureId,
          textType: CALENDAR_EVENTS_COUNT,
          canDelete: false,
          price: null,
          value: count.toString(),
        })
      );

      promises.push(
        addTextDescriptionData({
          featureId: calendarEventsGroupFeatureId,
          textType: CALENDAR_EVENTS_TIME,
          canDelete: false,
          price: null,
          value: time,
        })
      );

      await Promise.all(promises);

      revalidate(pageName);
    } catch (err) {
      console.log("Error", err);
    }
  };
  const updateEvent = async ({
    type,
    title,
    trainer,
    description,
    count,
    price,
    time,
    confirmedDates,
    titleInit,
    countInit,
    timeInit,
    trainerInit,
    descriptionInit,
    eventFeatureId,
  }: UpdateArgs) => {
    try {
      const promises: Promise<any>[] = [];

      promises.push(
        updateFeatureSubtypeFilterIdsData({
          id: eventFeatureId,
          subtype: type,
          filterIds: confirmedDates.join(","),
        })
      );

      promises.push(
        updatePriceValueLinkData({
          price,
          textDescriptionId: titleInit.text_description_id,
        })
      );

      promises.push(
        updatePriceValueLinkData({
          value: count.toString(),
          textDescriptionId: countInit.text_description_id,
        })
      );

      promises.push(
        updatePriceValueLinkData({
          value: time,
          textDescriptionId: timeInit.text_description_id,
        })
      );

      promises.push(
        updateTabs({
          tabs: title ?? [],
          textDescriptionId: titleInit.text_description_id,
          promises,
        })
      );

      promises.push(
        updateTabs({
          tabs: trainer ?? [],
          textDescriptionId: trainerInit.text_description_id,
          promises,
        })
      );

      promises.push(
        updateTabs({
          tabs: description ?? [],
          textDescriptionId: descriptionInit.text_description_id,
          promises,
        })
      );

      await Promise.all(promises);

      revalidate(pathName);
    } catch (err) {
      console.log("error", err);
    }
  };

  const updateTabs = async ({
    tabs,
    textDescriptionId,
    promises,
  }: {
    tabs: TabType[];
    textDescriptionId: number;
    promises: Promise<any>[];
  }) => {
    const textContents = await getTextContentsData({
      text_description_id: textDescriptionId,
    });

    tabs.forEach((tab) => {
      const tabLang = tab.langUpperCase.toLocaleLowerCase();
      const textContent = textContents?.find(
        ({ language }) => language === tabLang
      );

      if (!textContent) {
        promises.push(
          addTextData({
            text: tab.value,
            textDescriptionId,
            lang: tabLang,
            contentType: CONTENT_TYPE_MAIN,
          })
        );
      } else {
        promises.push(
          updateTextData({
            text: tab.value,
            id: textContent.id,
          })
        );
      }
    });
  };

  return { saveEvent, updateEvent };
};
