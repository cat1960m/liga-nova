"use client";

import {
  addTextData,
  getTextContentsData,
  updateTextData,
} from "@/app/lib/actionsContainer";
import { TRANSLATE_LANGUAGES } from "@/app/lib/constants";
import { TabType, TextContent } from "@/app/lib/definitions";
import { useCallback, useEffect,  useState } from "react";

export const useTranslationTabsContainerType = ({
  textDescriptionId,
  contentType,
  lang,
}: {
  textDescriptionId?: number;
  contentType: string;
  lang: string;
}) => {
  const [textContents, setTextContents] = useState<TextContent[] | null>(null);

  const [tabs, setTabs] = useState<TabType[] | null>(null);
  const [startText, setStartText] = useState<string | null>(null);

  const getLanguageValue = ({
    lang,
    textContents,
  }: {
    lang: string;
    textContents: TextContent[];
  }) =>
    textContents?.find((item) => item.language === lang)?.text_content ?? "";

  const getTextData = useCallback(async () => {
    const allContents = textDescriptionId
      ? await getTextContentsData({
          text_description_id: textDescriptionId,
        })
      : [];

    const contents =
      allContents?.filter((content) => content.content_type === contentType) ??
      [];
    setTextContents(contents);

    const newTabs: TabType[] = TRANSLATE_LANGUAGES.map((language) => ({
      langUpperCase: language,
      value: getLanguageValue({
        lang: language.toLocaleLowerCase(),
        textContents: contents,
      }),
    }));

    if (!tabs) {
      const str = newTabs.find((tab) => tab.langUpperCase === lang.toUpperCase())?.value ??
        "";
      setStartText(str);
    }
    setTabs(newTabs);
  }, [textDescriptionId, lang, tabs, contentType]);

  useEffect(() => {
    if(!!tabs) {
      return;
    }
     getTextData();
  }, [getTextData, tabs]);

  const saveTabs = ({
    promises,
  }: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    promises: Promise<any>[];
  }) => {
    if (!textDescriptionId || !tabs || !textContents) {
      return;
    }
    tabs.forEach((tab) => {
      const tabLang = tab.langUpperCase.toLocaleLowerCase();
      const textContent = textContents.find(
        ({ language }) => language === tabLang
      );

      if (textContent?.id) {
        promises.push(
          updateTextData({
            id: textContent?.id,
            text: tab.value,
            contentType,
          })
        );
      } else {
        promises.push(
          addTextData({
            textDescriptionId,
            lang: tabLang,
            text: tab.value,
            contentType,
          })
        );
      }
    });
  };


  return {
    saveTabs,
    tabs,
    setTabs,
    startText
  };
};
