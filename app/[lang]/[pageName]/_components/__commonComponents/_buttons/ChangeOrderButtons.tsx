import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import { CommonButton } from "./CommonButton";
import { useEditContext } from "../../../edit/_components/EditContextProvider";

export type Props = {
  isHorizontal?: boolean;
  changeOrder: (isToStart: boolean) => void;
};

export const ChangeOrderButtons = ({ isHorizontal, changeOrder }: Props) => {
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
        flexGrow: 2,
      }}
    >
      <CommonButton
        onClick={handleToStartClick}
        width="48px"
        isDisabled={isEditButtonsDisabled}
      >
        {isHorizontal ? (
          <ChevronLeftIcon style={{ width: "32px" }} />
        ) : (
          <ChevronUpIcon style={{ width: "32px" }} />
        )}
      </CommonButton>
      <CommonButton
        onClick={handleToEndClick}
        width="48px"
        isDisabled={isEditButtonsDisabled}
      >
        {isHorizontal ? (
          <ChevronRightIcon style={{ width: "32px" }} />
        ) : (
          <ChevronDownIcon style={{ width: "32px" }} />
        )}
      </CommonButton>
    </div>
  );
};
