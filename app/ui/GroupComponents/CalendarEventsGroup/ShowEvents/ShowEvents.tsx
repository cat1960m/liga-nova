"use client";

import { FullData } from "@/app/lib/definitions";
import { ShowEvent } from "../ShowEvent/ShowEvent";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { useMemo } from "react";
import { dateToString } from "@/app/lib/utils";
import { CALENDAR_EVENTS_TIME } from "@/app/lib/constants";

import styles from "./showEvents.module.css";
import cn from "clsx";

export type Props = {
  eventsIds: string[];
  eventsData: Record<string, FullData[]>;
  staticTexts: StaticTexts;
  isEdit: boolean;
  setEditEventId: (id: number) => void;
  startDate: Date;
  countDates: number;
  parentFeatureId: number;
};

export const ShowEvents = ({
  eventsIds,
  eventsData,
  staticTexts,
  isEdit,
  setEditEventId,
  startDate,
  countDates,
  parentFeatureId,
}: Props) => {
  const headerItems: {
    name: string;
    dateStr?: string;
    day?: number;
    date?: Date;
  }[] = useMemo(() => {
    const weekData = [
      staticTexts.sunday0,
      staticTexts.monday0,
      staticTexts.tuesday0,
      staticTexts.wednesday0,
      staticTexts.thursday0,
      staticTexts.friday0,
      staticTexts.saturday0,
    ];

    const getDates = () => {
      const headerData: {
        name: string;
        dateStr?: string;
        day?: number;
        date?: Date;
      }[] = [];
      for (let i = 0; i < countDates; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);
        headerData.push({
          date: currentDate,
          dateStr: dateToString(currentDate),
          day: currentDate.getDate(),
          name: weekData[currentDate.getDay()] ?? "N/A",
        });
      }

      return headerData;
    };

    return getDates();
  }, [startDate]);

  return (
    <div className={styles.container}>
      {headerItems.map((item, index) => {
        const dateEventIds = eventsIds.filter((eventsId) =>
          eventsData[eventsId][0]?.filter_ids?.includes(item.dateStr ?? "")
        );
        const sortedDateEventIds = dateEventIds.sort((a, b) => {
          const eventsA = eventsData[a] ?? [];
          const timeA =
            eventsA.find((item) => item.text_type === CALENDAR_EVENTS_TIME)
              ?.value ?? "";
          const eventsB = eventsData[b] ?? [];
          const timeB =
            eventsB.find((item) => item.text_type === CALENDAR_EVENTS_TIME)
              ?.value ?? "";

          return timeA > timeB ? 1 : -1;
        });

        return (
          <div
            className={cn(styles.event_container, {
              [styles.one_date]: countDates === 1,
            })}
            key={index}
          >
            <div className={styles.name_day}>{`${item.name} ${item.day}`}</div>
            {sortedDateEventIds.map((dateEventId, index) => {
              const eventFeatureData = eventsData[dateEventId] ?? [];
              return (
                <ShowEvent
                  staticTexts={staticTexts}
                  isEdit={isEdit}
                  eventData={eventFeatureData}
                  setEditEventId={setEditEventId}
                  key={index}
                  parentFeatureId={parentFeatureId}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
