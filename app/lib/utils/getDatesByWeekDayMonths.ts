import { dateToString } from "./dateToString";

export const getDatesByWeekDayMonths = ({
  weekDay,
  year,
  months,
}: {
  weekDay: number;
  year: number;
  months: string[];
}) => {
  const dates: string[] = [];
  months.forEach((monthStr) => {
    const month = parseInt(monthStr);
    const firstDay = new Date(year, month - 1, 1); // Month is 0-indexed
    const lastDay = new Date(year, month, 0); // Last day of the month

    for (let day = firstDay.getDate(); day <= lastDay.getDate(); day++) {
      const currentDate = new Date(year, month - 1, day);

      if (weekDay === currentDate.getDay()) {
        dates.push(dateToString(currentDate)); // Format: YYYY-MM-DD
      }
    }
  });
  return dates;
};
