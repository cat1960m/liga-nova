import { FullData, MainParams } from "@/app/lib/definitions";
import {
  DEFAULT_TEXT,
  GROUP1_SUBTYPE,
  GROUP_EXPANDED_SUBTYPE,
} from "@/app/lib/constants";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { ExpandedText } from "../__commonComponents/_expandedText/ExpandedText";
import { UpdateTextDescriptionData } from "../__commonComponents/_upadeModal/UpdateTextDescriptionData";
import { DeleteFeatureButton } from "../__commonComponents/_buttons/DeleteFeatureButton";

export type Props = {
  data: FullData[];
  isEdit: boolean;
  staticTexts: StaticTexts;
  params: MainParams;
};

export const ShowSimpleGroup_Client = ({
  data,
  isEdit,
  staticTexts,
  params,
}: Props) => {
  const firstItem = data[0];
  const isHeader = firstItem.subtype === GROUP1_SUBTYPE;
  const isExpanded = firstItem.subtype === GROUP_EXPANDED_SUBTYPE;

  const textDescriptions = data.filter((item) => !!item.text_description_id);

  const isTextExpandedShown = isExpanded && !isEdit;

  return (
    <div
      style={{
        fontSize: "xx-large",
        fontWeight: 700,
        marginBottom: "10px",
        border: isEdit ? "1px dotted magenta" : undefined,
        padding: isEdit ? "10px 10px 10px 10px" : undefined,
        marginTop: isEdit ? "10px" : undefined,
        gap: isEdit ? "10px" : undefined,
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {isTextExpandedShown ? (
        <ExpandedText
          staticTexts={staticTexts}
          descriptions={data.map((item) => item.text_content ?? "")}
          isHTML
          isButton
        />
      ) : null}
      {!isTextExpandedShown
        ? textDescriptions.map((item) => {
            return (
              <div
                key={item.text_description_id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  border: isEdit ? "1px dotted magenta" : undefined,
                  padding: isEdit ? "10px" : undefined,
                  gap: isEdit ? "10px" : undefined,
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: "200px",
                    height: 0,
                    marginBottom: "20px",
                    border: "2px solid blue",
                  }}
                />
                {item.text_content ?? DEFAULT_TEXT}
              </div>
            );
          })
        : null}
      {isEdit ? (
        <div
          style={{
            display: "flex",
            gap: "5px",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <UpdateTextDescriptionData
            currentData={firstItem}
            staticTexts={staticTexts}
            useItems={{ text: "simple" }}
            params={params}
          />
          <DeleteFeatureButton
            deleteText={staticTexts.delete ?? "N/A"}
            featureData={data}
          />
        </div>
      ) : null}
    </div>
  );
};
