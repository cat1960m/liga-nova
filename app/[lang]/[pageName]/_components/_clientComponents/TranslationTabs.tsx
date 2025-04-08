"use client";

import { TabType, TextContent } from "@/app/lib/definitions";
import { useParams } from "next/navigation";
import { ChangeEventHandler, useState } from "react";
import axios from "axios";
import { CommonButton } from "../_buttons/CommonButton";
import { StaticTexts } from "@/app/dictionaries/definitions";
import dynamic from "next/dynamic";

const QuillEditor = dynamic(() => import("./QuillEditor"), { ssr: false });

export const TranslationTabs = ({
  staticTexts,
  onChange,
  tabs,
  setTabs,
  title,
  isArea,
  isQuill,
}: {
  tabs: TabType[];
  setTabs: (tabs: TabType[]) => void;
  staticTexts: StaticTexts;
  onChange?: () => void;
  title: string;
  isArea?: boolean;
  isQuill?: boolean;
}) => {
  const params = useParams<{ lang: string; pageName: string }>();
  const { lang } = params;

  const startText = tabs.find(
    (tab) => tab.langUpperCase === lang.toUpperCase()
  )?.value;

  const [selectedTab, setSelectedTab] = useState(lang.toUpperCase());

  const [isTranslateDisabled, setIsTranslateDisabled] = useState(!startText);

  const [inputValue, setInputValue] = useState(startText);

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [error, setError] = useState("");

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
    handleTextChange(event.target.value);
  };

  const handleTextChange = (value: string) => {
    console.log("handleTextChange", value, selectedTab);

    setInputValue(value);

    const index = tabs.findIndex((tab) => tab.langUpperCase === selectedTab);
    if (index >= 0) {
      const newTabs = [...tabs];
      newTabs[index].value = value;
      setTabs(newTabs);

      onChange?.();

      setIsTranslateDisabled(!value);
    }
  };

  const handleAreaChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setInputValue(event.target.value);

    const index = tabs.findIndex((tab) => tab.langUpperCase === selectedTab);
    if (index >= 0) {
      const newTabs = [...tabs];
      newTabs[index].value = event.target.value;
      setTabs(newTabs);

      onChange?.();

      setIsTranslateDisabled(!event.target.value);
    }
  };

  const handleTranslate = async () => {
    setIsButtonDisabled(true);
    const promises: Promise<any>[] = [];
    const originText = tabs.find(
      (tab) => tab.langUpperCase === selectedTab
    )?.value;
    if (!originText) {
      return;
    }

    const indexes: number[] = [];

    tabs.forEach((tab, index) => {
      if (tab.langUpperCase !== selectedTab) {
        promises.push(
          axios.post("/api/translate", {
            text: originText,
            targetLang: tab.langUpperCase,
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
      onChange?.();
      setError("");
    } catch (error: any) {
      console.error("Translation error:", error);
      setError(error.toString());
    }
    setIsButtonDisabled(false);
  };

  const isPlain = !isArea && !isQuill;
  const isDisabled = isButtonDisabled || isTranslateDisabled;

  return (
    <div
      style={{
        border: "1px dotted lightgray",
        padding: "20px",
        margin: "5px",
      }}
    >
      <div style={{ fontWeight: 700 }}>{title}</div>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        {tabs.map((tab) => (
          <div
            key={tab.langUpperCase}
            style={getTabStyle(tab.langUpperCase)}
            onClick={() => {
              console.log(
                "-------tab click",
                tab.value,
                tab.langUpperCase,
                selectedTab,
                {
                  ...tabs,
                }
              );
              setSelectedTab(tab.langUpperCase);
              setIsTranslateDisabled(!tab.value);
              setInputValue(tab.value);
              console.log(
                "tab click",
                tab.value,
                tab.langUpperCase,
                selectedTab,
                {
                  ...tabs,
                }
              );
            }}
          >
            {tab.langUpperCase}
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
        {isArea ? (
          <textarea
            value={inputValue}
            onChange={handleAreaChange}
            style={{ width: "100%" }}
          />
        ) : null}

        {isPlain ? (
          <input
            value={inputValue}
            onChange={handleChange}
            style={{ width: "100%" }}
          />
        ) : null}

        {isQuill ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <QuillEditor text={inputValue ?? ""} onChange={handleTextChange} />
          </div>
        ) : null}
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
          isDisabled={isDisabled}
          text={staticTexts.translate ?? "N/A"}
        />
      </div>
      {error ? <div style={{ color: "red" }}>{error} </div> : null}
    </div>
  );
};
