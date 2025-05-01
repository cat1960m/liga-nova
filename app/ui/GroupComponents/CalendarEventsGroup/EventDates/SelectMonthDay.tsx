"use client";

import { StaticTexts } from "@/app/dictionaries/definitions";
import { ChangeEventHandler, useMemo } from "react";
import styles from "./eventDates.module.css";

const longMonth = [1, 3, 5, 7, 8, 10, 12];

export type Props = {
  staticTexts: StaticTexts;
  day: string;
  month: number;
  year: number;
  onMonthDayChanged: (value: string) => void;
};

export const SelectMonthDay = ({
  staticTexts,
  day,
  onMonthDayChanged,
  month,
  year,
}: Props) => {
  const handleMonthDayChanged: ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    const value = event.target.value;
    onMonthDayChanged(value);
  };

  const monthDayOptions = useMemo(() => {
    let monthDays = Array.from({ length: 28 }, (_, i) => i + 1);

    if (month === 2 && year % 4 === 0) {
      monthDays = [...monthDays, 29];
    } else if (longMonth.includes(month)) {
      monthDays = [...monthDays, 29, 30, 31];
    } else if (month !== 2) {
      monthDays = [...monthDays, 29, 30];
    }

    const options = monthDays.map((item, index) => {
      return (
        <option key={index} value={item.toString()}>
          {item}
        </option>
      );
    });

    return [
      <option key="" value="">
        {""}
      </option>,
      ...options,
    ];
  }, [month, year]);

  return (
    <div className={styles.month_day}>
      {`${staticTexts.day ?? "N/A"}:`}
      <select value={day} onChange={handleMonthDayChanged}>
        {[...monthDayOptions]}
      </select>
    </div>
  );
};
