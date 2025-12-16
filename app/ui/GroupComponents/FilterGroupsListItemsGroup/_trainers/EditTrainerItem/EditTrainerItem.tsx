"use client";

import {
  FullData,
  StructuredFeatureData,
  TranslationTabsHandle,
} from "@/app/lib/definitions";
import {
  CONTENT_TYPE_MAIN,
  LIST_ITEM,
  TRAINER_ITEM_DESCRIPTION,
  TRAINER_ITEM_IS_PREMIUM,
  TRAINER_ITEM_NAME,
  YES,
} from "@/app/lib/constants";
import { StaticTexts } from "@/app/dictionaries/definitions";

import styles from "./editTrainerItem.module.css";
import { ChangeEventHandler, useRef, useState } from "react";
import { useUpdateTextDescription } from "@/app/ui/hooks/useUpdateTextDescription";
import { useUpdateFeature } from "@/app/ui/hooks/useUpdateFeature";
import { usePathname } from "next/navigation";
import { useEditContext } from "@/app/ui/PageComponents/EditContextProvider";
import { updateFeatureSubtypeFilterIdsData } from "@/app/lib/actionsContainer";
import { revalidate } from "@/app/lib/actions_fitness";
import { EditTitleCancel } from "@/app/ui/CommonComponents/EditTitleCancel/EditTitleCancel";
import { TranslationTabsFull } from "@/app/ui/CommonComponents/TranslationTabs/TranslationTabsFull";
import { FilterGroups } from "../../_filters/FilterGroups";
import { TrainerItem } from "../TrainerItem/TrainerItem";
import { useIcons } from "@/app/ui/hooks/useIcons";
import { useSelectedFilters } from "@/app/ui/hooks/useSelectedFilters";
import { useFileImage } from "@/app/ui/hooks/useFileImage";
import { useFiltersData } from "@/app/ui/hooks/useFiltersData";

export type Props = {
  currentData: FullData[];
  staticTexts: StaticTexts;
  onClose: () => void;
  editItemFeatureId: number;
  pageName: string;
  pageFullDataList: FullData[];
  parentFeatureId?: number;
  lang: string;
  structuredFilterGroupData: StructuredFeatureData;
};

export const EditTrainerItem = ({
  currentData,
  staticTexts,
  onClose,
  editItemFeatureId,
  pageName,
  pageFullDataList,
  parentFeatureId,
  lang,
  structuredFilterGroupData,
}: Props) => {
  const getFullData = (textType: string) => {
    return currentData.find((item) => item.text_type === textType);
  };
  const name = getFullData(TRAINER_ITEM_NAME);
  const description = getFullData(TRAINER_ITEM_DESCRIPTION);
  const isPremium = getFullData(TRAINER_ITEM_IS_PREMIUM);

  const nameRef = useRef<TranslationTabsHandle>(null);
  const descriptionRef = useRef<TranslationTabsHandle>(null);
  const { premiumIcon } = useIcons({ lang });
  const [inputValueName, setInputValueName] = useState("");
  const [inputValueDescription, setInputValueDescription] = useState<
    string | undefined
  >(undefined);

  const { updatePriceValueLink } = useUpdateTextDescription();
  const { addFeatureToHistoryOnUpdate } = useUpdateFeature();
  const pathName = usePathname();

  const [isPremiumValue, setIsPremiumValue] = useState<boolean>(
    isPremium?.value === YES
  );
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const { changeIsEditButtonDisabled } = useEditContext();
  const { selectedFilterTextDescriptionIds, onFilterSelectionChanged } =
    useSelectedFilters({ fullData: currentData[0] });

  const { filtersData } = useFiltersData({
    pageFullDataList,
    filterTextDescriptionIds: selectedFilterTextDescriptionIds,
  });

  const handleChange = () => {
    setIsSaveDisabled(false);
  };
  const { onFileChange, uploadFile, previewImageUrl } = useFileImage({
    setIsSaveDisabled: handleChange,
    s3Key: name?.value,
  });

  if (!name || !isPremium || !description) {
    return null;
  }

  const handleCheckChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setIsPremiumValue(event.target.checked);
    handleChange();
  };

  const handleSave = async () => {
    changeIsEditButtonDisabled(true);
    await addFeatureToHistoryOnUpdate({
      featureId: editItemFeatureId,
      page: pageName,
    });

    await updateFeatureSubtypeFilterIdsData({
      id: editItemFeatureId,
      subtype: LIST_ITEM,
      filterIds: selectedFilterTextDescriptionIds.join(","),
    });

    if (previewImageUrl) {
      const photoUrl = await uploadFile();
      await updatePriceValueLink({
        textDescriptionId: name.text_description_id,
        price: name.price,
        value: photoUrl,
        link: name.link,
      });
    }

    if (isPremium) {
      await updatePriceValueLink({
        textDescriptionId: isPremium.text_description_id,
        price: isPremium.price,
        value: isPremium ? YES : "",
        link: isPremium.link,
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const promises: Promise<any>[] = [];
    nameRef.current?.saveTabs({ promises });
    descriptionRef.current?.saveTabs({ promises });

    await Promise.all(promises);
    await revalidate(pathName);
    changeIsEditButtonDisabled(false);
    onClose();
  };

  const baseProps = {
    staticTexts,
    onChange: handleChange,
    contentType: CONTENT_TYPE_MAIN,
  };

  const editListItemText = staticTexts.editTrainer ?? "";

  return (
    <div className={styles.main}>
      <EditTitleCancel
        title={editListItemText}
        onCancel={onClose}
        staticTexts={staticTexts}
        onSave={handleSave}
        isSaveDisabled={isSaveDisabled}
      />
      <div className={styles.body}>
        <div className={styles.inner}>
          <div className={styles.container}>
            <TranslationTabsFull
              {...baseProps}
              title={staticTexts.name ?? "N/A"}
              ref={nameRef}
              textDescriptionId={name.text_description_id}
              inputValue={inputValueName}
              setInputValue={setInputValueName}
            />
            <div className={styles.check}>
              <div>{staticTexts.photo}</div>
              <input type="file" onChange={onFileChange} />
            </div>
            <TranslationTabsFull
              {...baseProps}
              title={staticTexts.descriptions ?? "N/A"}
              isQuill
              ref={descriptionRef}
              textDescriptionId={description.text_description_id}
              inputValue={inputValueDescription}
              setInputValue={setInputValueDescription}
            />
            <div className={styles.check}>
              <input
                type="checkbox"
                checked={isPremiumValue}
                onChange={handleCheckChange}
              />
              {staticTexts.isPremium}
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.preview}>Preview:</div>
            <TrainerItem
              staticTexts={staticTexts}
              currentDataId={undefined}
              filters={filtersData}
              srcPremiumIcon={premiumIcon?.value}
              isPremiumValue={isPremiumValue}
              srcPhotoValue={previewImageUrl || name.value}
              name={inputValueName}
              description={inputValueDescription}
            />
          </div>
        </div>
        {parentFeatureId ? (
          <div className={styles.filters_container}>
            <div className={styles.preview}>Filters:</div>
            <FilterGroups
              onFilterSelectionChanged={onFilterSelectionChanged}
              selectedFilterTextDescriptionIds={
                selectedFilterTextDescriptionIds
              }
              parentFeatureId={parentFeatureId}
              isEdit={false} // no edit
              lang={lang}
              staticTexts={staticTexts}
              pageName={pageName}
              structuredFilterGroupData={structuredFilterGroupData}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};
