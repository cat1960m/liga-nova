import { FeatureChild, TextContent } from "@/app/lib/definitions";
import { GROUP1 } from "@/app/lib/constants";
import { UpdateTextDescriptionData } from "./UpdateTextDescriptionData";
import { DeleteFeatureButton } from "./DeleteFeatureButton";
import { getTextContents } from "@/app/lib/actions_fitness";
import { getDictionary } from "../../dictionaries";
import { getLocalizedText } from "@/app/lib/utils";

export const ShowSimpleGroup = async ({
  featureChild,
  lang,
  textDescriptionId,
}: {
  featureChild: FeatureChild;
  lang: string;
  textDescriptionId: number;
}) => {
  const textContents: TextContent[] | null = await getTextContents({
    text_description_id: textDescriptionId,
  });
  const dict = await getDictionary(lang as "en" | "ua"); // en

  const isLarge = featureChild.subtype === GROUP1;
  const style = {
    fontSize: isLarge ? "xx-large" : "large",
    fontWeight: isLarge ? 700 : 400,
    padding: "20px",
    border: "1px dotted gray",
  };

  const text = getLocalizedText({ textContents, lang });

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
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <UpdateTextDescriptionData
          textContents={textContents ?? []}
          textDescriptionId={textDescriptionId}
          staticTexts={dict.common}
        />
        <DeleteFeatureButton
          featureId={featureChild.id}
          deleteText={dict.common.delete}
        />
      </div>
    </div>
  );
};
