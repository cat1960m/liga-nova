"use client";

import { FullData, MainParams } from "@/app/lib/definitions";
import { AddEditCalendarEvents } from "./AddEditCalendarEvents/AddEditCalendarEvents";
import { getIsEditNoDelete } from "@/app/lib/utils";
import { useState } from "react";
import { ShowEvents } from "./ShowEvents/ShowEvents";
import { ICON_BUTTON_WIDTH, ICON_IN_BUTTON_WIDTH } from "@/app/lib/constants";
import { CalendarHeader } from "./CalendarHeader/CalendarHeader";
import { PlusIcon } from "@heroicons/react/24/outline";

import styles from "./calendarEventsGroup.module.css";
import { CommonButton } from "../../CommonComponents/_buttons/CommonButton";
import { DeleteFeatureChangeOrderButtons } from "../../CommonComponents/_buttons/DeleteFeatureChangeOrderButtons/DeleteFeatureChangeOrderButtons";
import { ItemGroupContainerCommon } from "../../CommonComponents/_itemGroupContainer/ItemGroupContainerCommon/ItemGroupContainerCommon";
import { useContainerData } from "../../hooks/useContainerData";
import { CreateModal } from "../../CommonComponents/_upadeModal/CreateModal/CreateModal";
import { CountIndex } from "@/app/dictionaries/definitions";

export type Props = {
  groupData: FullData[];
  params: MainParams;
  pageFullData: FullData[];
  countIndex: CountIndex;
};

export const CalendarEventsGroup = ({
  groupData,
  params,
  pageFullData,
  countIndex
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
  const calendarData = useContainerData({
    pageName: params.pageName,
    pageFullData,
    parentFeatureId: calendarFeatureId,
  });

  if (!calendarFeatureId) {
    return null;
  }

  const handleClickAddEvent = () => setIsAddShown(true);
  const hideAddEvent = () => {
    setIsAddShown(false);
    setEditEventId(null);
  };

  const isModalShown = isAddShown || editEventId;
  const { staticTexts, pageName } = params;
  const { isEdit, noDelete } = getIsEditNoDelete(params);

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

        {!noDelete ? (
          <DeleteFeatureChangeOrderButtons
            deleteText={staticTexts.deleteCalendar ?? "N/A"}
            featureData={groupData}
            countIndex={countIndex}
            noChangeOrder={false}
            noDelete={noDelete}
          />
        ) : null}
      </div>
    );
  };

  return (
    <>
      <ItemGroupContainerCommon
        showGroupButtons={isEdit && !isModalShown}
        getEditButtons={getButtons}
        marginTop={20}
      >
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
            calendarData={calendarData}
            staticTexts={staticTexts}
            isEdit={isEdit}
            setEditEventId={setEditEventId}
            startDate={isWeek ? startOfWeek : currentDate}
            countDates={isWeek ? 7 : 1}
            parentFeatureId={calendarFeatureId}
          />
        </div>
      </ItemGroupContainerCommon>
      {isModalShown ? (
        <CreateModal onClose={hideAddEvent}>
          <AddEditCalendarEvents
            calendarFeatureId={calendarFeatureId}
            hideAddEvent={hideAddEvent}
            eventFeatureData={
              editEventId
                ? calendarData.childFeatureIdToFullDataList[editEventId]
                : undefined
            }
            staticTexts={staticTexts}
            pageName={pageName}
          />
        </CreateModal>
      ) : null}
    </>
  );
};
