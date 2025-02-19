import { DEFAULT_TEXT } from "./constants";
import { TextContent } from "./definitions";

export const getLocalizedText = ({
  textContents,
  lang,
}: {
  textContents: TextContent[] | null;
  lang: string;
}) => {
  const textContentsLocalized = textContents?.filter(
    (item) => item.language === lang
  )?.[0];
  const text = textContentsLocalized?.text_content || DEFAULT_TEXT;
  return text;
};
