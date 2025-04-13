import { FullData, MainParams, PageData } from "@/app/lib/definitions";
import {
  LIGA_ADDRESS,
  LIGA_SERVICE,
  LIGA_TELEPHONE,
  LIGA_TITLE,
} from "@/app/lib/constants";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { UpdateDeleteTextButtons } from "../_buttons/UpdateDeleteTextButtons";
import { PhoneIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { PagesSelect } from "./PagesSelect";

export type Props = {
  data?: FullData;
  isEdit: boolean;
  staticTexts: StaticTexts;
  pages?: PageData[] | null;
  onLinkUpdated: () => void;
};

export const ShowLigaGroupItem = ({
  data,
  isEdit,
  staticTexts,
  pages,
  onLinkUpdated,
}: Props) => {
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
          border: isEdit ? "1px dotted magenta" : undefined,
          padding: isEdit ? "10px" : undefined,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          {isAddress ? (
            <MapPinIcon style={{ color: "blue", width: "24px" }} />
          ) : null}

          {isPhone ? (
            <PhoneIcon style={{ color: "blue", width: "24px" }} />
          ) : null}

          {!isService ? (
            <p style={textStyle}> {data?.text_content ?? "N/A"}</p>
          ) : null}

          {isService ? (
            <div
              style={{
                width: "100%",
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "5px",
                  alignItems: "center",
                }}
              >
                <img src={data.value} alt="icon" />
                <div style={textStyle}> {data?.text_content ?? "N/A"}</div>
              </div>

              {isEdit && pages ? (
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap",
                    alignItems: "center",
                  }}
                >
                  <div>{staticTexts.linkTo} </div>

                  <PagesSelect
                    textDescriptionId={data.text_description_id}
                    link={data.link ?? ""}
                    pages={pages}
                    onLinkUpdated={onLinkUpdated}
                  />
                </div>
              ) : null}
            </div>
          ) : null}
        </div>

        {isEdit ? (
          <UpdateDeleteTextButtons
            staticTexts={staticTexts}
            currentData={data}
            useIcons={isService}
            usePageLinkSelect
            changeOrderTextType={isService ? LIGA_SERVICE : undefined}
          />
        ) : null}
      </div>
    </div>
  );
};
