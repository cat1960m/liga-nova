"use client";

import { addTextDescription } from "@/app/lib/actions_fitness";
import { usePathname } from "next/navigation";
import { CommonButton } from "./CommonButton";
import { useEditContext } from "../../edit/_components/EditContextProvider";

export type Props = {
  featureId: number;
  textType: string;
  buttonText: string;
  price: number | null;
};

export const AddTextDescriptionButton = (props: Props) => {
  const { isEditButtonsDisabled, changeIsEditButtonDisabled } =
    useEditContext();

  const pathName = usePathname();
  const handleAddColumnItem = async () => {
    changeIsEditButtonDisabled(true);
    await addTextDescription({ ...props, pathName, canDelete: true });
    changeIsEditButtonDisabled(false);
  };

  return (
    <CommonButton
      onClick={handleAddColumnItem}
      text={props.buttonText}
      isDisabled={isEditButtonsDisabled}
    />
  );
};
