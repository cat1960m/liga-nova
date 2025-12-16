"use client";

import {
  revertDeletedFeatureFromHistory,
  revertDeletedTextDescriptionFromHistory,
  revertAddedFeatureFromHistory,
  revalidate,
  revertAddedTextDescriptionFromHistory,
  revertUpdatedFeatureFromHistory,
  revertUpdatedTextDescriptionFromHistory,
  clearHistory,
} from "@/app/lib/actions_fitness";
import { CommonButton } from "../../CommonComponents/_buttons/CommonButton";
import { useState } from "react";
import { History } from "@/app/lib/definitions";
import { usePathname } from "next/navigation";

import styles from "./undo.module.css";
import { useEditContext } from "../EditContextProvider";
import {
  ADD,
  DELETE,
  FEATURES,
  TEXT_DESCRIPTIONS,
  UPDATE,
} from "@/app/lib/constants";
import { DeleteButton } from "../../CommonComponents/_buttons/DeleteButton/DeleteButton";

export const Undo = () => {
  const { lastHistory, getLastHistory, isUndoDisabled } = useEditContext();
  const [isUndoExecuting, setIsUndoExecuting] = useState(false);
  const pathName = usePathname();

  const applyUndoForFeaturesAdd = async (history: History) => {
    setIsUndoExecuting(true);
    await revertDeletedFeatureFromHistory({ history });
    await getLastHistory();
    await revalidate(pathName);
    setIsUndoExecuting(false);
  };

  const applyUndoForFeaturesDelete = async (history: History) => {
    setIsUndoExecuting(true);
    await revertAddedFeatureFromHistory({ history });
    await getLastHistory();
    await revalidate(pathName);
    setIsUndoExecuting(false);
  };

  const applyUndoForFeaturesUpdate = async (history: History) => {
    setIsUndoExecuting(true);
    await revertUpdatedFeatureFromHistory({ history });
    await getLastHistory();
    await revalidate(pathName);
    setIsUndoExecuting(false);
  };

  const applyUndoForTextDescriptionsAdd = async (history: History) => {
    setIsUndoExecuting(true);
    await revertDeletedTextDescriptionFromHistory({ history });
    await getLastHistory();
    await revalidate(pathName);
    setIsUndoExecuting(false);
  };

  const applyUndoForTextDescriptionsDelete = async (history: History) => {
    setIsUndoExecuting(true);
    await revertAddedTextDescriptionFromHistory({ history });
    await getLastHistory();
    await revalidate(pathName);
    setIsUndoExecuting(false);
  };

  const applyUndoForTextDescriptionsUpdate = async (history: History) => {
    setIsUndoExecuting(true);
    await revertUpdatedTextDescriptionFromHistory({ history });
    await getLastHistory();
    await revalidate(pathName);
    setIsUndoExecuting(false);
  };

  const handleUndo = () => {
    if (!lastHistory || !pathName) {
      return;
    }
    if (
      lastHistory.action_type === ADD &&
      lastHistory.table_name === FEATURES
    ) {
      applyUndoForFeaturesAdd(lastHistory);
    }

    if (
      lastHistory.action_type === DELETE &&
      lastHistory.table_name === FEATURES
    ) {
      applyUndoForFeaturesDelete(lastHistory);
    }

    if (
      lastHistory.action_type === UPDATE &&
      lastHistory.table_name === FEATURES
    ) {
      applyUndoForFeaturesUpdate(lastHistory);
    }

    if (
      lastHistory.action_type === ADD &&
      lastHistory.table_name === TEXT_DESCRIPTIONS
    ) {
      applyUndoForTextDescriptionsAdd(lastHistory);
    }

    if (
      lastHistory.action_type === DELETE &&
      lastHistory.table_name === TEXT_DESCRIPTIONS
    ) {
      applyUndoForTextDescriptionsDelete(lastHistory);
    }

    if (
      lastHistory.action_type === UPDATE &&
      lastHistory.table_name === TEXT_DESCRIPTIONS
    ) {
      applyUndoForTextDescriptionsUpdate(lastHistory);
    }
  };

  const onCLick = async() => {
     await clearHistory();
     await getLastHistory();
  }

  

  return (
    <div className={styles.undo}>
      <CommonButton
        onClick={handleUndo}
        isDisabled={!lastHistory || isUndoExecuting || isUndoDisabled}
      >
        {isUndoExecuting ? "..." : "Undo"}
      </CommonButton>
      <DeleteButton text="Clear history" title="Do you want to delete All History ?" onClick={onCLick} isDisabled={false}/>
    </div>
  );
};
