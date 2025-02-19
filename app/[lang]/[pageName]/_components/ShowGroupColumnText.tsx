import { HEADER1, HEADER2 } from "@/app/lib/constants";
import { TextContent } from "@/app/lib/definitions";
import { getLocalizedText } from "@/app/lib/utils";

export type Props = {
  textType: string;
  lang: string;
  textContents: TextContent[] | null;
};

export const ShowGroupColumnText = ({
  textType,
  lang,
  textContents,
}: Props) => {
  const text = getLocalizedText({ textContents, lang });

  const isHeader = [HEADER1, HEADER2].includes(textType);

  return (
    <div
      style={{
        flexGrow: 2,
        display: "flex",
        flexWrap: "wrap",
        fontWeight: isHeader ? 700 : 400,
        gap: "10px",
        alignItems: "center",
      }}
    >
      {!isHeader ? (
        <div
          style={{
            width: "16px",
            height: "16px",
            borderRadius: "8px",
            border: "2px solid blue",
            color: "blue",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "small",
          }}
        >
          v
        </div>
      ) : null}
      {text}
    </div>
  );
};
