"use client";

import { useState } from "react";
import styles from "./selectNewItem.module.css";
import { useEditContext } from "@/app/ui/PageComponents/EditContextProvider";
import Image from "next/image";
import { CommonButton } from "../_buttons/CommonButton";
import { CreateModal } from "../_upadeModal/CreateModal/CreateModal";
import { NameValueUrl } from "@/app/dictionaries/definitions";

export type Props = {
  groupOptions: NameValueUrl[];
  onSelect: (value: string) => void;
};

export const SelectNewItem = ({ groupOptions, onSelect }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { staticTexts } = useEditContext();

  const handleClick = () => {
    setIsModalOpen(true);
  };
  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleSelect = (value: string) => {
    onSelect(value);
    setIsModalOpen(false);
  };
  const w = 300;
  return (
    <>
      <CommonButton onClick={handleClick}>
        {staticTexts?.addChildFeatureToContainer ?? ""}
      </CommonButton>

      {isModalOpen ? (
        <CreateModal onClose={handleClose}>
          <div className={styles.main}>
            <div className={styles.button_container}>
              <CommonButton onClick={() => setIsModalOpen(false)}>
                {staticTexts?.close}
              </CommonButton>
            </div>
            <div className={styles.container}>
              {groupOptions.map((item, index) => (
                <div key={index} className={styles.item}>
                  <div className={styles.image}>
                    <Image src={item.url} alt="Edit" width={w} height={w} />
                  </div>
                  <div className={styles.action}>
                    <h3>{item.name}</h3>
                    <CommonButton onClick={() => handleSelect(item.value)}>
                      {staticTexts?.select ?? ""}
                    </CommonButton>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CreateModal>
      ) : null}
    </>
  );
};
