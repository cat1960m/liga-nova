"use client";

import {
  getPageTitles,
  updateTextDescriptionLink,
} from "@/app/lib/actions_fitness";
import { FullData, MainParams, PageData } from "@/app/lib/definitions";
import { usePathname } from "next/navigation";
import { ChangeEventHandler } from "react";

export type Props = {
  params: MainParams;
  textDescriptionId: number;
  link: string;
  pages: PageData[] | null;
};

export const Pages = ({ params, textDescriptionId, link, pages }: Props) => {
  const pathName = usePathname();

  if (!pages) {
    return null;
  }

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const lintPageName = event.target.value;
    console.log("lintPageName", lintPageName);
    updateTextDescriptionLink({
      link: lintPageName,
      textDescriptionId,
      pathName,
    });
  };

  return (
    <select onChange={handleChange} defaultValue={link}>
      {pages?.map((page) => (
        <option key={page.name} value={page.name}>
          {page.text_content}
        </option>
      ))}
    </select>
  );
};
