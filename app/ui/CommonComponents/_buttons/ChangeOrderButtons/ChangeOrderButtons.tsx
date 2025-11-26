"use client";

import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import { CommonButton } from "../CommonButton";
import { useEditContext } from "@/app/ui/PageComponents/EditContextProvider";
import { ICON_BUTTON_WIDTH, ICON_IN_BUTTON_WIDTH } from "@/app/lib/constants";

import styles from "./changeOrderButtons.module.css";
import { CountIndex } from "@/app/dictionaries/definitions";

export type Props = {
  isChangeOrderHorizontal?: boolean;
  changeOrder: (isToStart: boolean) => void;
  countIndex: CountIndex | null;
};

export const ChangeOrderButtons = ({
  isChangeOrderHorizontal,
  changeOrder,
  countIndex,
}: Props) => {
  const { isEditButtonsDisabled } = useEditContext();
  const handleToStartClick = () => {
    changeOrder(true);
  };

  const handleToEndClick = () => {
    changeOrder(false);
  };

  const isFirstDisabled = countIndex?.index === 0;
  const isSecondDisabled = !!countIndex && countIndex.index === countIndex.count -1;

  return (
    <div className={styles.container}>
      <CommonButton
        onClick={handleToStartClick}
        width={ICON_BUTTON_WIDTH}
        isDisabled={isEditButtonsDisabled || isFirstDisabled}
      >
        {isChangeOrderHorizontal ? (
          <ChevronLeftIcon width={ICON_IN_BUTTON_WIDTH} />
        ) : (
          <ChevronUpIcon width={ICON_IN_BUTTON_WIDTH} />
        )}
      </CommonButton>
      <CommonButton
        onClick={handleToEndClick}
        width={ICON_BUTTON_WIDTH}
        isDisabled={isEditButtonsDisabled || isSecondDisabled}
      >
        {isChangeOrderHorizontal ? (
          <ChevronRightIcon width={ICON_IN_BUTTON_WIDTH} />
        ) : (
          <ChevronDownIcon width={ICON_IN_BUTTON_WIDTH} />
        )}
      </CommonButton>
    </div>
  );
};
