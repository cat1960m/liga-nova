import { FullData } from "@/app/lib/definitions";
import {
  SCHEDULE_ITEM1,
  SCHEDULE_ITEM2,
  SCHEDULE_ITEM3,
  SCHEDULE_ITEM4,
  SCHEDULE_ITEM5,
  SCHEDULE_ITEM6,
} from "@/app/lib/constants";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { UpdateDeleteTextButtons } from "../_buttons/UpdateDeleteTextButtons";

export type Props = {
  data?: FullData;
  isEdit: boolean;
  staticTexts: StaticTexts;
};

export const ShowSCheduleGroupItem = ({ data, isEdit, staticTexts }: Props) => {
  if (!data) {
    return null;
  }

  const isColumn1 = [SCHEDULE_ITEM1, SCHEDULE_ITEM4].includes(data.text_type);
  const isColumn3 = [SCHEDULE_ITEM3, SCHEDULE_ITEM6].includes(data.text_type);

  const fontWeight = isColumn3 ? 400 : 700;
  const color = isColumn1 ? "blue" : "black";
  const fontSize = isColumn1 ? 18 : 16;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        alignItems: "stretch",
        padding: "17px 30px",
      }}
    >
      <div
        style={{
          fontWeight,
          color,
          fontSize,
          display: "flex",
          justifyContent: isColumn3 ? "flex-start" : "center",
          height: "20px",
          alignItems: "center",
        }}
      >
        {data?.text_content ?? "N/A"}
      </div>
      {isEdit ? (
        <UpdateDeleteTextButtons staticTexts={staticTexts} currentData={data} />
      ) : null}
    </div>
  );
};
