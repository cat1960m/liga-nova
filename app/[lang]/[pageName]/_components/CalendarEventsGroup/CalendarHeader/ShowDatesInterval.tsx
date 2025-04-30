import { StaticTexts } from "@/app/dictionaries/definitions";
import styles from "./calendarHeader.module.css";


export type Props = {
  staticTexts: StaticTexts;
  startOfWeek: Date;
  endOfWeek: Date;
  currentDate: Date;
  isWeek: boolean;
};

export const ShowDatesInterval = ({
  staticTexts,
  startOfWeek,
  endOfWeek,
  currentDate,
  isWeek,
}: Props) => {
  const getShownWeekDates = () => {
    const months = [
      staticTexts.january0,
      staticTexts.february0,
      staticTexts.march0,
      staticTexts.april0,
      staticTexts.may0,
      staticTexts.june0,
      staticTexts.july0,
      staticTexts.august0,
      staticTexts.september0,
      staticTexts.october0,
      staticTexts.november0,
      staticTexts.december0,
    ];
    const yearStart = startOfWeek.getFullYear();
    const monthStart = startOfWeek.getMonth();
    const monthDayStart = startOfWeek.getDate();
    const yearEnd = endOfWeek.getFullYear();
    const monthEnd = endOfWeek.getMonth();
    const monthDayEnd = endOfWeek.getDate();

    if (yearStart !== yearEnd && monthStart !== monthEnd) {
      return `${monthDayStart} ${months[monthStart]} ${yearStart} - ${monthDayEnd} ${months[monthEnd]} ${yearEnd}`;
    }

    if (monthStart !== monthEnd) {
      return `${monthDayStart} ${months[monthStart]} - ${monthDayEnd} ${months[monthEnd]} ${yearEnd}`;
    }

    return `${monthDayStart} - ${monthDayEnd} ${months[monthEnd]} ${yearEnd}`;
  };

  const getShownDay = () => {
    const months = [
      staticTexts.january,
      staticTexts.february,
      staticTexts.march,
      staticTexts.april,
      staticTexts.may,
      staticTexts.june,
      staticTexts.july,
      staticTexts.august,
      staticTexts.september,
      staticTexts.october,
      staticTexts.november,
      staticTexts.december,
    ];
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const monthDay = currentDate.getDate();

    return `${monthDay} ${months[month]} ${year}`;
  };

  const shownDatesStr = isWeek ? getShownWeekDates() : getShownDay();

  return <div className={styles.show_dates}>{shownDatesStr}</div>;
};
