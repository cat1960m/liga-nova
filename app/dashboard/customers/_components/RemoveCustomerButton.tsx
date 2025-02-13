"use client";

import { removeCustomer } from "@/app/lib/actions_customers";
import { useState } from "react";
import clsx from "clsx";

export const RemoveCustomerButton = ({ id }: { id: string }) => {
  const [isDisabled, setIsDisabled] = useState(false);

  const handleClick = async () => {
    setIsDisabled(true);
    setTimeout(async () => {
      await removeCustomer(id);
      setIsDisabled(false);
    }, 3000);
  };

  return (
    <button
      className={clsx(
        "flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
      )}
      disabled={isDisabled}
      onClick={handleClick}
      style={
        isDisabled ? { backgroundColor: "lightgray", color: "gray" } : undefined
      }
    >
      {"Remove"}
    </button>
  );
};
