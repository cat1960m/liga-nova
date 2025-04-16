"use client";

import {
  CALENDAR_EVENTS_COMMON_SUBTYPE,
  CALENDAR_EVENTS_COUNT,
  CALENDAR_EVENTS_DESCRIPTION,
  CALENDAR_EVENTS_SPECIAL_SUBTYPE,
  CALENDAR_EVENTS_TIME,
  CALENDAR_EVENTS_TITLE,
  CALENDAR_EVENTS_TRAINER,
} from "@/app/lib/constants";
import { CommonButton } from "../__commonComponents/_buttons/CommonButton";
import { DeleteFeatureButton } from "../__commonComponents/_buttons/DeleteFeatureButton";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { FullData } from "@/app/lib/definitions";
import styles from "./showEvent.module.css";
import { MouseEventHandler, useState } from "react";

export type Props = {
  staticTexts: StaticTexts;
  isEdit: boolean;
  eventData: FullData[];
  setEditEventId: (id: number) => void;
  parentFeatureId: number;
};

export const ShowEvent = ({
  staticTexts,
  isEdit,
  eventData,
  setEditEventId,
  parentFeatureId,
}: Props) => {
  const [position, setPosition] = useState<number[] | null>(null);
  const subtype = eventData[0]?.subtype;
  const eventId = eventData[0].id;

  const getFullData = (textType: string) => {
    return eventData?.find((item) => item.text_type === textType);
  };

  const trainer = getFullData(CALENDAR_EVENTS_TRAINER);
  const title = getFullData(CALENDAR_EVENTS_TITLE);
  const time = getFullData(CALENDAR_EVENTS_TIME);
  const count = getFullData(CALENDAR_EVENTS_COUNT);
  const description = getFullData(CALENDAR_EVENTS_DESCRIPTION);

  const getBackgroundColor = (subtype: string) => {
    if (subtype === CALENDAR_EVENTS_COMMON_SUBTYPE) {
      return "rgb(0,204,255)";
    }
    return subtype === CALENDAR_EVENTS_SPECIAL_SUBTYPE
      ? "rgb(40,155, 84)"
      : "rgb(51,102, 255)";
  };

  const titleStr =
    `${staticTexts.price}: ${title?.price ?? 0} \n` +
    `${staticTexts.count}: ${count?.value ?? 0} \n` +
    (description?.text_content ?? "");

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (event) => {
    setPosition([event.clientX, event.clientY]);
  };

  const [mouseX, mouseY] = position ?? [0, 0];

  return (
    <div
      style={{
        borderBottom: "1px solid lightgray",
        height: isEdit ? undefined : "124px",
        overflow: "auto",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPosition(null)}
    >
      {position ? (
        <div
          className={styles.pos}
          data-title={isEdit ? "" : titleStr}
          style={{
            top: mouseY > window.innerHeight / 2 ? undefined : mouseY + 10,
            left: window.innerWidth - mouseX > 200 ? mouseX + 10 : undefined,
            bottom:
              mouseY > window.innerHeight / 2
                ? window.innerHeight - mouseY - 10
                : undefined,
            right: window.innerWidth - mouseX < 200 ? 10 : undefined,
          }}
        >
          {titleStr}
        </div>
      ) : null}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: isEdit ? "200px" : "120px",
          padding: "3px",
          wordBreak: "break-all",
          fontSize: 14,
          backgroundColor: getBackgroundColor(subtype),
          color: subtype === CALENDAR_EVENTS_COMMON_SUBTYPE ? "black" : "white",
        }}
      >
        <div style={{ fontWeight: 700 }}>
          {`${time?.value ?? ""} ${title?.text_content ?? "N/A"}`}
        </div>
        <div>
          <div style={{ fontStyle: "italic" }}>
            {trainer?.text_content ?? "N/A"}
          </div>
          <div>{`${staticTexts.price}: ${title?.price}`}</div>
          <div>{`${staticTexts.count}: ${count?.value}`}</div>

          {isEdit ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "5px 0",
                gap: "5px",
              }}
            >
              <CommonButton
                text={staticTexts.updateEvent ?? "N/A"}
                onClick={() => setEditEventId(eventId)}
              />
              <DeleteFeatureButton
                featureId={eventData[0].id}
                deleteText={staticTexts.delete ?? "N/A"}
                featureData={eventData}
                parentFeatureId={null}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
