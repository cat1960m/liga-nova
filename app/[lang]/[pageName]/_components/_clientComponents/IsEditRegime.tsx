"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { ChangeEvent } from "react";

const EDIT = "edit";

export const IsEditRegime = () => {
  const pathName = usePathname();
  const router = useRouter();
  const isEdit = pathName.endsWith(EDIT);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newPathName = isEdit
      ? pathName.slice(0, pathName.length - EDIT.length - 1)
      : `${pathName}/${EDIT}`;

    router.push(newPathName);
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
        gap: "10px",
        padding: "20px",
        alignItems: "center",
      }}
    >
      <input type="checkbox" onChange={handleChange} checked={isEdit} />
      <div>Is Edit</div>
    </div>
  );
};
