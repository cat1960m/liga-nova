"use client";

import { EDIT_MODE } from "@/app/lib/constants";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export const EditMode = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const modes = ["none", "simple", "deep"];
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const editMode = searchParams.get(EDIT_MODE) ?? "0";

  useEffect(() => {
    if (!isAuthenticated && !!editMode) {
      const params = new URLSearchParams(searchParams);
      params.delete("editMode");
      router.push(`${pathName}?${params.toString()}`); // Update the URL
    }
  }, [isAuthenticated, editMode, pathName, router, searchParams]);

  if (!isAuthenticated) {
    return null;
  }

  const handleSelect: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    const value = event.target.value;
    const params = new URLSearchParams(searchParams);
    params.set(EDIT_MODE, value);

    router.push(`${pathName}?${params.toString()}`); // Update the URL
  };

  return (
    <div>
      {"Edit mode: "}
      <select value={editMode} onChange={handleSelect}>
        {modes.map((mode, index) => {
          return (
            <option value={index.toString()} key={index}>
              {mode}
            </option>
          );
        })}
      </select>
    </div>
  );
};
