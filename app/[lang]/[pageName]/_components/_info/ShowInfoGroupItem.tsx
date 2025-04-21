import { FullData, MainParams } from "@/app/lib/definitions";
import { INFO_BODY, INFO_TELEPHONE, INFO_TITLE } from "@/app/lib/constants";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { PhoneIcon } from "@heroicons/react/24/solid";
import { ItemContainerUpdateDeleteTextDescription } from "../__commonComponents/_itemGroupContainer/ItemContainerUpdateDeleteTextDescription";

export type Props = {
  data?: FullData;
  isEdit: boolean;
  staticTexts: StaticTexts;
  isQuill?: boolean;
  params: MainParams;
};

export const ShowInfoGroupItem = ({
  data,
  isEdit,
  staticTexts,
  isQuill,
  params,
}: Props) => {
  if (!data) {
    return null;
  }

  const textStyle = {
    fontWeight: data.text_type === INFO_TITLE ? 700 : undefined,
    whiteSpace: "pre-line",
  };

  const isPhone = data.text_type === INFO_TELEPHONE;
  const isBody = data.text_type === INFO_BODY;

  return (
    <ItemContainerUpdateDeleteTextDescription
      isEdit={isEdit}
      useItems={{ text: isQuill ? "quill" : "simple" }}
      staticTexts={staticTexts}
      params={params}
      currentData={data}
      isChangeOrder={isBody}
      isHorizontal={false}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          minWidth: "100px",
        }}
      >
        {isPhone ? (
          <PhoneIcon style={{ color: "blue", width: "24px" }} />
        ) : null}
        {!isQuill ? (
          <p style={textStyle}> {data?.text_content ?? "N/A"}</p>
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: data.text_content ?? "N/A",
            }}
          />
        )}
      </div>
    </ItemContainerUpdateDeleteTextDescription>
  );
};
