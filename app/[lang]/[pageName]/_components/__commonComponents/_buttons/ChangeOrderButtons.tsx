"use client";

import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import { CommonButton } from "./CommonButton";
import { useEditContext } from "../_edit/EditContextProvider";
import { ICON_BUTTON_WIDTH, ICON_IN_BUTTON_WIDTH } from "@/app/lib/constants";

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
    <div
      style={{
        display: "flex",
        gap: "5px",
        alignItems: "center",
        justifyContent: "center",
        //   flexGrow: 2,
      }}
    >
      <CommonButton
        onClick={handleToStartClick}
        width={ICON_BUTTON_WIDTH}
        isDisabled={isEditButtonsDisabled}
      >
        {isChangeOrderHorizontal ? (
          <ChevronLeftIcon style={{ width: ICON_IN_BUTTON_WIDTH }} />
        ) : (
          <ChevronUpIcon style={{ width: ICON_IN_BUTTON_WIDTH }} />
        )}
      </CommonButton>
      <CommonButton
        onClick={handleToEndClick}
        width={ICON_BUTTON_WIDTH}
        isDisabled={isEditButtonsDisabled}
      >
        {isChangeOrderHorizontal ? (
          <ChevronRightIcon style={{ width: ICON_IN_BUTTON_WIDTH }} />
        ) : (
          <ChevronDownIcon style={{ width: ICON_IN_BUTTON_WIDTH }} />
        )}
      </CommonButton>
    </div>
  );
};
