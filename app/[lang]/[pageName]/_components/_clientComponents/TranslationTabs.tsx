"use client";

import { TabType, TextContent } from "@/app/lib/definitions";
import { useParams } from "next/navigation";
import { ChangeEventHandler, useState } from "react";
import axios from "axios";
import { CommonButton } from "./CommonButton";
import { StaticTexts } from "@/app/dictionaries/definitions";

export const TranslationTabs = ({
  textContents,
  staticTexts,
  onChange,
  tabs,
  setTabs,
  title,
}: {
  tabs: TabType[];
  setTabs: (tabs: TabType[]) => void;
  textContents: TextContent[];
  staticTexts: StaticTexts;
  onChange: () => void;
  title: string;
}) => {
  const params = useParams<{ lang: string; pageName: string }>();
  const { lang } = params;

  const startText =
    textContents?.find((item) => item.language === lang)?.text_content ?? "N/A";

  const [selectedTab, setSelectedTab] = useState(lang.toUpperCase());

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

      onChange();

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
      onChange();
    } catch (error) {
      console.error("Translation error:", error);
    }
  };

  return (
    <div
      style={{
        border: "1px dotted lightgray",
        padding: "20px",
        margin: "20px",
      }}
    >
      <div style={{ fontWeight: 700 }}>{title}</div>
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
          padding: "30px 50px 10px 50px",
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
          padding: "0 30px",
        }}
      >
        <CommonButton
          onClick={handleTranslate}
          isDisabled={isTranslateDisabled}
          text={staticTexts.translate ?? "N/A"}
        />
      </div>
    </div>
  );
};
