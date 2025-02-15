export default async function PageName({
  params,
}: {
  params: Promise<{ pageName: string; lang: string }>;
}) {
  const pars = await params;
  const { pageName, lang } = pars;

  return (
    <div>
      {lang} : {pageName}
    </div>
  );
}
