"use client";

import { useEffect, useState } from "react";
import { CommonButton } from "../../CommonComponents/_buttons/CommonButton";
import { FullData, MainParams } from "@/app/lib/definitions";
import { addIcon, getPageFullData } from "@/app/lib/actions_fitness";
import { usePathname, useSearchParams } from "next/navigation";
import { ManageImages } from "./ManageImages/ManageImages";
import { CreateModal } from "../../CommonComponents/_upadeModal/CreateModal";

import styles from "./manageIconsModal.module.css";

export const ManageIconsModal = ({ lang }: { lang: string }) => {
  const [isModalShown, setIsModalShown] = useState(false);
  const [iconsData, setIconsData] = useState<FullData[]>([]);
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const isEdit = searchParams.get("isEdit") === "1";

  const handleClick = () => {
    setIsModalShown(true);
  };

  const getIcons = async () => {
    const pageFullData: FullData[] | null = await getPageFullData({
      lang,
      pageName: "icon",
    });

    setIconsData(pageFullData ?? []);
  };

  useEffect(() => {
    getIcons();
  }, []);

  const handleIconUploaded = async (value: string) => {
    await addIcon({ value, pathName });
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
