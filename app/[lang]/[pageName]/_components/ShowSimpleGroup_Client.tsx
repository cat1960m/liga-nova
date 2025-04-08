import { FullData } from "@/app/lib/definitions";
import { DEFAULT_TEXT, GROUP1_SUBTYPE } from "@/app/lib/constants";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { DeleteFeatureButton } from "./_buttons/DeleteFeatureButton";
import { UpdateTextDescriptionData } from "./_clientComponents/UpdateTextDescriptionData";

export type Props = {
  data: FullData;
  isEdit: boolean;
  staticTexts: StaticTexts;
};

export const ShowSimpleGroup_Client = ({
  data,
  isEdit,
  staticTexts,
}: Props) => {
  const isLarge = data.subtype === GROUP1_SUBTYPE;
  const style = {
    fontSize: isLarge ? "xx-large" : undefined,
    fontWeight: isLarge ? 700 : undefined,
    marginBottom: "10px",
    border: isEdit ? "1px dotted magenta" : undefined,
    padding: isEdit ? "5px" : undefined,
  };

  const text = data.text_content ?? DEFAULT_TEXT + "!!";

  const sanitizedContent = text; //DOMPurify.sanitize(text);

  return (
    <div style={style}>
      {isLarge ? (
        <div
          style={{
            width: "200px",
            height: 0,
            marginBottom: "20px",
            border: "2px solid blue",
          }}
        />
      ) : null}
      {isLarge ? text : null}
      {!isLarge ? (
        <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
      ) : null}

      {isEdit ? (
        <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
          <UpdateTextDescriptionData
            currentData={data}
            staticTexts={staticTexts}
            isQuill={!isLarge}
          />

          <DeleteFeatureButton
            featureId={data.id}
            deleteText={staticTexts.delete ?? "N/A"}
            featureData={[data]}
          />
        </div>
      ) : null}
    </div>
  );
};
