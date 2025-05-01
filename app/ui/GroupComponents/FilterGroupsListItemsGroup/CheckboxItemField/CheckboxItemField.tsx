"use client";

import { updateTextDescriptionValue } from "@/app/lib/actions_fitness";
import { YES } from "@/app/lib/constants";
import { FullData } from "@/app/lib/definitions";
import { usePathname } from "next/navigation";
import { ChangeEventHandler } from "react";

import styles from "./checkboxItemField.module.css";
import { useEditContext } from "@/app/ui/PageComponents/EditContextProvider";

export type Props = {
  title: string;
  currentData: FullData;
};

export const CheckboxItemField = ({ title, currentData }: Props) => {
  const pathName = usePathname();
  const { changeIsEditButtonDisabled } = useEditContext();

  const handleIsValueChange: ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    const value = event.target.checked ? YES : "no";
    changeIsEditButtonDisabled(true);
    await updateTextDescriptionValue({
      value,
      textDescriptionId: currentData.text_description_id,
      pathName,
    });
    changeIsEditButtonDisabled(false);
  };
  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}: </div>

      <input
        type="checkbox"
        checked={currentData.value === YES}
        onChange={handleIsValueChange}
      />
    </div>
  );
};
