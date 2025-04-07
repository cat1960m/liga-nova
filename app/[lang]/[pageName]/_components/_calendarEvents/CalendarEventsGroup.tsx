"use client";

import { StaticTexts } from "@/app/dictionaries/definitions";
import { FullData, MainParams } from "@/app/lib/definitions";
import { AddEditCalendarEvents } from "./AddEditCalendarEvents";
import { dateToString, getContainerData } from "@/app/lib/utils";
import { DeleteFeatureButton } from "../_buttons/DeleteFeatureButton";
import { useState } from "react";
import { CommonButton } from "../_buttons/CommonButton";
import { ShowEvents } from "./ShowEvents";
import {
  ACTION_BUTTON_BACKGROUND,
  ACTION_BUTTON_BACKGROUND_NOT_SELECTED,
} from "@/app/lib/constants";
import { ShowDatesInterval } from "./ShowDatesInterval";

export type Props = {
  isEdit: boolean;
  staticTexts: StaticTexts;
  groupData: FullData[];
  params: MainParams;
  pageFullData: FullData[];
};

export const CalendarEventsGroup = ({
  isEdit,
  groupData,
  staticTexts,
  params,
  pageFullData,
}: Props) => {
  const getDateToday = () => {
    const today = new Date();
    return today;
  };
  const getNowStartOfWeek = () => {
    const today = getDateToday();

    return new Date(today.setDate(today.getDate() - today.getDay())); // Sunday
  };

  const [isAddShown, setIsAddShown] = useState(false);
  const [editEventId, setEditEventId] = useState<number | null>(null);
  const [startOfWeek, setStartOfWeek] = useState<Date>(getNowStartOfWeek());
  const [isWeek, setIsWeek] = useState(true);
  const [currentDate, setCurrentDate] = useState<Date>(() => {
    return getDateToday();
  });

  const firstData = groupData[0];
  const calendarFeatureId = firstData.id;

  if (!calendarFeatureId) {
    return null;
  }

  const [eventsData, eventsIds] = getContainerData({
    pageName: params.pageName,
    pageFullData,
    parentFeatureId: calendarFeatureId,
  });

  const handleClickAddEvent = () => setIsAddShown(true);
  const hideAddEvent = () => {
    setIsAddShown(false);
    setEditEventId(null);
  };

  const isCalendarShown = !isAddShown && !editEventId;

  const getNewDate = ({ date, addDays }: { date: Date; addDays: number }) => {
    const newDate = new Date(date);
    const newMonthDay = date.getDate() + addDays;
    newDate.setDate(newMonthDay);
    return newDate;
  };
  const handleLeftClick = () => {
    if (isWeek) {
      setStartOfWeek(getNewDate({ date: startOfWeek, addDays: -7 }));
    } else {
      setCurrentDate(getNewDate({ date: currentDate, addDays: -1 }));
    }
  };

  const handleRightClick = () => {
    if (isWeek) {
      setStartOfWeek(getNewDate({ date: startOfWeek, addDays: 7 }));
    } else {
      setCurrentDate(getNewDate({ date: currentDate, addDays: 1 }));
    }
  };

  const handleTodayClick = () => {
    if (isWeek) {
      setStartOfWeek(getNowStartOfWeek());
    } else {
      setCurrentDate(getDateToday());
    }
  };

  const handleWeekClick = () => {
    if (!isWeek) {
      setIsWeek(true);
      setStartOfWeek(getNowStartOfWeek());
    }
  };

  const handleDayClick = () => {
    if (!isWeek) {
      return;
    }

    setIsWeek(false);
    const date = getDateToday();
    const dateStr = dateToString(date);
    const startStr = dateToString(startOfWeek);
    const endStr = dateToString(endOfWeek);

    if (startStr <= dateStr && dateStr <= endStr) {
      setCurrentDate(date);
    } else {
      setCurrentDate(new Date(startOfWeek));
    }
  };

  const endOfWeek = getNewDate({
    date: startOfWeek,
    addDays: 6,
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {isCalendarShown ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              padding: "10px",
              flexWrap: "wrap-reverse",
              gap: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
                flexGrow: 2,
                alignItems: "center",
              }}
            >
              <CommonButton
                text={"<"}
                onClick={handleLeftClick}
                backgroundColor={ACTION_BUTTON_BACKGROUND}
              />
              <ShowDatesInterval
                staticTexts={staticTexts}
                startOfWeek={startOfWeek}
                endOfWeek={endOfWeek}
                currentDate={currentDate}
                isWeek={isWeek}
              />
              <CommonButton
                text={">"}
                onClick={handleRightClick}
                backgroundColor={ACTION_BUTTON_BACKGROUND}
              />
            </div>
            <div
              style={{
                display: "flex",
                gap: "5px",
                justifyContent: "flex-end",
                justifyItems: "flex-end",
                flexGrow: 1,
              }}
            >
              <CommonButton
                text={staticTexts.today}
                onClick={handleTodayClick}
                backgroundColor={ACTION_BUTTON_BACKGROUND}
                isDisabled={
                  isWeek
                    ? dateToString(startOfWeek) ===
                      dateToString(getNowStartOfWeek())
                    : dateToString(currentDate) === dateToString(getDateToday())
                }
              />
              <CommonButton
                text={staticTexts.week}
                onClick={handleWeekClick}
                backgroundColor={
                  isWeek
                    ? ACTION_BUTTON_BACKGROUND
                    : ACTION_BUTTON_BACKGROUND_NOT_SELECTED
                }
              />
              <CommonButton
                text={staticTexts.day}
                onClick={handleDayClick}
                backgroundColor={
                  !isWeek
                    ? ACTION_BUTTON_BACKGROUND
                    : ACTION_BUTTON_BACKGROUND_NOT_SELECTED
                }
              />
            </div>
          </div>

          <ShowEvents
            eventsIds={eventsIds}
            eventsData={eventsData}
            staticTexts={staticTexts}
            isEdit={isEdit}
            setEditEventId={setEditEventId}
            startDate={isWeek ? startOfWeek : currentDate}
            countDates={isWeek ? 7 : 1}
          />
        </div>
      ) : null}

      {!isCalendarShown ? (
        <AddEditCalendarEvents
          staticTexts={staticTexts}
          calendarFeatureId={calendarFeatureId}
          params={params}
          hideAddEvent={hideAddEvent}
          eventFeatureData={editEventId ? eventsData[editEventId] : undefined}
        />
      ) : null}

      {isEdit ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <div style={{ display: "flex", gap: "20px" }}>
            {isEdit && !isAddShown ? (
              <CommonButton
                text={staticTexts.addEvent ?? "N/A"}
                onClick={handleClickAddEvent}
              />
            ) : null}

            <DeleteFeatureButton
              featureId={calendarFeatureId}
              deleteText={staticTexts.deleteCalendar ?? "N/A"}
              featureData={groupData}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};
