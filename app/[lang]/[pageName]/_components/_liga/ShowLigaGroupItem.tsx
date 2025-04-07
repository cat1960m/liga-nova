import { FullData } from "@/app/lib/definitions";
import {
  LIGA_ADDRESS,
  LIGA_SERVICE,
  LIGA_TELEPHONE,
  LIGA_TITLE,
} from "@/app/lib/constants";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { UpdateDeleteText } from "../UpdateDeleteText";
import { PhoneIcon, MapPinIcon } from "@heroicons/react/24/solid";

export type Props = {
  data?: FullData;
  isEdit: boolean;
  staticTexts: StaticTexts;
};

export const ShowLigaGroupItem = ({ data, isEdit, staticTexts }: Props) => {
  if (!data) {
    return null;
  }

  const isTitle = data.text_type === LIGA_TITLE;

  const textStyle = {
    fontWeight: isTitle ? 700 : undefined,
    fontSize: data.text_type === LIGA_TITLE ? 24 : 16,
  };

  const isPhone = data.text_type === LIGA_TELEPHONE;

  const isAddress = data.text_type === LIGA_ADDRESS;

  const isService = data.text_type === LIGA_SERVICE;

  return (
    <div>
      {isTitle ? (
        <div
          style={{
            width: "100px",
            height: 0,
            marginBottom: "10px",
            borderTop: "3px solid blue",
          }}
        />
      ) : null}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          alignItems: "stretch",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          {isAddress ? (
            <MapPinIcon style={{ color: "blue", width: "24px" }} />
          ) : null}

          {isPhone ? (
            <PhoneIcon style={{ color: "blue", width: "24px" }} />
          ) : null}

          {isService ? (
            <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
              <img src={data.value} alt="icon" />
              <div style={textStyle}> {data?.text_content ?? "N/A"}</div>
            </div>
          ) : null}

          {!isService ? (
            <p style={textStyle}> {data?.text_content ?? "N/A"}</p>
          ) : null}
        </div>
        {isEdit ? (
          <UpdateDeleteText
            staticTexts={staticTexts}
            currentData={data}
            useIcons={isService}
          />
        ) : null}
      </div>
    </div>
  );
};
