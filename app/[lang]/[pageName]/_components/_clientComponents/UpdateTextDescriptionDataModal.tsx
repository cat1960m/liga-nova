"use client";

import { createPortal } from "react-dom";
import { useState, ChangeEventHandler } from "react";
import { TabType, TextContent } from "@/app/lib/definitions";
import { TranslationTabs } from "./TranslationTabs";
import { CommonButton } from "./CommonButton";
import { StaticTexts } from "@/app/dictionaries/definitions";

export const UpdateTextDescriptionDataModal = ({
  textContents,
  textContentsTooltip,
  onClose,
  staticTexts,
  currentPrice,
  isTooltipUsed,
}: {
  onClose: (data?: {
    tabs: TabType[];
    price?: number;
    tabsTooltip: TabType[];
  }) => void;
  textContents: TextContent[];
  textContentsTooltip?: TextContent[] | null;
  currentPrice?: number;
  staticTexts: StaticTexts;
  isTooltipUsed?: boolean;
}) => {
  const [priceValue, setPriceValue] = useState<number>(currentPrice ?? 0);
  const parent = document.getElementById("parentModal");
  if (!parent) {
    onClose();
    return null;
  }

  const getLanguageValue = (lang: string) =>
    textContents?.find((item) => item.language === lang)?.text_content ?? "N/A";

  const [tabs, setTabs] = useState<TabType[]>([
    {
      langUpperCase: "EN",
      value: getLanguageValue("en"),
    },
    {
      langUpperCase: "UA",
      value: getLanguageValue("ua"),
    },
    {
      langUpperCase: "DE",
      value: getLanguageValue("de"),
    },
  ]);

  const getLanguageValueTooltip = (lang: string) =>
    textContentsTooltip?.find((item) => item.language === lang)?.text_content ??
    "";

  const [tabsTooltip, setTabsTooltip] = useState<TabType[]>([
    {
      langUpperCase: "EN",
      value: getLanguageValueTooltip("en"),
    },
    {
      langUpperCase: "UA",
      value: getLanguageValueTooltip("ua"),
    },
    {
      langUpperCase: "DE",
      value: getLanguageValueTooltip("de"),
    },
  ]);

  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

  const isPriceShown = !!currentPrice || currentPrice === 0;

  const handleSave = () => {
    onClose({
      tabs,
      price: isPriceShown ? priceValue : undefined,
      tabsTooltip,
    });
  };

  const handlePriceChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setPriceValue(parseInt(event.target.value));
    setIsSaveDisabled(false);
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

            <TranslationTabs
              textContents={textContents}
              staticTexts={staticTexts}
              onChange={() => setIsSaveDisabled(false)}
              tabs={tabs}
              setTabs={setTabs}
              title="Text"
            />

            {isTooltipUsed ? (
              <TranslationTabs
                textContents={textContentsTooltip ?? []}
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
