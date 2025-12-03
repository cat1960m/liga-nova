"use client";

import { TabType, TranslationTabsHandle } from "@/app/lib/definitions";
import { useParams } from "next/navigation";
import {
  ChangeEventHandler,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import axios from "axios";
import { CommonButton } from "../_buttons/CommonButton";
import { StaticTexts } from "@/app/dictionaries/definitions";
import dynamic from "next/dynamic";
import styles from "./translationTabs.module.css";

const QuillEditor = dynamic(() => import("../QuillEditor/QuillEditor"), {
  ssr: false,
});

type Props = {
  tabs: TabType[];
  setTabs: (tabs: TabType[]) => void;
  staticTexts: StaticTexts;
  onChange?: () => void;
  title: string;
  isArea?: boolean;
  isQuill?: boolean;
};

const TranslationTabsInner = (
  props: Props,
  ref: React.Ref<TranslationTabsHandle>
) => {
  const { staticTexts, onChange, tabs, setTabs, title, isArea, isQuill } =
    props;
  const params = useParams<{ lang: string; pageName: string }>();
  const { lang } = params;

  const startText = useRef<string>(
    tabs.find((tab) => tab.langUpperCase === lang.toUpperCase())?.value ?? ""
  );

  const [selectedTab, setSelectedTab] = useState(lang.toUpperCase());

  const [isTranslateDisabled, setIsTranslateDisabled] = useState(
    !startText.current
  );

  const [inputValue, setInputValue] = useState(startText.current);

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [error, setError] = useState("");

  const restore = () => {
    setSelectedTab(lang.toUpperCase());
    setIsTranslateDisabled(!startText.current);
    setInputValue(startText.current);
  };

  // Expose methods to parent
  useImperativeHandle(ref, () => ({
    restore,
  }));

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    handleTextChange(event.target.value);
  };

  const handleTextChange = (value: string) => {
    setInputValue(value);
    console.log("---===handleTextChange");

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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    } catch (error) {
      if (error) {
        setError(error.toString());
      }
    }
    setIsButtonDisabled(false);
  };

  const isPlain = !isArea && !isQuill;
  const isDisabled = isButtonDisabled || isTranslateDisabled;

  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}:</div>
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <div
            key={tab.langUpperCase}
            className={
              tab.langUpperCase === selectedTab
                ? styles.selected_tab
                : styles.tab
            }
            onClick={() => {
              setSelectedTab(tab.langUpperCase);
              setIsTranslateDisabled(!tab.value);
              setInputValue(tab.value);
            }}
          >
            {tab.langUpperCase}
          </div>
        ))}
      </div>
      <div className={styles.text_container}>
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
          <div className={styles.quill_container}>
            <QuillEditor text={inputValue ?? ""} onChange={handleTextChange} />
          </div>
        ) : null}
      </div>
      <div className={styles.translate_container}>
        <CommonButton
          onClick={handleTranslate}
          isDisabled={isDisabled}
          text={staticTexts.translate ?? "N/A"}
        />
      </div>
      {error ? <div className={styles.red}>{error} </div> : null}
    </div>
  );
};

export const TranslationTabs = forwardRef(TranslationTabsInner);
//TranslationTabs.displayName = "TranslationTabs";
