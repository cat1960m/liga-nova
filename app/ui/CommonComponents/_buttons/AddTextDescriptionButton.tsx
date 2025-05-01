"use client";

import { addTextDescription } from "@/app/lib/actions_fitness";
import { usePathname } from "next/navigation";
import { CommonButton } from "./CommonButton";
import { useEditContext } from "../../PageComponents/EditContextProvider";
import { PlusIcon } from "@heroicons/react/24/outline";
import { ICON_BUTTON_WIDTH, ICON_IN_BUTTON_WIDTH } from "@/app/lib/constants";

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
      width={ICON_BUTTON_WIDTH}
    >
      <PlusIcon width={ICON_IN_BUTTON_WIDTH} title={props.buttonText} />
    </CommonButton>
  );
};
