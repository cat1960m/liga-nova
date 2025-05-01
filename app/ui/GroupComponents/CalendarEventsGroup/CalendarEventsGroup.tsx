"use client";

import { FullData, MainParams } from "@/app/lib/definitions";
import { AddEditCalendarEvents } from "./AddEditCalendarEvents/AddEditCalendarEvents";
import { getContainerData } from "@/app/lib/utils";
import { useState } from "react";
import { ShowEvents } from "./ShowEvents/ShowEvents";
import { ICON_BUTTON_WIDTH, ICON_IN_BUTTON_WIDTH } from "@/app/lib/constants";
import { CalendarHeader } from "./CalendarHeader/CalendarHeader";
import { PlusIcon } from "@heroicons/react/24/outline";

import styles from "./calendarEventsGroup.module.css";
import { CommonButton } from "../../CommonComponents/_buttons/CommonButton";
import { DeleteFeatureButton } from "../../CommonComponents/_buttons/DeleteFeatureButton";
import { ItemGroupContainerCommon } from "../../CommonComponents/_itemGroupContainer/ItemGroupContainerCommon";

export type Props = {
  groupData: FullData[];
  params: MainParams;
  pageFullData: FullData[];
};

export const CalendarEventsGroup = ({
  groupData,
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
  const { staticTexts, isEdit } = params;

  const getButtons = () => {
    return (
      <div className={styles.buttons}>
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
    <ItemGroupContainerCommon
      isEdit={isEdit}
      getEditButtons={getButtons}
      marginTop={20}
    >
      <>
        {isCalendarShown ? (
          <div className={styles.calendar}>
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
