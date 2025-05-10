"use client";

import {
  CALENDAR_EVENTS_COMMON_SUBTYPE,
  CALENDAR_EVENTS_COUNT,
  CALENDAR_EVENTS_DESCRIPTION,
  CALENDAR_EVENTS_SPECIAL_SUBTYPE,
  CALENDAR_EVENTS_TIME,
  CALENDAR_EVENTS_TITLE,
  CALENDAR_EVENTS_TRAINER,
  ICON_BUTTON_WIDTH,
  ICON_IN_BUTTON_WIDTH,
} from "@/app/lib/constants";
import { CommonButton } from "@/app/ui/CommonComponents/_buttons/CommonButton";
import { DeleteFeatureChangeOrderButtons } from "@/app/ui/CommonComponents/_buttons/DeleteFeatureChangeOrderButtons/DeleteFeatureChangeOrderButtons";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { FullData } from "@/app/lib/definitions";
import styles from "./showEvent.module.css";
import { MouseEventHandler, useState } from "react";
import { PencilIcon } from "@heroicons/react/24/outline";

import cn from "clsx";

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
    <div className={cn(styles.container, { [styles.height]: !isEdit })}>
      <div
        className={styles.inner_container}
        style={{
          minHeight: isEdit ? "200px" : "126px",
          backgroundColor: getBackgroundColor(subtype),
        }}
      >
        <div
          className={cn(styles.body, {
            [styles.common]: subtype === CALENDAR_EVENTS_COMMON_SUBTYPE,
          })}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setPosition(null)}
        >
          {position ? (
            <div
              className={styles.pos}
              data-title={isEdit ? "" : titleStr}
              style={{
                top: mouseY > window.innerHeight / 2 ? undefined : mouseY + 10,
                left:
                  window.innerWidth - mouseX > 200 ? mouseX + 10 : undefined,
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

          <div className={styles.title}>
            {`${time?.value ?? ""} ${title?.text_content ?? "N/A"}`}
          </div>
          <div>
            <div className={styles.trainer}>
              {trainer?.text_content ?? "N/A"}
            </div>
            <div>{`${staticTexts.price}: ${title?.price}`}</div>
            <div>{`${staticTexts.count}: ${count?.value}`}</div>
          </div>
        </div>
        {isEdit ? (
          <div className={styles.buttons}>
            <CommonButton
              onClick={() => setEditEventId(eventId)}
              width={ICON_BUTTON_WIDTH}
            >
              <PencilIcon
                width={ICON_IN_BUTTON_WIDTH}
                title={staticTexts.updateEvent ?? "N/A"}
              />
            </CommonButton>
            <DeleteFeatureChangeOrderButtons
              deleteText={staticTexts.delete ?? "N/A"}
              featureData={eventData}
              noChangeOrder
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};
