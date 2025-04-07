import { StaticTexts } from "@/app/dictionaries/definitions";
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
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px",
        justifyContent: "center",
        fontWeight: 700,
      }}
    >
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
