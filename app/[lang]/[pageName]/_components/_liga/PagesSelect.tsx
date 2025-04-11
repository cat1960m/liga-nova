"use client";

import { updateTextDescriptionLink } from "@/app/lib/actions_fitness";
import { FullData, MainParams, PageData } from "@/app/lib/definitions";
import { usePathname } from "next/navigation";
import { ChangeEventHandler } from "react";
import { useEditContext } from "../../edit/_components/EditContextProvider";

export type Props = {
  textDescriptionId: number;
  link: string;
  pages: PageData[] | null;
  onLinkUpdated: () => void;
};

export const PagesSelect = ({
  textDescriptionId,
  link,
  pages,
  onLinkUpdated,
}: Props) => {
  const pathName = usePathname();
  const { isEditButtonsDisabled, changeIsEditButtonDisabled } =
    useEditContext();

  if (!pages) {
    return null;
  }

  const handleChange: ChangeEventHandler<HTMLSelectElement> = async (event) => {
    const lintPageName = event.target.value;
    changeIsEditButtonDisabled(true);
    await updateTextDescriptionLink({
      link: lintPageName,
      textDescriptionId,
      pathName,
    });
    onLinkUpdated();
    changeIsEditButtonDisabled(false);
  };

  return (
    <select
      onChange={handleChange}
      value={link}
      disabled={isEditButtonsDisabled}
    >
      {pages?.map((page) => (
        <option key={page.name} value={page.name}>
          {page.text_content}
        </option>
      ))}
    </select>
  );
};
