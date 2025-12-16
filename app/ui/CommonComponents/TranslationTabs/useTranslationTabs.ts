"use client";

import {
  addTextData,
  getTextContentsData,
  updateTextData,
} from "@/app/lib/actionsContainer";
import {
  CONTENT_TYPE_MAIN,
  CONTENT_TYPE_TOOLTIP,
  TRANSLATE_LANGUAGES,
} from "@/app/lib/constants";
import { TabType, TextContent } from "@/app/lib/definitions";
import { useCallback, useEffect, useState } from "react";

export const useTranslationTabs = (
  textDescriptionId?: number,
  isNumber?: boolean
) => {
  const [textContentsMain, setTextContentsMain] = useState<
    TextContent[] | null
  >(null);
  const [textContentsTooltips, setTextContentsTooltips] = useState<
    TextContent[] | null
  >(null);

  const [tabsMain, setTabsMain] = useState<TabType[] | null>(null);
  const [tabsTooltip, setTabsTooltip] = useState<TabType[] | null>(null);

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

    const contentsMain =
      allContents?.filter(
        (content) => content.content_type === CONTENT_TYPE_MAIN
      ) ?? [];
    setTextContentsMain(contentsMain);
    setTabsMain(
      TRANSLATE_LANGUAGES.map((language) => ({
        langUpperCase: language,
        value: getLanguageValue({
          lang: language.toLocaleLowerCase(),
          textContents: contentsMain,
        }),
      }))
    );

    const contentsTooltips =
      allContents?.filter(
        (content) => content.content_type === CONTENT_TYPE_TOOLTIP
      ) ?? [];
    setTextContentsTooltips(contentsTooltips);
    setTabsTooltip(
      TRANSLATE_LANGUAGES.map((language) => ({
        langUpperCase: language,
        value: getLanguageValue({
          lang: language.toLocaleLowerCase(),
          textContents: contentsTooltips,
        }),
      }))
    );
  }, [textDescriptionId]);

  useEffect(() => {
    const ff = async () => {
      await getTextData();
    };
    ff();
  }, [getTextData]);

  const saveTabs = ({
    tabs,
    textContents,
    promises,
    contentType,
  }: {
    tabs: TabType[];
    textContents: TextContent[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    promises: Promise<any>[];
    contentType: string;
  }) => {
    if (!textDescriptionId) {
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const saveTabsMain = (promises: Promise<any>[]) => {
    if (!tabsMain || !textContentsMain) {
      return;
    }
    saveTabs({
      tabs: tabsMain,
      textContents: textContentsMain,
      contentType: CONTENT_TYPE_MAIN,
      promises,
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const saveTabsTooltip = (promises: Promise<any>[]) => {
    if (!tabsTooltip || !textContentsTooltips) {
      return;
    }
    saveTabs({
      tabs: tabsTooltip,
      textContents: textContentsTooltips,
      contentType: CONTENT_TYPE_TOOLTIP,
      promises,
    });
  };

  const numberTab = isNumber
    ? tabsMain?.find((item) => !!item.value.length)
    : null;
  const numberValue = isNumber ? parseInt(numberTab?.value ?? "") : null;

  return {
    saveTabsMain,
    saveTabsTooltip,
    tabsMain: tabsMain,
    setTabsMain,
    tabsTooltip: tabsTooltip,
    setTabsTooltip,
   // restoreTabs: getTextData,
    numberValue,
  };
};
