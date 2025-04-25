import { StaticTexts } from "@/app/dictionaries/definitions";
import { FullData, MainParams } from "@/app/lib/definitions";
import { EditTrainerItem } from "./_trainers/EditTrainerItem";
import { EditSubscriptionItem } from "./_tickets/EditSubscriptionItem";
import { TICKETS_PAGE_NAME, TRAINERS_PAGE_NAME } from "@/app/lib/constants";

export type Props = {
  staticTexts: StaticTexts;
  currentData: FullData[];
  pageName: string;
  params: MainParams;
};

export const EditListItem = ({
  staticTexts,
  currentData,
  pageName,
  params,
}: Props) => {
  return (
    <div style={{ width: "100%" }}>
      {pageName === TICKETS_PAGE_NAME ? (
        <EditSubscriptionItem
          currentData={currentData}
          staticTexts={staticTexts}
          params={params}
        />
      ) : null}
      {pageName === TRAINERS_PAGE_NAME ? (
        <EditTrainerItem
          currentData={currentData}
          staticTexts={staticTexts}
          params={params}
        />
      ) : null}
    </div>
  );
};
