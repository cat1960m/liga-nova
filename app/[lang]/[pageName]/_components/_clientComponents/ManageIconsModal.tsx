"use client";

import { useEffect, useRef, useState } from "react";
import { CommonButton } from "./CommonButton";
import { createPortal } from "react-dom";
import { FullData, MainParams } from "@/app/lib/definitions";
import { addIcon, getPageFullData } from "@/app/lib/actions_fitness";
import { usePathname } from "next/navigation";
import { ManageImages } from "./ManageImages";

export const ManageIconsModal = ({ params }: { params: MainParams }) => {
  const [isModalShown, setIsModalShown] = useState(false);
  const [iconsData, setIconsData] = useState<FullData[]>([]);
  const pathName = usePathname();

  const handleClick = () => {
    setIsModalShown(true);
  };

  const parent = useRef<HTMLElement | null>(null);

  if (isModalShown && !parent.current) {
    parent.current = document.getElementById("parentModal");
  }

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

  const scrollPositionY = 0;

  const handleIconUploaded = async (value: string) => {
    await addIcon({ value, pathName });
    getIcons();
  };

  const handleDeleteFinished = () => {
    getIcons();
  };

  return (
    <>
      <CommonButton
        text="Manage icons"
        onClick={handleClick}
        isDisabled={isModalShown}
      />
      {isModalShown && parent.current ? (
        <div>
          {createPortal(
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(255, 180, 200, 0.5)",
              }}
            >
              <div
                style={{
                  backgroundColor: "white",
                  border: "2px solid darkmagenta",
                  borderRadius: "5px",
                  width: "80%",
                  position: "absolute",
                  top: `${scrollPositionY + 20}px`,
                  left: "10%",
                  padding: "20px",
                }}
              >
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
            </div>,
            parent.current
          )}
        </div>
      ) : null}
    </>
  );
};
