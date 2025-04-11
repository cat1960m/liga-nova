"use client"; // Ensure this file is client-side in Next.js

import { createContext, useState, useContext } from "react";

export type ContextValue = {
  isEditButtonsDisabled: boolean;
  changeIsEditButtonDisabled: (value: boolean) => void;
};

// Create the context
const EditContext = createContext<ContextValue>({
  isEditButtonsDisabled: false,
  changeIsEditButtonDisabled: (value: boolean) => {},
});

// Create a provider component
export const EditContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isEditButtonsDisabled, setIsEditButtonDisabled] = useState(false);

  const changeIsEditButtonDisabled = (value: boolean) => {
    setIsEditButtonDisabled(value);
  };

  return (
    <EditContext.Provider
      value={{ isEditButtonsDisabled, changeIsEditButtonDisabled }}
    >
      {children}
    </EditContext.Provider>
  );
};

export const useEditContext = () => {
  return useContext(EditContext);
};
