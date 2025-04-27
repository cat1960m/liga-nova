"use client";

import { usePathname } from "next/navigation";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";

const EDIT = "edit";

export const EditRegime = () => {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isEdit = searchParams.get("isEdit") === "1";

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.checked;
    /* const newPathName = isEdit
      ? pathName.slice(0, pathName.length - EDIT.length - 1)
      : `${pathName}/${EDIT}`; */

    const params = new URLSearchParams(searchParams);
    params.set("isEdit", value ? "1" : "0");

    router.push(`${pathName}?${params.toString()}`); // Update the URL
  };

  return (
    <div
      style={{
        // width: "100%",
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
