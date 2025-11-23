"use client";

import { useCallback, useEffect, useState } from "react";
import { CommonButton } from "../../CommonComponents/_buttons/CommonButton";
import { FullData } from "@/app/lib/definitions";
import { usePathname, useSearchParams } from "next/navigation";
import { ManageImages } from "./ManageImages/ManageImages";
import { CreateModal } from "../../CommonComponents/_upadeModal/CreateModal/CreateModal";

import styles from "./manageIconsModal.module.css";
import { EDIT_MODE } from "@/app/lib/constants";
import { addIconData, getPageData } from "@/app/lib/actionsContainer";

export const ManageIconsModal = ({ lang }: { lang: string }) => {
  const [isModalShown, setIsModalShown] = useState(false);
  const [iconsData, setIconsData] = useState<FullData[]>([]);
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const editMode = searchParams.get(EDIT_MODE);
  const isEdit = editMode === "1" || editMode === "2";

  const handleClick = () => {
    setIsModalShown(true);
  };

  const getIcons = useCallback(async () => {
    const pageFullData: FullData[] | null = await getPageData({
      lang,
      pageName: "icon",
    });

    setIconsData(pageFullData ?? []);
  }, [lang]);

  useEffect(() => {
    getIcons();
  }, [getIcons]);

  const handleIconUploaded = async (value: string) => {
    await addIconData({ value, pathName });
    getIcons();
  };

  const handleDeleteFinished = () => {
    getIcons();
  };

  const handleClose = () => {
    setIsModalShown(false);
  };

  return (
    <>
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
    </>
  );
};
