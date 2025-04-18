"use client";

import { useEffect, useState } from "react";
import { CommonButton } from "../_buttons/CommonButton";
import { FullData, MainParams } from "@/app/lib/definitions";
import { addIcon, getPageFullData } from "@/app/lib/actions_fitness";
import { usePathname } from "next/navigation";
import { ManageImages } from "../ManageImages";
import { CreateModal } from "./CreateModal";

export const ManageIconsModal = ({ params }: { params: MainParams }) => {
  const [isModalShown, setIsModalShown] = useState(false);
  const [iconsData, setIconsData] = useState<FullData[]>([]);
  const pathName = usePathname();

  const handleClick = () => {
    setIsModalShown(true);
  };

  const getIcons = async () => {
    const pageFullData: FullData[] | null = await getPageFullData({
      lang: params.lang,
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
      <CommonButton
        text="Manage icons"
        onClick={handleClick}
        isDisabled={isModalShown}
      />
      {isModalShown ? (
        <CreateModal onClose={handleClose}>
          <div style={{ padding: "20px" }}>
            <ManageImages
              imagesData={iconsData}
              onDeleteFinished={handleDeleteFinished}
              onImageUpload={handleIconUploaded}
            />

            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
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
