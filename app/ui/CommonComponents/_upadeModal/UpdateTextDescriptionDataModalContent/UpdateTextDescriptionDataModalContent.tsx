"use client";

import { useState, ChangeEventHandler, useEffect, useMemo } from "react";
import {
  FullData,
  PageData,
  TabType,
  TextContent,
} from "@/app/lib/definitions";
import { TranslationTabs } from "../../TranslationTabs/TranslationTabs";
import { CommonButton } from "../../_buttons/CommonButton";
import { StaticTexts } from "@/app/dictionaries/definitions";
import {
  addText,
  getPageFullData,
  getPageTitles,
  getTextContents,
  revalidate,
  updatePriceValueLink,
  updateText,
} from "@/app/lib/actions_fitness";
import { usePathname } from "next/navigation";
import { ICON_SIZE, TOOLTIP, TRANSLATE_LANGUAGES } from "@/app/lib/constants";

import styles from "./updateTextDescriptionDataModalContent.module.css";
import axios from "axios";
import Image from "next/image";

export type UseItems = {
  text?: "simple" | "area" | "quill";
  tooltip?: "simple" | "area" | "quill";
  price?: "price" | "color";
  link?: boolean;
  value?: "icons" | "time" | "image" | "price";
};

export type Props = {
  onClose: () => void;
  currentData: FullData;
  lang: string;
  staticTexts: StaticTexts;
  useItems: UseItems;
};

