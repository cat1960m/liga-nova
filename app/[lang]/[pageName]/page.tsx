import { getChildren, getPageTitles } from "@/app/lib/actions_fitness";
import { AddChildFeature } from "./_components/AddChildFeatureToPage";
import { DrawChild } from "./_components/DrawChild";
import { FeatureChild } from "@/app/lib/definitions";

export default async function PageName({
  params,
}: {
  params: Promise<{ pageName: string; lang: string }>;
}) {
  const pars = await params;
  const { pageName, lang } = pars;

  const pages = await getPageTitles(lang);

  const currentPage = pages?.find((page) => page.name === pageName);

  if (!currentPage) {
    return null;
  }

  const pageChildren: FeatureChild[] | null = await getChildren({
    parentFeatureId: currentPage?.id ?? 0,
  });

  return (
    <div
      style={{
        padding: "40px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      {pageChildren?.map((child) => {
        return <DrawChild child={child} lang={lang} key={child.id} />;
      })}

      <AddChildFeature parentFeatureId={currentPage?.id} />
    </div>
  );
}
