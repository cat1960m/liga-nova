import { FullData, MainParams } from "@/app/lib/definitions";
import { getIsEditNoDelete } from "@/app/lib/utils";
import { getPageData } from "@/app/lib/actionsContainer";
import { ShowPageBase } from "./ShowPageBase";
import { ShowPageEdit } from "./ShowPageEdit";

export type Props = {
  params: MainParams;
  isAuthenticated: boolean;
  isMain?: boolean;
};

export const ShowPage = async ({ params, isAuthenticated }: Props) => {
  const { lang, pageName, staticTexts } = params;
  const { isEdit } = getIsEditNoDelete(params);

  const pageFullData: FullData[] | null = await getPageData({
    lang,
    pageName,
  });

  if (!pageFullData) {
    return null;
  }

  return (
    <>
      {!isAuthenticated || !isEdit ? (
        <ShowPageBase params={params} pageFullData={pageFullData} />
      ) : (
        <ShowPageEdit
          pageFullData={pageFullData}
          staticTexts={staticTexts}
          params={params}
        />
      )}
    </>
  );
};
