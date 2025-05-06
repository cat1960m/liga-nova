"use client"; // Ensure this file is client-side in Next.js

import { FullData } from "@/app/lib/definitions";
import { createContext, useState, useContext } from "react";

export type ContextValue = {
  isEditButtonsDisabled: boolean;
  changeIsEditButtonDisabled: (value: boolean) => void;
  pageFullDataList: FullData[];
};

// Create the context
const EditContext = createContext<ContextValue>({
  isEditButtonsDisabled: false,
  changeIsEditButtonDisabled: () => {},
  pageFullDataList: [],
});

// Create a provider component
export const EditContextProvider = ({
  children,
  pageFullDataList
}: {
  children: React.ReactNode;
  pageFullDataList: FullData[];
}) => {
  const [isEditButtonsDisabled, setIsEditButtonDisabled] = useState(false);

  const changeIsEditButtonDisabled = (value: boolean) => {
    setIsEditButtonDisabled(value);
  };

  return (
    <EditContext.Provider
      value={{ isEditButtonsDisabled, changeIsEditButtonDisabled, pageFullDataList }}
    >
      {children}
    </EditContext.Provider>
  );
};

export const useEditContext = () => {
  return useContext(EditContext);
};