export const UpdateTextDescriptionDataModalContent = ({
  onClose,
  currentData,
  staticTexts,
  lang,
  useItems,
}: Props) => {
  const [textContents, setTextContents] = useState<TextContent[] | null>(null);
  const [textContentsTooltips, setTextContentsTooltips] = useState<
    TextContent[] | null
  >(null);
  const [tabs, setTabs] = useState<TabType[] | null>([]);
  const [tabsTooltip, setTabsTooltip] = useState<TabType[] | null>(null);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

  const pathName = usePathname();

  const textDescriptionId = currentData.text_description_id;

  const [priceValue, setPriceValue] = useState<number>(currentData.price ?? 0);
  const [icons, setIcons] = useState<FullData[]>([]);
  const [currentValue, setCurrentValue] = useState<string | undefined>(
    currentData.value ?? ""
  );
  const [linkValue, setLinkValue] = useState<string>(
    useItems.link ? currentData.link ?? "" : ""
  );
  const [pages, setPages] = useState<PageData[] | null>(null);
  const [file, setFile] = useState<File | null>(null);

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
      setTabsTooltip(
        TRANSLATE_LANGUAGES.map((language) => ({
          langUpperCase: language,
          value: getLanguageValue({
            lang: language.toLocaleLowerCase(),
            textContents: contentsTooltips,
          }),
        }))
      );
    };

    const getIcons = async () => {
      const pageFullData: FullData[] | null = await getPageFullData({
        lang: "en",
        pageName: "icon",
      });

      setIcons(pageFullData ?? []);
    };

    const getPages = async () => {
      const pages1 = await getPageTitles(lang);

      setPages(pages1?.map((page) => page) ?? []);
    };

    getData();

    if (useItems.value === "icons") {
      getIcons();
    }

    if (useItems.link) {
      getPages();
    }
  }, [lang, textDescriptionId, useItems.value, useItems.link]);

  const pagesOptions = useMemo(() => {
    const mainOptions =
      pages?.map((page) => (
        <option key={page.name} value={page.name}>
          {page.text_content}
        </option>
      )) ?? [];
    return [
      <option key={0} value={""}>
        {"no page"}
      </option>,
      ...mainOptions,
    ];
  }, [pages]);

  const handleChange = () => {
    setIsSaveDisabled(false);
  };

  const getLanguageValue = ({
    lang,
    textContents,
  }: {
    lang: string;
    textContents: TextContent[];
  }) =>
    textContents?.find((item) => item.language === lang)?.text_content ?? "";

  if (!textContents || !textContentsTooltips || !tabs || !tabsTooltip) {
    return null;
  }

  const saveTab = ({
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const promises: Promise<any>[] = [];

    const path = await UploadFile();

    if (useItems.price || useItems.value || useItems.link) {
      const newValue = path ?? (useItems.value ? currentValue : undefined);
      const price = useItems.price !== undefined ? priceValue : undefined;
      const link = useItems.link ? linkValue : undefined;

      promises.push(
        updatePriceValueLink({
          price,
          textDescriptionId,
          pathName,
          value: newValue,
          link,
        })
      );
    }
    if (useItems.text || useItems.tooltip) {
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
    }

    if (useItems.tooltip) {
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

    await Promise.all(promises);

    await revalidate(pathName);

    onClose();
  };

  const handlePriceChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value;
    setPriceValue(parseInt(value));
    setIsSaveDisabled(false);

    if (value && useItems.value === "price") {
      setCurrentValue("");
    }
  };

  const handleValueChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setCurrentValue(event.target.value);
    setIsSaveDisabled(false);
  };

  const handlePageChange: ChangeEventHandler<HTMLSelectElement> = async (
    event
  ) => {
    setLinkValue(event.target.value);
    setIsSaveDisabled(false);
  };

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files?.[0];

    if (file) {
      setFile(file);
      setIsSaveDisabled(false);
    }
  };

  const UploadFile = async () => {
    if (!file) return undefined;

    console.log("%%%%%%%%%%--------$$$$$$ try delete image", currentValue);

    const response = await axios.post("/api/uploadFile", {
      fileName: file.name,
      fileType: file.type,
      file,
      s3Key: currentValue,
    });

    const signedUrl = response.data.signedUrl;

    await fetch(signedUrl, {
      method: "PUT",
      body: file,
      headers: { "Content-Type": file.type },
    });

    const path = signedUrl.split("?")[0];

    //onUploaded?.(path);
    setFile(null);
    return path;
  };

  const handleColorChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setPriceValue(parseInt(event.target.value));
    setIsSaveDisabled(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>{staticTexts["updateTranslate"]}</div>

      {!!useItems.text ? (
        <TranslationTabs
          staticTexts={staticTexts}
          onChange={handleChange}
          tabs={tabs}
          setTabs={setTabs}
          title="Text"
          isArea={useItems.text === "area"}
          isQuill={useItems.text === "quill"}
        />
      ) : null}

      {!!useItems.tooltip ? (
        <TranslationTabs
          staticTexts={staticTexts}
          onChange={handleChange}
          tabs={tabsTooltip}
          setTabs={setTabsTooltip}
          title="Tooltip"
          isArea={useItems.tooltip === "area"}
          isQuill={useItems.tooltip === "quill"}
        />
      ) : null}

      {useItems.price === "price" ? (
        <div className={styles.editItem}>
          <div className={styles.editTitle}>{`${staticTexts.price}:`}</div>
          <input
            type="number"
            value={priceValue}
            onChange={handlePriceChange}
          ></input>
          грн
        </div>
      ) : null}

      {useItems.price === "color" ? (
        <div className={styles.colorItem}>
          <div className={styles.editTitle}>{`${staticTexts.color}:`}</div>
          <div>
            {"Black "}
            <input
              type="radio"
              value={"0"}
              checked={priceValue === 0}
              onChange={handleColorChange}
            />
          </div>
          <div>
            {"White "}
            <input
              type="radio"
              value={"1"}
              checked={priceValue === 1}
              onChange={handleColorChange}
            />
          </div>
        </div>
      ) : null}

      {useItems.link && !!pages ? (
        <div className={styles.editItem}>
          <div className={styles.editTitle}>{`${staticTexts.linkTo}`}</div>

          <select onChange={handlePageChange} value={linkValue}>
            {[...pagesOptions]}
          </select>
        </div>
      ) : null}

      {useItems.value === "time" ? (
        <div className={styles.editItem}>
          <div className={styles.editTitle}>{`${staticTexts.time}:`}</div>
          <input
            type="text"
            value={currentValue ?? ""}
            onChange={handleValueChange}
          />
        </div>
      ) : null}

      {useItems.value === "price" ? (
        <div className={styles.editItem}>
          <div className={styles.editTitle}>{`${staticTexts.price}:`}</div>
          <input
            type="text"
            value={currentValue ?? ""}
            onChange={handleValueChange}
          />
        </div>
      ) : null}

      {useItems.value === "image" ? (
        <div className={styles.editItem}>
          <div className={styles.editTitle}>{`${"Image"}:`}</div>
          <input type="file" onChange={handleFileChange} />
        </div>
      ) : null}

      {useItems.value === "icons" ? (
        <div className={styles.iconContainer}>
          {icons.map((icon) => {
            return (
              <div className={styles.icon} key={icon.text_description_id}>
                <Image
                  src={icon.value ?? ""}
                  alt="icon"
                  width={ICON_SIZE}
                  height={ICON_SIZE}
                />
                <input
                  type="checkbox"
                  checked={icon.value === currentValue}
                  onChange={(e) => {
                    setCurrentValue(e.target.checked ? icon.value : undefined);
                    setIsSaveDisabled(false);
                  }}
                />
              </div>
            );
          })}
        </div>
      ) : null}

      <div className={styles.buttons}>
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
  );
};
