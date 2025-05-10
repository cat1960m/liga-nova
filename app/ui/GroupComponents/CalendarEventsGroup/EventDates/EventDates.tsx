"use client";

import { ChangeEventHandler, useState } from "react";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { SelectNumberValue } from "./SelectNumberValue";
import { dateToString, getDatesByWeekDayMonths } from "@/app/lib/utils";
import { SelectWeekDay } from "./SelectWeekDay";
import { SelectMonthDay } from "./SelectMonthDay";

import styles from "./eventDates.module.css";
import cn from "clsx";

export type Props = {
  staticTexts: StaticTexts;
  confirmedDates: string[];
  setConfirmedDates: (values: string[]) => void;
  setTime: (time: string) => void;
  time: string;
};

export const EventDates = ({
  staticTexts,
  confirmedDates,
  setConfirmedDates,
  setTime,
  time,
}: Props) => {
  const [confirmedYear, confirmedFirstMonth, confirmedFirstMonthDay] =
    confirmedDates.length ? confirmedDates[0].split("-") : ["", "", ""];

  const [initHours, initMinutes] = time.split(":");
  const byWeekDayInit = !confirmedDates.length || confirmedDates.length > 1;

  const initYear = !confirmedYear
    ? new Date().getFullYear()
    : parseInt(confirmedYear);

  const initMonths = !confirmedDates.length
    ? [(new Date().getMonth() + 1).toString()]
    : (() => {
        const months = new Set<string>();
        confirmedDates.forEach((date) => {
          months.add(parseInt(date.split("-")[1]).toString());
        });
        return Array.from(months);
      })();

  const initMonth = byWeekDayInit
    ? new Date().getMonth() + 1
    : parseInt(confirmedFirstMonth);

  const initWeekDay =
    confirmedDates.length > 1
      ? new Date(
          parseInt(confirmedYear),
          parseInt(confirmedFirstMonth) - 1,
          parseInt(confirmedFirstMonthDay)
        )
          .getDay()
          .toString()
      : "";

  const initDay = byWeekDayInit
    ? ""
    : parseInt(confirmedFirstMonthDay).toString();

  const [year, setYear] = useState<number>(initYear);
  const [months, setMonths] = useState<string[]>(initMonths);
  const [month, setMonth] = useState<number>(initMonth);

  const [weekDay, setWeekDay] = useState<string>(initWeekDay);
  const [day, setDay] = useState<string>(initDay);
  const [selectedDates, setSelectedDates] = useState<string[]>(
    byWeekDayInit
      ? getDatesByWeekDayMonths({
          weekDay: parseInt(initWeekDay),
          year: initYear,
          months: initMonths,
        })
      : [...confirmedDates]
  );
  const [hours, setHours] = useState<number>(parseInt(initHours));
  const [minutes, setMinutes] = useState<number>(parseInt(initMinutes));

  const [byWeekDay, seyByWeekday] = useState(byWeekDayInit);

  const clear = () => {
    setSelectedDates([]);
    setConfirmedDates([]);
    setDay("");
    setWeekDay("");
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    seyByWeekday(event.target.value === "0");
    clear();
  };

  const handleCheckedChange = (isChecked: boolean, item: string) => {
    setConfirmedDates(
      isChecked
        ? [...confirmedDates, item]
        : confirmedDates.filter((el) => el !== item)
    );
  };

  const handleHoursChange = (value: number) => {
    setHours(value);
    const formattedHours = value.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    setTime(`${formattedHours}:${formattedMinutes}`);
  };

  const handleMinutesChange = (value: number) => {
    setMinutes(value);
    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = value.toString().padStart(2, "0");
    setTime(`${formattedHours}:${formattedMinutes}`);
  };

  const handleYearChange = (value: number) => {
    setYear(value);
    clear();
  };

  const handleMonthsChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const values = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setMonths(values);
    const dates = getDatesByWeekDayMonths({
      weekDay: parseInt(weekDay),
      year,
      months: values,
    });

    setSelectedDates(dates);
    setConfirmedDates(dates);
  };

  const handleMonthChange = (value: number) => {
    setMonth(value);
    clear();
  };

  const handleWeekDayChanged = (value: string) => {
    if (value) {
      setWeekDay(value);
      const dates = getDatesByWeekDayMonths({
        weekDay: parseInt(value),
        year,
        months,
      });

      setSelectedDates(dates);
      setConfirmedDates(dates);
    } else {
      clear();
    }
  };

  const handleMonthDayChanged = (value: string) => {
    if (value) {
      setDay(value);
      const day = parseInt(value);
      const date = new Date(year, month - 1, day);
      const dates = [dateToString(date)];

      setSelectedDates(dates);
      setConfirmedDates(dates);
    } else {
      clear();
    }
  };

  const monthOptions = Array.from({ length: 12 }, (_, i) => i + 1).map(
    (item, index) => {
      return (
        <option key={index} value={item}>
          {item}
        </option>
      );
    }
  );

  return (
    <div className={styles.container}>
      <div className={styles.group}>
        <div className={styles.input_container}>
          <input
            type="radio"
            name="options"
            value="0"
            checked={byWeekDay}
            onChange={handleChange}
          />
          {staticTexts.byWeekDay}
        </div>

        <div className={styles.input_container}>
          <input
            type="radio"
            name="options"
            value="1"
            checked={!byWeekDay}
            onChange={handleChange}
          />
          {staticTexts.byMonthDay}
        </div>
      </div>

      <div className={styles.date_group}>
        <SelectNumberValue
          label={staticTexts.year ?? "N/A"}
          value={year}
          setValue={handleYearChange}
          start={2025}
          count={10}
        />

        {byWeekDay ? (
          <div className={styles.group}>
            {`${staticTexts.month}:`}
            <select multiple value={months} onChange={handleMonthsChange}>
              {[...monthOptions]}
            </select>
          </div>
        ) : (
          <SelectNumberValue
            label={staticTexts.month ?? "N/A"}
            value={month}
            setValue={handleMonthChange}
            start={1}
            count={12}
          />
        )}

        {byWeekDay ? (
          <SelectWeekDay
            staticTexts={staticTexts}
            weekDay={weekDay}
            onWeekDayChanged={handleWeekDayChanged}
          />
        ) : (
          <SelectMonthDay
            staticTexts={staticTexts}
            day={day}
            onMonthDayChanged={handleMonthDayChanged}
            year={year}
            month={month}
          />
        )}

        <div className={styles.time_group}>
          <SelectNumberValue
            label={staticTexts.hours ?? "N/A"}
            value={hours}
            setValue={handleHoursChange}
            start={0}
            count={24}
          />

          <SelectNumberValue
            label={staticTexts.minutes ?? "N/A"}
            value={minutes}
            setValue={handleMinutesChange}
            start={0}
            count={60}
          />
        </div>
      </div>

      <div
        className={cn(styles.selected_dates, {
          [styles.exists]: selectedDates.length,
        })}
      >
        {selectedDates.map((item, index) => {
          return (
            <div key={index} className={styles.selected_date}>
              <input
                type="checkbox"
                checked={confirmedDates.includes(item)}
                onChange={(event) =>
                  handleCheckedChange(event.target.checked, item)
                }
              />
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};
