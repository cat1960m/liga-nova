"use client";

import {
  useState,
  ChangeEventHandler,
  useEffect,
  useMemo,
  useRef,
} from "react";
import {
  FullData,
  PageData,
  PreviewParams,
  TranslationTabsHandle,
} from "@/app/lib/definitions";
import { TranslationTabs } from "../../TranslationTabs/TranslationTabs";
import { CommonButton } from "../../_buttons/CommonButton";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { usePathname } from "next/navigation";
import { ICON_SIZE } from "@/app/lib/constants";

import styles from "./updateTextDescriptionDataModalContent.module.css";
import Image from "next/image";
import { getPageTitlesData } from "@/app/lib/actionsContainer";
import { revalidate } from "@/app/lib/actions_fitness";
import { useUpdateTextDescription } from "@/app/ui/hooks/useUpdateTextDescription";
import { useTranslationTabs } from "../../TranslationTabs/useTranslationTabs";
import { useIcons } from "@/app/ui/hooks/useIcons";
import { useFileImage } from "@/app/ui/hooks/useFileImage";

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
  preview?: (params: PreviewParams) => React.ReactNode;
  previewBaseParams?: Record<string, string>;
};

export const UpdateTextDescriptionDataModalContent = ({
  onClose,
  currentData,
  staticTexts,
  lang,
  useItems,
  preview,
  previewBaseParams,
}: Props) => {
  const textDescriptionId = currentData.text_description_id;
  console.log("textDescriptionId", textDescriptionId, currentData);

  const {
    tabsMain,
    setTabsMain,
    tabsTooltip,
    setTabsTooltip,
    saveTabsMain,
    saveTabsTooltip,
  } = useTranslationTabs(textDescriptionId);

  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const translateTabsMainRef = useRef<TranslationTabsHandle>(null);
  const translateTabsTooltipRef = useRef<TranslationTabsHandle>(null);

  const pathName = usePathname();
  const { updatePriceValueLink, addTextDescriptionToHistoryOnUpdate } =
    useUpdateTextDescription();

  const [priceValue, setPriceValue] = useState<number>(currentData.price ?? 0);
  const [updatedValue, setUpdatedValue] = useState<string | undefined>(
    currentData.value ?? ""
  );
  const [linkValue, setLinkValue] = useState<string>(
    useItems.link ? currentData.link ?? "" : ""
  );
  const [pages, setPages] = useState<PageData[] | null>(null);
  const { icons } = useIcons({ lang, isNoUseIcon: useItems.value !== "icons" });
  const { previewImageUrl, onFileChange, uploadFile, clearPreviewImage } =
    useFileImage({ setIsSaveDisabled, s3Key: updatedValue });

  useEffect(() => {
    const getPages = async () => {
      const pages1 = await getPageTitlesData(lang);

      setPages(pages1?.map((page) => page) ?? []);
    };

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

  const handleRestore = async () => {
    setIsSaveDisabled(true);
    setPriceValue(currentData.price ?? 0);
    setUpdatedValue(currentData.value ?? "");
    setLinkValue(useItems.link ? currentData.link ?? "" : "");
    clearPreviewImage();
    translateTabsMainRef.current?.restore();
    translateTabsTooltipRef.current?.restore();
  };

  const handleSave = async () => {
    await addTextDescriptionToHistoryOnUpdate({
      textDescriptionId,
      pageName: currentData.name,
    });

    setIsSaveDisabled(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const promises: Promise<any>[] = [];

    try {
      const path = await uploadFile();

      if (useItems.price || useItems.value || useItems.link) {
        const newValue = path ?? (useItems.value ? updatedValue : undefined);
        const price = useItems.price !== undefined ? priceValue : undefined;
        const link = useItems.link ? linkValue : undefined;

        promises.push(
          updatePriceValueLink({
            price,
            textDescriptionId,
            value: newValue,
            link,
          })
        );
      }

      if (useItems.text || useItems.tooltip) {
        saveTabsMain(promises);
      }

      if (useItems.tooltip) {
        saveTabsTooltip(promises);
      }

      await Promise.all(promises);

      await revalidate(pathName);

      onClose();
    } catch (err) {
      console.log("-----error", err);
    }
  };

  const handlePriceChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value;
    setPriceValue(parseInt(value));
    setIsSaveDisabled(false);

    if (value && useItems.value === "price") {
      setUpdatedValue("");
    }
  };

  const handleValueChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setUpdatedValue(event.target.value);
    setIsSaveDisabled(false);
  };

  const handlePageChange: ChangeEventHandler<HTMLSelectElement> = async (
    event
  ) => {
    setLinkValue(event.target.value);
    setIsSaveDisabled(false);
  };

  const handleColorChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setPriceValue(parseInt(event.target.value));
    setIsSaveDisabled(false);
  };

  return (
    <div>
      <div className={styles.main}>
        <div className={styles.container} style={{ flexGrow: 2 }}>
          <div className={styles.title}>{staticTexts["updateTranslate"]}</div>

          {!!useItems.text && tabsMain ? (
            <TranslationTabs
              staticTexts={staticTexts}
              onChange={handleChange}
              tabs={tabsMain}
              setTabs={setTabsMain}
              title="Text"
              isArea={useItems.text === "area"}
              isQuill={useItems.text === "quill"}
              ref={translateTabsMainRef}
            />
          ) : null}

          {!!useItems.tooltip && tabsTooltip ? (
            <TranslationTabs
              staticTexts={staticTexts}
              onChange={handleChange}
              tabs={tabsTooltip}
              setTabs={setTabsTooltip}
              title="Tooltip"
              isArea={useItems.tooltip === "area"}
              isQuill={useItems.tooltip === "quill"}
              ref={translateTabsTooltipRef}
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
                value={updatedValue ?? ""}
                onChange={handleValueChange}
              />
            </div>
          ) : null}

          {useItems.value === "price" ? (
            <div className={styles.editItem}>
              <div className={styles.editTitle}>{`${staticTexts.price}:`}</div>
              <input
                type="text"
                value={updatedValue ?? ""}
                onChange={handleValueChange}
              />
            </div>
          ) : null}

          {useItems.value === "image" ? (
            <div className={styles.editItem}>
              <div className={styles.editTitle}>{`${"Image"}:`}</div>
              <input type="file" onChange={onFileChange} />
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
                      checked={icon.value === updatedValue}
                      onChange={(e) => {
                        setUpdatedValue(
                          e.target.checked ? icon.value : undefined
                        );
                        setIsSaveDisabled(false);
                      }}
                    />
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
        {preview && tabsMain && tabsTooltip ? (
          <div
            className={
              previewBaseParams?.["isFullWidth"]
                ? styles.preview_full
                : styles.preview
            }
          >
            <div className={styles.preview_text}>{"Preview:"}</div>
            <div className= {styles.preview_container}>
              {preview({
                data: currentData,
                price: priceValue,
                value:
                  useItems.value === "image"
                    ? previewImageUrl || updatedValue
                    : updatedValue,
                link: linkValue,
                text: tabsMain.find(
                  (item) => item.langUpperCase === lang.toLocaleUpperCase()
                )?.value,
                tooltip: tabsTooltip.find(
                  (item) => item.langUpperCase === lang.toLocaleUpperCase()
                )?.value,
                staticTexts,
                baseParams: previewBaseParams,
              })}
            </div>
          </div>
        ) : null}
      </div>
      <div className={styles.buttons}>
        <CommonButton
          onClick={() => onClose()}
          text={staticTexts.close ?? "N/A"}
        />
        <CommonButton
          onClick={handleSave}
          isDisabled={isSaveDisabled}
          text={staticTexts.save ?? "N/A"}
        />

        <CommonButton
          onClick={handleRestore}
          isDisabled={isSaveDisabled}
          text={staticTexts.restore ?? "N/A"}
        />
      </div>
    </div>
  );
};
