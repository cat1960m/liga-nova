"use client"; // Ensure this file is client-side in Next.js

import { StaticTexts } from "@/app/dictionaries/definitions";
import { getCurrentHistory } from "@/app/lib/actions_fitness";
import { FullData, History } from "@/app/lib/definitions";
import {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react";

export type ContextValue = {
  isEditButtonsDisabled: boolean;
  changeIsEditButtonDisabled: (value: boolean) => void;
  pageFullDataList: FullData[];
  staticTexts: StaticTexts | null;
  getLastHistory: () => void;
  lastHistory: History | null;
  pageName: string;
  changeIsUndoDisabled: (value: boolean) => void;
  isUndoDisabled: boolean;
};

// Create the context
const EditContext = createContext<ContextValue>({
  isEditButtonsDisabled: false,
  changeIsEditButtonDisabled: () => {},
  pageFullDataList: [],
  staticTexts: null,
  getLastHistory: () => {},
  lastHistory: null,
  pageName: "",
  isUndoDisabled: false,
  changeIsUndoDisabled: () => {}
});

// Create a provider component
export const EditContextProvider = ({
  children,
  pageFullDataList,
  staticTexts,
  pageName,
}: {
  children: React.ReactNode;
  pageFullDataList: FullData[];
  staticTexts: StaticTexts;
  pageName: string;
}) => {
  const [isEditButtonsDisabled, setIsEditButtonDisabled] = useState(false);
  const [lastHistory, setLastHistory] = useState<History | null>(null);
  const [isUndoDisabled, setIsUndoDisabled] = useState(false);

  const getLastHistory = useCallback(async () => {
    if(!pageName) {
      setLastHistory(null);
      return;
    }
    const history = await getCurrentHistory(pageName);

    setLastHistory(history || null);
  }, [pageName]);

  useEffect(() => {
    if (pageName) {
      getLastHistory();
    }
  }, [pageName, getLastHistory]);

  const changeIsEditButtonDisabled = (value: boolean) => {
    setIsEditButtonDisabled(value);
  };

  const changeIsUndoDisabled = useCallback((value: boolean) => {
    setIsUndoDisabled(value);
  }, []);


  return (
    <EditContext.Provider
      value={{
        isEditButtonsDisabled,
        changeIsEditButtonDisabled,
        pageFullDataList,
        staticTexts,
        lastHistory,
        getLastHistory,
        pageName,
        isUndoDisabled,
        changeIsUndoDisabled
      }}
    >
      {children}
    </EditContext.Provider>
  );
};

export const useEditContext = () => {
  return useContext(EditContext);
};
