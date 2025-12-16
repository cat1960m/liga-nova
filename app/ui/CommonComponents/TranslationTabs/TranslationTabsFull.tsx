"use client";

import { TranslationTabsHandle } from "@/app/lib/definitions";
import { useParams } from "next/navigation";
import {
  ChangeEventHandler,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import axios from "axios";
import { CommonButton } from "../_buttons/CommonButton";
import { StaticTexts } from "@/app/dictionaries/definitions";
import dynamic from "next/dynamic";
import styles from "./translationTabs.module.css";
import { useTranslationTabsContainerType } from "./hooks/useTranslationTabsContainerType";

const QuillEditor = dynamic(() => import("../QuillEditor/QuillEditor"), {
  ssr: false,
});

type Props = {
  staticTexts: StaticTexts;
  onChange?: () => void;
  title: string;
  isArea?: boolean;
  isQuill?: boolean;
  textDescriptionId: number;
  contentType: string;
  inputValue?: string;
  setInputValue: (value: string) => void;
};

const TranslationTabsFullInner = (
  props: Props,
  ref: React.Ref<TranslationTabsHandle>
) => {
  const {
    staticTexts,
    onChange,
    textDescriptionId,
    contentType,
    title,
    isArea,
    isQuill,
    inputValue,
    setInputValue,
  } = props;
  const params = useParams<{ lang: string; pageName: string }>();
  const { lang } = params;

  const { tabs, setTabs, startText, saveTabs } =
    useTranslationTabsContainerType({
      textDescriptionId,
      contentType,
      lang,
    });
  const [selectedTab, setSelectedTab] = useState(lang.toUpperCase());

  const [isTranslateDisabled, setIsTranslateDisabled] = useState(true);

  useEffect(() => {
    if (startText !== null) {
      setInputValue(startText);
      setIsTranslateDisabled(!startText.length);
    }
  }, [startText, setInputValue]);

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [error, setError] = useState("");

  const restore = () => {
    setSelectedTab(lang.toUpperCase());
    setIsTranslateDisabled(!startText);
    setInputValue(startText ?? "");
  };

  // Expose methods to parent
  useImperativeHandle(ref, () => ({
    restore,
    saveTabs,
  }));

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    handleTextChange(event.target.value);
  };

  if (!tabs) {
    return null;
  }

  const handleTextChange = (value: string) => {
    if (inputValue === undefined) {
      return;
    }
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
      <div className={styles.title_container}>
        <div className={styles.title}>{title}:</div>
        <CommonButton
          onClick={handleTranslate}
          isDisabled={isDisabled}
          text={staticTexts.translate ?? "N/A"}
        />
      </div>

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
            value={inputValue ?? ""}
            onChange={handleAreaChange}
            style={{ width: "100%" }}
          />
        ) : null}

        {isPlain ? (
          <input
            value={inputValue ?? ""}
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
      {error ? <div className={styles.red}>{error} </div> : null}
    </div>
  );
};

export const TranslationTabsFull = forwardRef(TranslationTabsFullInner);
