import { PageParams } from "@/app/lib/definitions";
import { auth } from "@/app/auth";
import { SearchParams } from "@/app/dictionaries/definitions";
import { ShowPage } from "./_components/__commonComponents/_page/ShowPage";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<PageParams>;
  searchParams: Promise<SearchParams>;
}) {
  const res = await auth();
  const isAuthenticated = !!res?.user;

  const pars = await params;

  const urlParams = await searchParams;
  const isEdit = urlParams.isEdit === "1";

  return (
    <ShowPage
      pageName={pars.pageName}
      lang={pars.lang}
      isEdit={isEdit}
      isAuthenticated={isAuthenticated}
    />
  );
}
