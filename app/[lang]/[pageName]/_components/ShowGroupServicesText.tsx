import { TextContent } from "@/app/lib/definitions";
import { getLocalizedText } from "@/app/lib/utils";

export type Props = {
  textType: string;
  lang: string;
  textContents: TextContent[] | null;
  textContentsTooltip: TextContent[] | null;
  price: number;
};

export const ShowGroupServicesText = ({
  textType,
  lang,
  textContents,
  textContentsTooltip,
  price,
}: Props) => {
  const text = getLocalizedText({ textContents, lang });
  const title = getLocalizedText({ textContents: textContentsTooltip, lang });

  return (
    <div
      style={{
        flexGrow: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div
        title={title}
        style={{ display: "flex", alignItems: "center", gap: "5px" }}
      >
        {text}
        {title ? (
          <div
            style={{
              display: "flex",
              width: "16px",
              height: "16px",
              borderRadius: "8px",
              border: "1px solid blue",
              color: "blue",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            i
          </div>
        ) : null}
      </div>
      <div>{`${price} грн`}</div>
    </div>
  );
};
