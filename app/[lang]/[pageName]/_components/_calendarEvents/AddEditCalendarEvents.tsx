"use client";

import { useEffect, useState } from "react";
import { CommonButton } from "../__commonComponents/_buttons/CommonButton";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { FullData, MainParams, TabType } from "@/app/lib/definitions";
import {
  CALENDAR_EVENTS_COMMON_SUBTYPE,
  TRANSLATE_LANGUAGES,
} from "@/app/lib/constants";
import { NumberValue } from "./NumberValue";
import { EventDates } from "./EventDates";
import { TranslationTabs } from "../__commonComponents/TranslationTabs";
import { getTextContents } from "@/app/lib/actions_fitness";
import {
  CALENDAR_EVENTS_TITLE,
  CALENDAR_EVENTS_TRAINER,
  CALENDAR_EVENTS_COUNT,
  CALENDAR_EVENTS_TIME,
  CALENDAR_EVENTS_DESCRIPTION,
} from "@/app/lib/constants";
import { SelectEventType } from "./SelectEventType";
import { useChangeEventData } from "./hooks/useChangeEventData";

export type Props = {
  staticTexts: StaticTexts;
  calendarFeatureId: number;
  params: MainParams;
  hideAddEvent: () => void;
  eventFeatureData?: FullData[];
};

export const AddEditCalendarEvents = ({
  staticTexts,
  calendarFeatureId,
  params,
  hideAddEvent,
  eventFeatureData,
}: Props) => {
  const getFullData = (textType: string) => {
    return eventFeatureData?.find((item) => item.text_type === textType);
  };

  const titleInit = getFullData(CALENDAR_EVENTS_TITLE);
  const countInit = getFullData(CALENDAR_EVENTS_COUNT);
  const timeInit = getFullData(CALENDAR_EVENTS_TIME);
  const trainerInit = getFullData(CALENDAR_EVENTS_TRAINER);
  const descriptionInit = getFullData(CALENDAR_EVENTS_DESCRIPTION);

  const intLanguages = () => {
    return TRANSLATE_LANGUAGES.map((language) => ({
      langUpperCase: language,
      value: "",
    }));
  };

  const [price, setPrice] = useState<number>(titleInit?.price ?? 0);
  const [count, setCount] = useState<number>(
    countInit?.value ? parseInt(countInit?.value) : 0
  );
  const [time, setTime] = useState<string>(timeInit?.value ?? "00:00");
  const [confirmedDates, setConfirmedDates] = useState<string[]>(
    eventFeatureData?.[0]?.filter_ids?.split(",") ?? []
  );
  const [type, setType] = useState<string>(
    eventFeatureData?.[0]?.subtype ?? CALENDAR_EVENTS_COMMON_SUBTYPE
  );
  const [title, setTitle] = useState<TabType[] | null>(
    eventFeatureData ? null : intLanguages()
  );
  const [trainer, setTrainer] = useState<TabType[] | null>(
    eventFeatureData ? null : intLanguages()
  );
  const [description, setDescription] = useState<TabType[] | null>(
    eventFeatureData ? null : intLanguages()
  );

  const [isDataChanged, setIsDataChanged] = useState(false);

  const { saveEvent, updateEvent } = useChangeEventData();

  useEffect(() => {
    const setInitData = async ({
      text_description_id,
      setTabs,
    }: {
      text_description_id: number;
      setTabs: (value: TabType[]) => void;
    }) => {
      const allContents = await getTextContents({
        text_description_id: text_description_id,
      });

      const getTab = (lang: string) => {
        return {
          langUpperCase: lang.toUpperCase(),
          value:
            allContents?.find((item) => item.language === lang)?.text_content ??
            "",
        };
      };

      setTabs([getTab("en"), getTab("ua"), getTab("de")]);
    };

    if (eventFeatureData) {
      setInitData({
        text_description_id: titleInit?.text_description_id ?? 0,
        setTabs: setTitle,
      });
      setInitData({
        text_description_id: trainerInit?.text_description_id ?? 0,
        setTabs: setTrainer,
      });
      setInitData({
        text_description_id: descriptionInit?.text_description_id ?? 0,
        setTabs: setDescription,
      });
    }
  }, [eventFeatureData]);

  const handleSave = async () => {
    await saveEvent({
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
    });
    hideAddEvent();
  };

  const handleUpdate = async () => {
    if (
      !eventFeatureData?.[0].id ||
      !titleInit ||
      !countInit ||
      !timeInit ||
      !trainerInit ||
      !descriptionInit
    ) {
      return;
    }
    await updateEvent({
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
      eventFeatureId: eventFeatureData?.[0].id,
    });
    hideAddEvent();
  };

  if (!title || !trainer || !description) {
    return null;
  }

  const handleChangeConfirmedDates = (values: string[]) => {
    setConfirmedDates(values);
    setIsDataChanged(true);
  };

  const handleChangeTime = (value: string) => {
    setTime(value);
    setIsDataChanged(true);
  };

  const handleChangeType = (value: string) => {
    setType(value);
    setIsDataChanged(true);
  };

  const handleChangePrice = (value: number) => {
    setPrice(value);
    setIsDataChanged(true);
  };

  const handleChangeCount = (value: number) => {
    setCount(value);
    setIsDataChanged(true);
  };

  const handleChangeTitle = (tabs: TabType[]) => {
    setTitle(tabs);
    setIsDataChanged(true);
  };

  const handleChangeTrainer = (tabs: TabType[]) => {
    setTrainer(tabs);
    setIsDataChanged(true);
  };
  const handleChangeDescription = (tabs: TabType[]) => {
    setDescription(tabs);
    setIsDataChanged(true);
  };

  const isButtonsDisabled = !confirmedDates.length || !isDataChanged;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "10px",
        border: "1px dotted magenta",
      }}
    >
      <EventDates
        confirmedDates={confirmedDates}
        setConfirmedDates={handleChangeConfirmedDates}
        staticTexts={staticTexts}
        time={time}
        setTime={handleChangeTime}
      />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <SelectEventType
          staticTexts={staticTexts}
          type={type}
          setType={handleChangeType}
        />

        <NumberValue
          label={staticTexts.price ?? "N/A"}
          value={price}
          setValue={handleChangePrice}
        />
        <NumberValue
          label={staticTexts.count ?? "N/A"}
          value={count}
          setValue={handleChangeCount}
        />
      </div>

      <TranslationTabs
        staticTexts={staticTexts}
        tabs={title}
        setTabs={handleChangeTitle}
        title={staticTexts.name ?? "N/A"}
      />

      <TranslationTabs
        staticTexts={staticTexts}
        tabs={trainer}
        setTabs={handleChangeTrainer}
        title={staticTexts.trainer ?? "N/A"}
      />

      <TranslationTabs
        staticTexts={staticTexts}
        tabs={description}
        setTabs={handleChangeDescription}
        title={staticTexts.descriptions ?? "N/A"}
        isArea
      />

      <div
        style={{
          display: " flex",
          gap: "10px",
          justifyContent: "flex-end",
          padding: "10px 0",
        }}
      >
        <CommonButton text={staticTexts.cancel} onClick={hideAddEvent} />
        <CommonButton
          text={staticTexts.save}
          onClick={handleSave}
          isDisabled={isButtonsDisabled}
        />
        {!!eventFeatureData ? (
          <CommonButton
            text={staticTexts.updateEvent}
            onClick={handleUpdate}
            isDisabled={isButtonsDisabled}
          />
        ) : null}
      </div>
    </div>
  );
};
