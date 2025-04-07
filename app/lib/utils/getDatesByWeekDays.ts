import { dateToString } from "./dateToString";

export const getDatesByWeekDays = ({
  weekDays,
  year,
  month,
}: {
  weekDays: string[];
  year: number;
  month: number;
}) => {
  const dates: string[] = [];
  const firstDay = new Date(year, month - 1, 1); // Month is 0-indexed
  const lastDay = new Date(year, month, 0); // Last day of the month

  for (let day = firstDay.getDate(); day <= lastDay.getDate(); day++) {
    const currentDate = new Date(year, month - 1, day);
    if (weekDays.includes(currentDate.getDay().toString())) {
      dates.push(dateToString(currentDate)); // Format: YYYY-MM-DD
    }
  }

  return dates;
};
