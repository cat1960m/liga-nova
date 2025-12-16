"use client";

import {
  CONTENT_TYPE_MAIN,
  LIST_ITEM,
  SUBSCRIPTION_ITEM_CAN_POSTPONE,
  SUBSCRIPTION_ITEM_DESCRIPTION,
  SUBSCRIPTION_ITEM_NAME,
  SUBSCRIPTION_ITEM_OLD_PRICE,
  SUBSCRIPTION_ITEM_PRICE,
  SUBSCRIPTION_ITEM_SHARE,
  YES,
} from "@/app/lib/constants";
import {
  FullData,
  StructuredFeatureData,
  TranslationTabsHandle,
} from "@/app/lib/definitions";

import styles from "./editSubscriptionItem.module.css";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { ChangeEventHandler, useRef, useState } from "react";
import { useUpdateTextDescription } from "@/app/ui/hooks/useUpdateTextDescription";
import { usePathname, } from "next/navigation";
import { revalidate } from "@/app/lib/actions_fitness";
import { TranslationTabsFull } from "@/app/ui/CommonComponents/TranslationTabs/TranslationTabsFull";
import { SubscriptionItem } from "../SubscriptionItem/SubscriptionItem";
import { FilterGroups } from "../../_filters/FilterGroups";
import { useUpdateFeature } from "@/app/ui/hooks/useUpdateFeature";
import { updateFeatureSubtypeFilterIdsData } from "@/app/lib/actionsContainer";
import { useEditContext } from "@/app/ui/PageComponents/EditContextProvider";
import { EditTitleCancel } from "@/app/ui/CommonComponents/EditTitleCancel/EditTitleCancel";
import { useSelectedFilters } from "@/app/ui/hooks/useSelectedFilters";

export type Props = {
  currentData: FullData[];
  staticTexts: StaticTexts;
  onClose: () => void;
  editItemFeatureId: number;
  pageName: string;
  parentFeatureId?: number;
  lang: string;
  structuredFilterGroupData: StructuredFeatureData;
};

export const EditSubscriptionItem = ({
  currentData,
  staticTexts,
  onClose,
  editItemFeatureId,
  pageName,
  parentFeatureId,
  lang,
  structuredFilterGroupData,
}: Props) => {
  const getFullData = (textType: string) => {
    return currentData.find((item) => item.text_type === textType);
  };
  const name = getFullData(SUBSCRIPTION_ITEM_NAME);
  const share = getFullData(SUBSCRIPTION_ITEM_SHARE);
  const price = getFullData(SUBSCRIPTION_ITEM_PRICE);
  const oldPrice = getFullData(SUBSCRIPTION_ITEM_OLD_PRICE);
  const description = getFullData(SUBSCRIPTION_ITEM_DESCRIPTION);
  const isPostpone = getFullData(SUBSCRIPTION_ITEM_CAN_POSTPONE);

  const shareRef = useRef<TranslationTabsHandle>(null);
  const nameRef = useRef<TranslationTabsHandle>(null);
  const priceRef = useRef<TranslationTabsHandle>(null);
  const oldPriceRef = useRef<TranslationTabsHandle>(null);
  const descriptionRef = useRef<TranslationTabsHandle>(null);

  const [inputValueShare, setInputValueShare] = useState("");
  const [inputValueName, setInputValueName] = useState("");
  const [inputValuePrice, setInputValuePrice] = useState("");
  const [inputValueOldPrice, setInputValueOldPrice] = useState("");
  const [inputValueDescription, setInputValueDescription] = useState<
    string | undefined
  >(undefined);

  const { updatePriceValueLink } = useUpdateTextDescription();
  const { addFeatureToHistoryOnUpdate } = useUpdateFeature();
  const pathName = usePathname();

  const [isPostponeValue, setIsPostponeValue] = useState<boolean>(
    isPostpone?.value === YES
  );
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const { changeIsEditButtonDisabled } = useEditContext();
  const { selectedFilterTextDescriptionIds, onFilterSelectionChanged } =
    useSelectedFilters({
      fullData: currentData[0],
    });

  if (!name || !price || !share || !oldPrice || !description || !isPostpone) {
    return null;
  }

  const handleChange = () => {
    setIsSaveDisabled(false);
  };

  const handleCheckChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setIsPostponeValue(event.target.checked);
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
      pathName,
    });

    if (price) {
      const numberValue = parseInt(inputValuePrice);
      await updatePriceValueLink({
        textDescriptionId: price.text_description_id,
        price: numberValue,
        value: price.value,
        link: price.link,
      });
    }

    if (isPostpone) {
      await updatePriceValueLink({
        textDescriptionId: isPostpone.text_description_id,
        price: isPostpone.price,
        value: isPostponeValue ? YES : "",
        link: isPostpone.link,
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const promises: Promise<any>[] = [];
    shareRef.current?.saveTabs({ promises });
    nameRef.current?.saveTabs({ promises });
    priceRef.current?.saveTabs({ promises });
    oldPriceRef.current?.saveTabs({ promises });
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

  const editListItemText = staticTexts.editSubscription ?? "";

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
              title={staticTexts.share ?? "N/A"}
              ref={shareRef}
              textDescriptionId={share.text_description_id}
              inputValue={inputValueShare}
              setInputValue={setInputValueShare}
            />

            <TranslationTabsFull
              {...baseProps}
              title={staticTexts.name ?? "N/A"}
              ref={nameRef}
              textDescriptionId={name.text_description_id}
              inputValue={inputValueName}
              setInputValue={setInputValueName}
            />
            <TranslationTabsFull
              {...baseProps}
              title={staticTexts.price ?? "N/A"}
              ref={priceRef}
              textDescriptionId={price.text_description_id}
              inputValue={inputValuePrice}
              setInputValue={setInputValuePrice}
            />
            <TranslationTabsFull
              {...baseProps}
              title={staticTexts.oldPrice ?? "N/A"}
              ref={oldPriceRef}
              textDescriptionId={oldPrice.text_description_id}
              inputValue={inputValueOldPrice}
              setInputValue={setInputValueOldPrice}
            />
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
                checked={isPostponeValue}
                onChange={handleCheckChange}
              />
              {staticTexts.postponement}
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.preview}>Preview:</div>
            <SubscriptionItem
              staticTexts={staticTexts}
              share={inputValueShare}
              name={inputValueName}
              price={inputValuePrice}
              oldPrice={inputValueOldPrice}
              description={inputValueDescription}
              isPostpone={isPostponeValue}
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
