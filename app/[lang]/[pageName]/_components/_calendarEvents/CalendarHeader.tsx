import {
  ACTION_BUTTON_BACKGROUND,
  ACTION_BUTTON_BACKGROUND_NOT_SELECTED,
} from "@/app/lib/constants";
import { CommonButton } from "../__commonComponents/_buttons/CommonButton";
import { ShowDatesInterval } from "./ShowDatesInterval";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { dateToString } from "@/app/lib/utils";

export type Props = {
  staticTexts: StaticTexts;
  isWeek: boolean;
  setIsWeek: (value: boolean) => void;
  startOfWeek: Date;
  setStartOfWeek: (date: Date) => void;
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  getNowStartOfWeek: () => Date;
  getDateToday: () => Date;
};

export const CalendarHeader = ({
  staticTexts,
  isWeek,
  setIsWeek,
  startOfWeek,
  setStartOfWeek,
  currentDate,
  setCurrentDate,
  getNowStartOfWeek,
  getDateToday
}: Props) => {

  const getNewDate = ({ date, addDays }: { date: Date; addDays: number }) => {
    const newDate = new Date(date);
    const newMonthDay = date.getDate() + addDays;
    newDate.setDate(newMonthDay);
    return newDate;
  };

  const endOfWeek = getNewDate({
    date: startOfWeek,
    addDays: 6,
  });

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
  
  return (
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
        <CommonButton text={"<"} onClick={handleLeftClick} isAction />
        <ShowDatesInterval
          staticTexts={staticTexts}
          startOfWeek={startOfWeek}
          endOfWeek={endOfWeek}
          currentDate={currentDate}
          isWeek={isWeek}
        />
        <CommonButton text={">"} onClick={handleRightClick} isAction />
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
          isAction
          isDisabled={
            isWeek
              ? dateToString(startOfWeek) === dateToString(getNowStartOfWeek())
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
  );
};
