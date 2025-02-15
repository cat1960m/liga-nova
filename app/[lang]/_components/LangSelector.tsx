"use client";

import { useRouter, useParams } from "next/navigation";

export const LangSelector = () => {
  const languages = ["ua", "en"];
  const params = useParams();
  const router = useRouter();

  const handleSelect: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    const newLang = event.target.value;
    router.push(`/${newLang}/${params.pageName}`);
  };

  return (
    <div>
      <select defaultValue={params.lang} onChange={handleSelect}>
        {languages.map((language) => {
          return (
            <option value={language} key={language}>
              {language}
            </option>
          );
        })}
      </select>
    </div>
  );
};
