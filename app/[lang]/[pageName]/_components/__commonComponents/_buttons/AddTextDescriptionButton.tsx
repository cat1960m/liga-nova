"use client";

import { addTextDescription } from "@/app/lib/actions_fitness";
import { usePathname } from "next/navigation";
import { CommonButton } from "./CommonButton";
import { useEditContext } from "../../../edit/_components/EditContextProvider";
import { PlusIcon } from "@heroicons/react/24/outline";

export type Props = {
  featureId: number;
  textType: string;
  buttonText: string;
  price: number | null;
  onTextDescriptionAdded?: (newId: number) => void;
};

export const AddTextDescriptionButton = (props: Props) => {
  const { isEditButtonsDisabled, changeIsEditButtonDisabled } =
    useEditContext();

  const pathName = usePathname();
  const handleAddColumnItem = async () => {
    changeIsEditButtonDisabled(true);
    const newTextDescriptionId = await addTextDescription({
      ...props,
      pathName,
      canDelete: true,
    });
    changeIsEditButtonDisabled(false);

    if (newTextDescriptionId) {
      props.onTextDescriptionAdded?.(newTextDescriptionId);
    }
  };

  return (
    <CommonButton
      onClick={handleAddColumnItem}
      text={"+"}
      isDisabled={isEditButtonsDisabled}
      width="40px"
    >
      <PlusIcon width="20px" title={props.buttonText} />
    </CommonButton>
  );
};
