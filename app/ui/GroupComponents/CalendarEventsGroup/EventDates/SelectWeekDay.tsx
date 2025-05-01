"use client";

import { StaticTexts } from "@/app/dictionaries/definitions";
import { ChangeEventHandler, useMemo } from "react";
import styles from "./eventDates.module.css";

export type Props = {
  staticTexts: StaticTexts;
  weekDay: string;
  onWeekDayChanged: (value: string) => void;
};

export const SelectWeekDay = ({
  staticTexts,
  weekDay,
  onWeekDayChanged,
}: Props) => {
  const weekDayOptions = useMemo(
    () => [
      <option key={"-1"} value={""} disabled style={{ color: "lightgray" }}>
        {"Select week day"}
      </option>,
      <option key={0} value={"0"}>
        {staticTexts.sunday}
      </option>,
      <option key={1} value={"1"}>
        {staticTexts.monday}
      </option>,
      <option key={2} value={"2"}>
        {staticTexts.tuesday}
      </option>,
      <option key={3} value={"3"}>
        {staticTexts.wednesday}
      </option>,
      <option key={4} value={"4"}>
        {staticTexts.thursday}
      </option>,
      <option key={5} value={"5"}>
        {staticTexts.friday}
      </option>,
      <option key={6} value={"6"}>
        {staticTexts.saturday}
      </option>,
    ],
    []
  );

  const handleWeekDayChanged: ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    const value = event.target.value;
    onWeekDayChanged(value);
  };

  return (
    <div className={styles.select_week_dey}>
      {`${staticTexts.weekDay}:`}
      <select
        value={weekDay}
        onChange={handleWeekDayChanged}
        style={{ color: weekDay ? "black" : "lightgray" }}
      >
        {[...weekDayOptions]}
      </select>
    </div>
  );
};
