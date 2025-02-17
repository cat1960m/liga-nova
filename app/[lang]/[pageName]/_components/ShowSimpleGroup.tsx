import { FeatureChild, TextContent } from "@/app/lib/definitions";
import { DEFAULT_TEXT, GROUP1 } from "@/app/lib/constants";
import { EditText } from "./EditText";
import { DeleteButton } from "./DeleteButton";

export const ShowSimpleGroup = ({
  featureChild,
  textContents,
  lang,
  textDescriptionId,
}: {
  featureChild: FeatureChild;
  textContents: TextContent[];
  lang: string;
  textDescriptionId: number;
}) => {
  const isLarge = featureChild.subtype === GROUP1;
  const style = {
    fontSize: isLarge ? "xx-large" : "large",
    fontWeight: isLarge ? 700 : 400,
    padding: "20px",
    border: "1px dotted gray",
  };

  const languageText = textContents?.find((text) => text.language === lang);
  const text = languageText?.text_content ?? DEFAULT_TEXT;

  return (
    <div style={style}>
      {text}
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <EditText
          textContents={textContents}
          textDescriptionId={textDescriptionId}
        />
        <DeleteButton featureId={featureChild.id} />
      </div>
    </div>
  );
};
