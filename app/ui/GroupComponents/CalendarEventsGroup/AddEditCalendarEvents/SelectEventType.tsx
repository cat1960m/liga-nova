import { StaticTexts } from "@/app/dictionaries/definitions";

import styles from "./addEditCalendarEvents.module.css";

import {
  CALENDAR_EVENTS_AUTHOR_SUBTYPE,
  CALENDAR_EVENTS_COMMON_SUBTYPE,
  CALENDAR_EVENTS_SPECIAL_SUBTYPE,
} from "@/app/lib/constants";

export type Props = {
  staticTexts: StaticTexts;
  type: string;
  setType: (value: string) => void;
};

export const SelectEventType = ({ staticTexts, type, setType }: Props) => {
  return (
    <div className={styles.type}>
      {`${staticTexts.type}:`}
      <select
        value={type}
        onChange={(event) => {
          setType(event.target.value);
        }}
      >
        {[
          CALENDAR_EVENTS_COMMON_SUBTYPE,
          CALENDAR_EVENTS_AUTHOR_SUBTYPE,
          CALENDAR_EVENTS_SPECIAL_SUBTYPE,
        ].map((item, index) => {
          return (
            <option key={index} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};
