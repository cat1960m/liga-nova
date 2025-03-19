import { FullData } from "@/app/lib/definitions";
import { SubscriptionItem } from "./_tickets/SubscriptionItem";
import { TrainerItem } from "./_trainers/TrainerItem";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { TICKETS, TRAINERS } from "@/app/lib/constants";

export type Props = {
  currentData: FullData[];
  pageName: string;
  pageFullDataList: FullData[];
  staticTexts: StaticTexts;
};

export const ListItem = ({
  currentData,
  pageName,
  pageFullDataList,
  staticTexts,
}: Props) => {
  return (
    <>
      {pageName === TICKETS ? (
        <SubscriptionItem currentData={currentData} />
      ) : null}
      {pageName === TRAINERS ? (
        <TrainerItem
          currentData={currentData}
          pageFullDataList={pageFullDataList}
          staticTexts={staticTexts}
        />
      ) : null}
    </>
  );
};
