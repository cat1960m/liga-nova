"use client";

import { FullData, MainParams } from "@/app/lib/definitions";
import { EditContextProvider } from "../EditContextProvider";
import { Undo } from "../Undo/Undo";
import { ShowPageBase } from "./ShowPageBase";
import { StaticTexts } from "@/app/dictionaries/definitions";

type Props = {
  pageFullData: FullData[];
  params: MainParams;
  staticTexts: StaticTexts;
};

export const ShowPageEdit = ({ pageFullData, params, staticTexts }: Props) => {
  return (
    <EditContextProvider
      pageFullDataList={pageFullData}
      staticTexts={staticTexts}
      pageName={params.pageName}
    >
      <Undo />
      <ShowPageBase params={params} pageFullData={pageFullData} />
    </EditContextProvider>
  );
};
