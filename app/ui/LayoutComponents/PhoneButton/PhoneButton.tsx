"use client";

import { PhoneIcon } from "@heroicons/react/24/outline";
import { ActionButton } from "../../CommonComponents/_buttons/ActionButton/ActionButton";
import { PHONE } from "@/app/lib/constants";

import styles from "./phoneIcon.module.css";

export const PhoneButton = () => {
  const handlePhoneClick = () => {};

  return (
    <ActionButton onClick={handlePhoneClick} styleValue={{ height: "40px" }}>
      <div className={styles.phoneContainer}>
        <PhoneIcon className={styles.phone} />
        
        {PHONE}
      </div>
    </ActionButton>
  );
};
