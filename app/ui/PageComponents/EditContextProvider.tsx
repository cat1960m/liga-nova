"use client"; // Ensure this file is client-side in Next.js

import { StaticTexts } from "@/app/dictionaries/definitions";
import { FullData } from "@/app/lib/definitions";
import { createContext, useState, useContext } from "react";

export type ContextValue = {
  isEditButtonsDisabled: boolean;
  changeIsEditButtonDisabled: (value: boolean) => void;
  pageFullDataList: FullData[];
  staticTexts: StaticTexts | null;
};

// Create the context
const EditContext = createContext<ContextValue>({
  isEditButtonsDisabled: false,
  changeIsEditButtonDisabled: () => {},
  pageFullDataList: [],
  staticTexts: null,
});

// Create a provider component
export const EditContextProvider = ({
  children,
  pageFullDataList,
  staticTexts
}: {
  children: React.ReactNode;
  pageFullDataList: FullData[];
  staticTexts: StaticTexts;
}) => {
  const [isEditButtonsDisabled, setIsEditButtonDisabled] = useState(false);

  const changeIsEditButtonDisabled = (value: boolean) => {
    setIsEditButtonDisabled(value);
  };

  return (
    <EditContext.Provider
      value={{ isEditButtonsDisabled, changeIsEditButtonDisabled, pageFullDataList, staticTexts }}
    >
      {children}
    </EditContext.Provider>
  );
};

export const useEditContext = () => {
  return useContext(EditContext);
};
