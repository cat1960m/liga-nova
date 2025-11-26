import { TrashIcon } from "@heroicons/react/24/outline";
import { CommonButton } from "../CommonButton";
import { ICON_BUTTON_WIDTH, ICON_IN_BUTTON_WIDTH } from "@/app/lib/constants";
import { useState } from "react";
import { CreateModal } from "../../_upadeModal/CreateModal/CreateModal";
import styles from "./deleteModall.module.css";
import { useEditContext } from "@/app/ui/PageComponents/EditContextProvider";

export type Props = {
  title: string;
  onClick: () => void;
  isDisabled: boolean;
};

export const DeleteButton = ({ title, onClick, isDisabled }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { staticTexts } = useEditContext();

  const handleClick = () => {
    setIsModalOpen(true);
  };
  const handleClose = () => {
    setIsModalOpen(false);
  };

  const onYes = () => {
    setIsModalOpen(false);
    onClick();
  };
  return (
    <>
      <CommonButton
        onClick={handleClick}
        isDisabled={isDisabled}
        width={ICON_BUTTON_WIDTH}
      >
        <TrashIcon color="black" width={ICON_IN_BUTTON_WIDTH} title={title} />
      </CommonButton>

      {isModalOpen ? (
        <CreateModal onClose={handleClose} left={"25%"} width={"50%"}>
          <div className={styles.container}>
            <div className={styles.title}>{staticTexts?.wantDelete ?? ""}</div>
            <div className={styles.buttons}>
              <CommonButton onClick={onYes} text="Yes" />
              <CommonButton onClick={handleClose} text="No" />
            </div>
          </div>
        </CreateModal>
      ) : null}
    </>
  );
};
