"use client";

import { useState } from "react";
import { CommonButton } from "../../CommonComponents/_buttons/CommonButton";
import { usePathname, useSearchParams } from "next/navigation";
import { ManageImages } from "./ManageImages/ManageImages";
import { CreateModal } from "../../CommonComponents/_upadeModal/CreateModal/CreateModal";

import styles from "./manageIconsModal.module.css";
import { EDIT_MODE } from "@/app/lib/constants";
import { addIconData } from "@/app/lib/actionsContainer";
import { EditContextProvider } from "../../PageComponents/EditContextProvider";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { useIcons } from "../../hooks/useIcons";

export const ManageIconsModal = ({
  lang,
  staticTexts,
}: {
  lang: string;
  staticTexts: StaticTexts;
}) => {
  const [isModalShown, setIsModalShown] = useState(false);
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const editMode = searchParams.get(EDIT_MODE);
  const isEdit = editMode === "1" || editMode === "2";
  const { icons: iconsData, reloadIcons } = useIcons({ lang });

  const handleClick = () => {
    setIsModalShown(true);
  };


  const handleIconUploaded = async (value: string) => {
    await addIconData({ value, pathName });
    await reloadIcons()
  };

  const handleDeleteFinished = async() => {
    await reloadIcons()
  };

  const handleClose = () => {
    setIsModalShown(false);
  };

  return (
    <EditContextProvider
      pageFullDataList={[]}
      staticTexts={staticTexts}
      pageName={""}
    >
      {isEdit ? (
        <CommonButton
          text="Manage icons"
          onClick={handleClick}
          isDisabled={isModalShown}
        />
      ) : null}

      {isModalShown ? (
        <CreateModal onClose={handleClose}>
          <div className={styles.container}>
            <ManageImages
              imagesData={iconsData}
              onDeleteFinished={handleDeleteFinished}
              onImageUpload={handleIconUploaded}
            />

            <div className={styles.button}>
              <CommonButton
                text="Cancel"
                onClick={() => setIsModalShown(false)}
              />
            </div>
          </div>
        </CreateModal>
      ) : null}
    </EditContextProvider>
  );
};
