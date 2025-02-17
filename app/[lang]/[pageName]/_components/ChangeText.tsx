"use client";

import { createPortal } from "react-dom";
import { useState, ChangeEventHandler } from "react";
import axios from "axios";
import { TabType, TextContent } from "@/app/lib/definitions";
import { useParams } from "next/navigation";

export const ChangeText = ({
  textContents,
  onClose,
}: {
  onClose: (tabTypes?: TabType[]) => void;
  textContents: TextContent[];
}) => {
  const parent = document.getElementById("parentModal");
  if (!parent) {
    onClose();
    return null;
  }

  const params = useParams<{ lang: string; pageName: string }>();
  const { lang } = params;

  const startText =
    textContents?.find((item) => item.language === lang)?.text_content ?? "";

  const [tabs, setTabs] = useState<TabType[]>([
    {
      lang: "EN",
      value:
        textContents?.find((item) => item.language === "en")?.text_content ??
        "",
    },
    {
      lang: "UA",
      value:
        textContents?.find((item) => item.language === "ua")?.text_content ??
        "",
    },
    {
      lang: "DE",
      value:
        textContents?.find((item) => item.language === "de")?.text_content ??
        "",
    },
  ]);

  const [selectedTab, setSelectedTab] = useState(lang.toUpperCase());

  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

  const [isTranslateDisabled, setIsTranslateDisabled] = useState(!startText);

  const [inputValue, setInputValue] = useState(startText);

  const getTabStyle = (tab: string) => {
    return tab === selectedTab
      ? {
          borderBottom: "4px solid blue",
          width: "30%",
          display: "flex",
          justifyContent: "center",
        }
      : { width: "30%", display: "flex", justifyContent: "center" };
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setInputValue(event.target.value);

    const index = tabs.findIndex((tab) => tab.lang === selectedTab);
    if (index >= 0) {
      const newTabs = [...tabs];
      newTabs[index].value = event.target.value;
      setTabs(newTabs);

      setIsSaveDisabled(false);

      setIsTranslateDisabled(!event.target.value);
    }
  };

  const handleTranslate = async () => {
    const promises: Promise<any>[] = [];
    const originText = tabs.find((tab) => tab.lang === selectedTab)?.value;
    if (!originText) {
      return;
    }

    const indexes: number[] = [];

    tabs.forEach((tab, index) => {
      if (tab.lang !== selectedTab) {
        promises.push(
          axios.post("/api/translate", {
            text: originText,
            targetLang: tab.lang,
          })
        );
        indexes.push(index);
      }
    });

    try {
      const responses = await Promise.all(promises);

      const tabsNew = [...tabs];

      responses.forEach((response, index) => {
        const tabindex = indexes[index];
        tabsNew[tabindex].value = response.data.translatedText;
      });

      setTabs(tabsNew);
      setIsSaveDisabled(false);
    } catch (error) {
      console.error("Translation error:", error);
    }
  };

  const handleSave = () => {
    onClose(tabs);
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
              Update and Translate Text
            </div>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              {tabs.map((tab) => (
                <div
                  key={tab.lang}
                  style={getTabStyle(tab.lang)}
                  onClick={() => {
                    setSelectedTab(tab.lang);
                    setIsTranslateDisabled(!tab.value);
                    setInputValue(tab.value);
                  }}
                >
                  {tab.lang}
                </div>
              ))}
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "30px",
              }}
            >
              <input
                value={inputValue}
                onChange={handleChange}
                style={{ width: "80%" }}
              />
            </div>

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
              <button onClick={() => onClose()}>Cancel</button>
              <button
                onClick={handleTranslate}
                disabled={isTranslateDisabled}
                style={{ color: isTranslateDisabled ? "lightgray" : "black" }}
              >
                Translate
              </button>
              <button
                onClick={handleSave}
                disabled={isSaveDisabled}
                style={{ color: isSaveDisabled ? "lightgray" : "black" }}
              >
                Save
              </button>
            </div>
          </div>
        </div>,
        parent
      )}
    </div>
  );
};
