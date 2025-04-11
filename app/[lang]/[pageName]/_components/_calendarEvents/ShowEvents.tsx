"use client";

import { FullData } from "@/app/lib/definitions";
import { ShowEvent } from "./ShowEvent";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { useMemo } from "react";
import { dateToString } from "@/app/lib/utils";

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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      {headerItems.map((item, index) => {
        const dateEventIds = eventsIds.filter((eventsId) =>
          eventsData[eventsId][0]?.filter_ids?.includes(item.dateStr ?? "")
        );

        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: countDates === 1 ? "100%" : "14%",
              border: "1px solid lightgray",
              padding: "5px 0",
            }}
            key={index}
          >
            <div
              style={{
                borderBottom: "1px solid gray",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: 700,
              }}
            >
              {`${item.name} ${item.day}`}
            </div>
            {dateEventIds.map((dateEventId, index) => {
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
