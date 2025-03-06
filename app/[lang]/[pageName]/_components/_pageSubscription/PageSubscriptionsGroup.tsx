"use client";

import { StaticTexts } from "@/app/dictionaries/definitions";
import { FullData } from "@/app/lib/definitions";
import { PageSubscriptionsGroupEdit } from "./PageSubscriptionsGroupEdit";
import { PageSubscriptionsGroupShow } from "./PageSubscriptionsGroupShow";

export type Props = {
  currentData: FullData;
  isEdit: boolean;
  staticTexts: StaticTexts;
  pageFullDataList: FullData[];
};

export const PageSubscriptionsGroup = ({
  currentData,
  isEdit,
  staticTexts,
  pageFullDataList,
}: Props) => {
  return (
    <>
      {isEdit ? (
        <PageSubscriptionsGroupEdit
          currentData={currentData}
          staticTexts={staticTexts}
          pageFullDataList={pageFullDataList}
        />
      ) : (
        <PageSubscriptionsGroupShow
          currentData={currentData}
          pageFullDataList={pageFullDataList}
        />
      )}

      <img
        src="https://fitness-5fc8d921.s3.us-east-1.amazonaws.com/avatar+(1)+(1)+(1)+(4).png"
        alt="Image 1"
      />
    </>
  );
};
