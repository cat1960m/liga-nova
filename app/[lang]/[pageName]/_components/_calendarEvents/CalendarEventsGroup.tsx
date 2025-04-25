"use client";

import { StaticTexts } from "@/app/dictionaries/definitions";
import { FullData, MainParams } from "@/app/lib/definitions";
import { AddEditCalendarEvents } from "./AddEditCalendarEvents";
import { dateToString, getContainerData } from "@/app/lib/utils";
import { DeleteFeatureButton } from "../__commonComponents/_buttons/DeleteFeatureButton";
import { useState } from "react";
import { CommonButton } from "../__commonComponents/_buttons/CommonButton";
import { ShowEvents } from "./ShowEvents";
import {
  ACTION_BUTTON_BACKGROUND,
  ACTION_BUTTON_BACKGROUND_NOT_SELECTED,
  ICON_BUTTON_WIDTH,
  ICON_IN_BUTTON_WIDTH,
} from "@/app/lib/constants";
import { ShowDatesInterval } from "./ShowDatesInterval";
import { CalendarHeader } from "./CalendarHeader";
import { PlusIcon } from "@heroicons/react/24/outline";
import { ItemGroupContainerCommon } from "../__commonComponents/_itemGroupContainer/ItemGroupContainerCommon";

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

  const getButtons = () => {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "5px",
        }}
      >
        {!isAddShown ? (
          <CommonButton width={ICON_BUTTON_WIDTH} onClick={handleClickAddEvent}>
            <PlusIcon
              width={ICON_IN_BUTTON_WIDTH}
              title={staticTexts.addEvent ?? "N/A"}
            />
          </CommonButton>
        ) : null}

        <DeleteFeatureButton
          deleteText={staticTexts.deleteCalendar ?? "N/A"}
          featureData={groupData}
        />
      </div>
    );
  };

  return (
    <ItemGroupContainerCommon isEdit={isEdit} getEditButtons={getButtons} marginTop={20}>
      <>
        {isCalendarShown ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              width: "100%",
            }}
          >
            <CalendarHeader
              staticTexts={staticTexts}
              isWeek={isWeek}
              setIsWeek={setIsWeek}
              startOfWeek={startOfWeek}
              setStartOfWeek={setStartOfWeek}
              currentDate={currentDate}
              setCurrentDate={setCurrentDate}
              getDateToday={getDateToday}
              getNowStartOfWeek={getNowStartOfWeek}
            />
            <ShowEvents
              eventsIds={eventsIds}
              eventsData={eventsData}
              staticTexts={staticTexts}
              isEdit={isEdit}
              setEditEventId={setEditEventId}
              startDate={isWeek ? startOfWeek : currentDate}
              countDates={isWeek ? 7 : 1}
              parentFeatureId={calendarFeatureId}
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
      </>
    </ItemGroupContainerCommon>
  );
};
