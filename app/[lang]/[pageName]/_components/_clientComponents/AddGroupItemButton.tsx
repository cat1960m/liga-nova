"use client";

import { addTextDescription } from "@/app/lib/actions_fitness";
import { usePathname } from "next/navigation";
import { CommonButton } from "./CommonButton";

export type Props = {
  featureId: number;
  textType: string;
  buttonText: string;
  price: number | null;
};

export const AddGroupItemButton = (props: Props) => {
  const pathName = usePathname();
  const handleAddColumnItem = async () => {
    await addTextDescription({ ...props, pathName, canDelete: true });
  };

  return <CommonButton onClick={handleAddColumnItem} text={props.buttonText} />;
};
