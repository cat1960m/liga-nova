import { FullData } from "@/app/lib/definitions";
import { INFO_TITLE } from "@/app/lib/constants";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { UpdateDeleteText } from "./UpdateDeleteTexr";

export type Props = {
  data?: FullData;
  isEdit: boolean;
  staticTexts: StaticTexts;
};

export const ShowInfoGroupItem_Client = ({
  data,
  isEdit,
  staticTexts,
}: Props) => {
  if (!data) {
    return null;
  }

  const textStyle = {
    fontWeight: data.text_type === INFO_TITLE ? 700 : undefined,
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        alignItems: "stretch",
      }}
    >
      <div style={textStyle}> {data?.text_content ?? "N/A"}</div>
      {isEdit ? (
        <UpdateDeleteText staticTexts={staticTexts} currentData={data} />
      ) : null}
    </div>
  );
};
