"use client";

import {
  addChildFeature,
  addText,
  addTextDescription,
  getTextContents,
  updateFeatureSubtypeFilterIds,
  updatePriceValueLink,
  updateText,
} from "@/app/lib/actions_fitness";
import {
  CALENDAR_EVENTS_COUNT,
  CALENDAR_EVENTS_DESCRIPTION,
  CALENDAR_EVENTS_TIME,
  CALENDAR_EVENTS_TITLE,
  CALENDAR_EVENTS_TRAINER,
  CALENDAR_EVENTS_TYPE,
} from "@/app/lib/constants";
import { FullData, MainParams, TabType } from "@/app/lib/definitions";
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
  params: MainParams;
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
    const newTextDescriptionId = await addTextDescription({
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
          addText({
            textDescriptionId: newTextDescriptionId,
            lang: tabLang,
            text: tab.value,
            pathName,
            contentType: "main",
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
    params,
    calendarFeatureId,
  }: SaveArgs) => {
    const calendarEventsGroupFeatureId = await addChildFeature({
      parentId: calendarFeatureId,
      type: CALENDAR_EVENTS_TYPE,
      subtype: type,
      name: params.pageName,
      text_types: [],
      pathName,
      filter_ids: confirmedDates.join(","),
    });

    if (!calendarEventsGroupFeatureId) {
      return;
    }

    const promises: Promise<any>[] = [];

    saveTabs({
      featureId: calendarEventsGroupFeatureId,
      textType: CALENDAR_EVENTS_TITLE,
      tabs: title ?? [],
      price,
      promises,
    });

    saveTabs({
      featureId: calendarEventsGroupFeatureId,
      textType: CALENDAR_EVENTS_TRAINER,
      tabs: trainer ?? [],
      promises,
    });

    saveTabs({
      featureId: calendarEventsGroupFeatureId,
      textType: CALENDAR_EVENTS_DESCRIPTION,
      tabs: description ?? [],
      promises,
    });

    promises.push(
      addTextDescription({
        featureId: calendarEventsGroupFeatureId,
        textType: CALENDAR_EVENTS_COUNT,
        pathName,
        canDelete: false,
        price: null,
        value: count.toString(),
      })
    );

    promises.push(
      addTextDescription({
        featureId: calendarEventsGroupFeatureId,
        textType: CALENDAR_EVENTS_TIME,
        pathName,
        canDelete: false,
        price: null,
        value: time,
      })
    );

    await Promise.all(promises);
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
    const promises: Promise<any>[] = [];

    promises.push(
      updateFeatureSubtypeFilterIds({
        id: eventFeatureId,
        pathName,
        subtype: type,
        filterIds: confirmedDates.join(","),
      })
    );

    promises.push(
      updatePriceValueLink({
        price,
        textDescriptionId: titleInit.text_description_id,
        pathName,
      })
    );

    promises.push(
      updatePriceValueLink({
        value: count.toString(),
        textDescriptionId: countInit.text_description_id,
        pathName,
      })
    );

    promises.push(
      updatePriceValueLink({
        value: time,
        textDescriptionId: timeInit.text_description_id,
        pathName,
      })
    );

    updateTabs({
      tabs: title ?? [],
      textDescriptionId: titleInit.text_description_id,
      promises,
    });

    updateTabs({
      tabs: trainer ?? [],
      textDescriptionId: trainerInit.text_description_id,
      promises,
    });

    updateTabs({
      tabs: description ?? [],
      textDescriptionId: descriptionInit.text_description_id,
      promises,
    });

    await Promise.all(promises);
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
    const textContents = await getTextContents({
      text_description_id: textDescriptionId,
    });

    tabs.forEach((tab) => {
      const tabLang = tab.langUpperCase.toLocaleLowerCase();
      const textContent = textContents?.find(
        ({ language }) => language === tabLang
      );

      if (!textContent) {
        promises.push(
          addText({
            text: tab.value,
            textDescriptionId,
            lang: tabLang,
            contentType: "main",
            pathName,
          })
        );
      } else {
        promises.push(
          updateText({
            text: tab.value,
            pathName,
            id: textContent.id,
          })
        );
      }
    });
  };

  return { saveEvent, updateEvent };
};
