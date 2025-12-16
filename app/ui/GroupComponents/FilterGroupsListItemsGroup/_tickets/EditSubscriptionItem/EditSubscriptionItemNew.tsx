"use client";

import {
  CONTENT_TYPE_MAIN,
  PAGE_NAMES_TO_LIST_ITEMS_DATA,
  SUBSCRIPTION_ITEM_CAN_POSTPONE,
  SUBSCRIPTION_ITEM_DESCRIPTION,
  SUBSCRIPTION_ITEM_NAME,
  SUBSCRIPTION_ITEM_OLD_PRICE,
  SUBSCRIPTION_ITEM_PRICE,
  SUBSCRIPTION_ITEM_SHARE,
  YES,
} from "@/app/lib/constants";
import { FullData, TranslationTabsHandle } from "@/app/lib/definitions";

import styles from "./editSubscriptionItem.module.css";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { CommonButton } from "@/app/ui/CommonComponents/_buttons/CommonButton";
import { useUpdateTextDescription } from "@/app/ui/hooks/useUpdateTextDescription";
import { usePathname } from "next/navigation";
import { revalidate } from "@/app/lib/actions_fitness";
import { TranslationTabsFullNew } from "@/app/ui/CommonComponents/TranslationTabs/TranslationTabsFullNew";

export type Props = {
  currentData: FullData[];
  staticTexts: StaticTexts;
  beforeListItemChangesWillBeSaved: () => void;
  onSaveFinished: () => void;
};
//TranslationTabsFullInner

export const EditSubscriptionItemNew = ({
  currentData,
  staticTexts,
  beforeListItemChangesWillBeSaved,
  onSaveFinished,
}: Props) => {
  const refs = useRef<(TranslationTabsHandle | null)[]>([]);
  const textDescriptionList = useRef<FullData[]>([]);
  const isPostpone = currentData.find(
    (item) => item.text_type === SUBSCRIPTION_ITEM_CAN_POSTPONE
  );

  const setRef = (el: TranslationTabsHandle | null, index: number) => {
    refs.current[index] = el;
  };

  useEffect(() => {
    const textTypes: string[] = PAGE_NAMES_TO_LIST_ITEMS_DATA.tickets.textTypes;
    if (textDescriptionList.current.length) {
      return;
    }

    textTypes.forEach((textType) => {
      if (textType !== SUBSCRIPTION_ITEM_CAN_POSTPONE) {
        const data = currentData.find((item) => item.text_type === textType);
        if (data) {
          textDescriptionList.current.push(data);
          refs.current.push(null);
        }
      }
    });
  }, [currentData]);

  const { updatePriceValueLink } = useUpdateTextDescription();
  const pathName = usePathname();

  const [isPostponeValue, setIsPostponeValue] = useState<boolean>(
    isPostpone?.value === YES
  );
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

  const handleChange = () => {
    setIsSaveDisabled(false);
  };

  const handleCheckChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setIsPostponeValue(event.target.checked);
    handleChange();
  };
  const price = textDescriptionList.current.find(
    (item) => item.text_type === SUBSCRIPTION_ITEM_PRICE
  );

  const numberValue = 99;

  const onSave = async () => {
    await beforeListItemChangesWillBeSaved();

    if (price) {
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
        value: isPostpone.value ? YES : "",
        link: isPostpone.link,
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const promises: Promise<any>[] = [];
    refs.current.forEach((refData) => refData?.saveTabs({ promises }));

    await Promise.all(promises);
    await revalidate(pathName);
    onSaveFinished();
  };
  const getIsNumber = (item: FullData) => {
    return item.text_type === SUBSCRIPTION_ITEM_PRICE;
  };

  const getParams = (
    textType: string
  ): {
    isNumber?: boolean;
    isArea?: boolean;
    isQuill?: boolean;
    title: string;
  } => {
    switch (textType) {
      case SUBSCRIPTION_ITEM_NAME:
        return {
          title: staticTexts.name ?? "N/A",
        };
      case SUBSCRIPTION_ITEM_PRICE:
        return {
          title: staticTexts.price ?? "N/A",
          isNumber: true,
        };
      case SUBSCRIPTION_ITEM_OLD_PRICE:
        return {
          title: staticTexts.oldPrice ?? "N/A",
        };
      case SUBSCRIPTION_ITEM_SHARE:
        return {
          title: staticTexts.share ?? "N/A",
        };
      case SUBSCRIPTION_ITEM_DESCRIPTION:
        return {
          title: staticTexts.descriptions ?? "N/A",
          isQuill: true,
        };
      default:
        return { title: "" };
    }
  };

  return (
    <div className={styles.container}>
      <div>{textDescriptionList.current.length}</div>
      {textDescriptionList.current.map((item, index) => (
        <TranslationTabsFullNew
          staticTexts={staticTexts}
          onChange={handleChange}
          textDescriptionId={item.text_description_id}
          contentType={CONTENT_TYPE_MAIN}
          isNumber={getIsNumber(item)}
          {...getParams(item.text_type)}
          ref={(el) => setRef(el, index)}
          key={index}
        />
      ))}
      <input
        type="checkbox"
        checked={isPostponeValue}
        onChange={handleCheckChange}
      />

      <CommonButton onClick={onSave} isDisabled={isSaveDisabled}>
        {staticTexts.save}
      </CommonButton>
    </div>
  );
};
