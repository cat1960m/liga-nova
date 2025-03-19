import { FullData } from "@/app/lib/definitions";
import { INFO_TELEPHONE, INFO_TITLE } from "@/app/lib/constants";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { UpdateDeleteText } from "../UpdateDeleteText";
import { PhoneIcon } from "@heroicons/react/24/solid";

export type Props = {
  data?: FullData;
  isEdit: boolean;
  staticTexts: StaticTexts;
  isArea?: boolean;
};

export const ShowInfoGroupItem_Client = ({
  data,
  isEdit,
  staticTexts,
  isArea,
}: Props) => {
  if (!data) {
    return null;
  }

  const textStyle = {
    fontWeight: data.text_type === INFO_TITLE ? 700 : undefined,
    whiteSpace: "pre-line",
  };

  const isPhone = data.text_type === INFO_TELEPHONE;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        alignItems: "stretch",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        {isPhone ? (
          <PhoneIcon style={{ color: "blue", width: "24px" }} />
        ) : null}
        <p style={textStyle}> {data?.text_content ?? "N/A"}</p>
      </div>
      {isEdit ? (
        <UpdateDeleteText
          staticTexts={staticTexts}
          currentData={data}
          isArea={isArea}
        />
      ) : null}
    </div>
  );
};
