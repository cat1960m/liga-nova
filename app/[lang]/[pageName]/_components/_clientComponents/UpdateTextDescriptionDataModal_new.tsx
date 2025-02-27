"use client";

import { createPortal } from "react-dom";
import { useState, ChangeEventHandler, useEffect } from "react";
import { FullData, TabType, TextContent } from "@/app/lib/definitions";
import { TranslationTabs_new } from "./TranslationTabs_new";
import { CommonButton } from "./CommonButton";
import { StaticTexts } from "@/app/dictionaries/definitions";
import {
  addText,
  getTextContents,
  revalidate,
  updatePrice,
  updateText,
} from "@/app/lib/actions_fitness";
import { usePathname } from "next/navigation";
import { SERVICES, TOOLTIP } from "@/app/lib/constants";

export const UpdateTextDescriptionDataModal_new = ({
  onClose,
  staticTexts,
  currentData,
}: {
  onClose: () => void;
  staticTexts: StaticTexts;
  currentData: FullData;
}) => {
  const [textContents, setTextContents] = useState<TextContent[] | null>(null);
  const [textContentsTooltips, setTextContentsTooltips] = useState<
    TextContent[] | null
  >(null);
  const [tabs, setTabs] = useState<TabType[] | null>([]);
  const [tabsTooltip, setTabsTooltip] = useState<TabType[] | null>(null);

  const pathName = usePathname();

  const textDescriptionId = currentData.text_description_id;
  const currentPrice = currentData.price;
  const isTooltipUsed = currentData.subtype === SERVICES;

  const [priceValue, setPriceValue] = useState<number>(currentPrice ?? 0);

  useEffect(() => {
    const getData = async () => {
      const allContents = await getTextContents({
        text_description_id: textDescriptionId,
      });

      const contents =
        allContents?.filter((content) => content.content_type !== TOOLTIP) ??
        [];
      setTextContents(contents);
      setTabs([
        {
          langUpperCase: "EN",
          value: getLanguageValue({ lang: "en", textContents: contents }),
        },
        {
          langUpperCase: "UA",
          value: getLanguageValue({ lang: "ua", textContents: contents }),
        },
        {
          langUpperCase: "DE",
          value: getLanguageValue({ lang: "de", textContents: contents }),
        },
      ]);

      const contentsTooltips =
        allContents?.filter((content) => content.content_type === TOOLTIP) ??
        [];
      setTextContentsTooltips(contentsTooltips);
      setTabsTooltip([
        {
          langUpperCase: "EN",
          value: getLanguageValue({
            lang: "en",
            textContents: contentsTooltips,
          }),
        },
        {
          langUpperCase: "UA",
          value: getLanguageValue({
            lang: "ua",
            textContents: contentsTooltips,
          }),
        },
        {
          langUpperCase: "DE",
          value: getLanguageValue({
            lang: "de",
            textContents: contentsTooltips,
          }),
        },
      ]);
    };

    getData();
  }, []);

  const parent = document.getElementById("parentModal");
  if (!parent) {
    onClose();
    return null;
  }

  const getLanguageValue = ({
    lang,
    textContents,
  }: {
    lang: string;
    textContents: TextContent[];
  }) =>
    textContents?.find((item) => item.language === lang)?.text_content ?? "";

  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

  if (!textContents || !textContentsTooltips || !tabs || !tabsTooltip) {
    return null;
  }

  const isPriceShown = !!currentPrice || currentPrice === 0;

  const handlePriceChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setPriceValue(parseInt(event.target.value));
    setIsSaveDisabled(false);
  };

  const saveTab = async ({
    text,
    id,
    tabLang,
    contentType,
  }: {
    text: string;
    id?: number;
    tabLang: string;
    contentType: string;
  }) => {
    const textUpdated = text; //!!text ? text : null;
    if (id) {
      return updateText({
        id,
        text: textUpdated,
        pathName,
        contentType,
      });
    }

    return addText({
      textDescriptionId,
      lang: tabLang,
      text: textUpdated,
      pathName,
      contentType,
    });
  };

  const handleSave = async () => {
    setIsSaveDisabled(true);
    const price = isPriceShown ? priceValue : undefined;
    const promises: Promise<any>[] = [];

    tabs.forEach((tab) => {
      const tabLang = tab.langUpperCase.toLocaleLowerCase();
      const textContent = textContents.find(
        ({ language }) => language === tabLang
      );

      promises.push(
        saveTab({
          text: tab.value,
          id: textContent?.id,
          tabLang,
          contentType: "main",
        })
      );
    });

    if (isTooltipUsed) {
      tabsTooltip.forEach((tab) => {
        const tabLang = tab.langUpperCase.toLocaleLowerCase();

        const textContent = textContentsTooltips?.find(
          ({ language }) => language === tabLang
        );

        promises.push(
          saveTab({
            text: tab.value,
            id: textContent?.id,
            tabLang,
            contentType: TOOLTIP,
          })
        );
      });
    }

    if (price) {
      promises.push(updatePrice({ price, textDescriptionId, pathName }));
    }

    await Promise.all(promises);

    await revalidate(pathName);

    onClose();
  };

  return (
    <div>
      {createPortal(
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 180, 200, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              border: "2px solid darkmagenta",
              borderRadius: "5px",
              width: "80%",
            }}
          >
            <div
              style={{
                height: "40px",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 600,
                fontSize: "x-large",
              }}
            >
              {staticTexts["updateTranslate"]}
            </div>

            <TranslationTabs_new
              staticTexts={staticTexts}
              onChange={() => setIsSaveDisabled(false)}
              tabs={tabs}
              setTabs={setTabs}
              title="Text"
            />

            {isTooltipUsed ? (
              <TranslationTabs_new
                staticTexts={staticTexts}
                onChange={() => setIsSaveDisabled(false)}
                tabs={tabsTooltip}
                setTabs={setTabsTooltip}
                title="Tooltip"
              />
            ) : null}

            {isPriceShown ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "20px",
                  gap: "10px",
                }}
              >
                Price:{" "}
                <input
                  type="number"
                  value={priceValue}
                  onChange={handlePriceChange}
                ></input>
                грн
              </div>
            ) : null}

            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                padding: "30px",
                gap: "20px",
              }}
            >
              <CommonButton
                onClick={() => onClose()}
                text={staticTexts.cancel ?? "N/A"}
              />
              <CommonButton
                onClick={handleSave}
                isDisabled={isSaveDisabled}
                text={staticTexts.save ?? "N/A"}
              />
            </div>
          </div>
        </div>,
        parent
      )}
    </div>
  );
};
