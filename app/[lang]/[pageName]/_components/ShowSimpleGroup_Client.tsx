import { FullData } from "@/app/lib/definitions";
import { DEFAULT_TEXT, GROUP1 } from "@/app/lib/constants";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { DeleteFeatureButton } from "./_clientComponents/DeleteFeatureButton";
import { UpdateTextDescriptionData_new } from "./_clientComponents/UpdateTextDescriptionData_new";

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
  const isLarge = data.subtype === GROUP1;
  const style = {
    fontSize: isLarge ? "xx-large" : "large",
    fontWeight: isLarge ? 700 : 400,
    //padding: "20px",
    marginBottom: "10px",
    border: isEdit ? "1px dotted magenta" : undefined,
  };

  const text = data.text_content ?? DEFAULT_TEXT + "!!";

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
      {text}

      {isEdit ? (
        <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
          <UpdateTextDescriptionData_new
            currentData={data}
            staticTexts={staticTexts}
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
