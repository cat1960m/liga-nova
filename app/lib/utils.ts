import { DEFAULT_TEXT } from "./constants";
import { FullData, TextContent } from "./definitions";

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

export const getContainerData = ({
  pageFullData,
  featureId,
}: {
  pageFullData: FullData[];
  featureId: number | null;
}) => {
  const pageData: Record<string, FullData[]> = {};

  if (!featureId) {
    return pageData;
  }

  pageFullData?.forEach((item) => {
    const isPageChild = item.parent_feature_id === featureId;
    if (isPageChild) {
      const value = pageData[item.id] ?? [];
      pageData[item.id] = [...value, item];
    }
  });

  return pageData;
};
