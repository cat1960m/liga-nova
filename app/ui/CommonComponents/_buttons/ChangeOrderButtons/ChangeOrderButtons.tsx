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

export type Props = {
  isChangeOrderHorizontal?: boolean;
  changeOrder: (isToStart: boolean) => void;
};

export const ChangeOrderButtons = ({
  isChangeOrderHorizontal,
  changeOrder,
}: Props) => {
  const { isEditButtonsDisabled } = useEditContext();
  const handleToStartClick = () => {
    changeOrder(true);
  };

  const handleToEndClick = () => {
    changeOrder(false);
  };

  return (
    <div className={styles.container}>
      <CommonButton
        onClick={handleToStartClick}
        width={ICON_BUTTON_WIDTH}
        isDisabled={isEditButtonsDisabled}
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
        isDisabled={isEditButtonsDisabled}
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
