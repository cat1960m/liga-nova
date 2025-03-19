import { StaticTexts } from "@/app/dictionaries/definitions";
import { FullData } from "@/app/lib/definitions";
import { AddEditTrainerItem } from "./_trainers/AddEditTrainerItem";
import { AddEditSubscriptionItem } from "./_tickets/AddEditSubscriptionItem";
import { TICKETS, TRAINERS } from "@/app/lib/constants";

export type Props = {
  commonWidth: string;
  staticTexts: StaticTexts;
  addEditItemFeatureId: number;
  currentData: FullData[];
  pageName: string;
  setIsSaveDisabled: (value: boolean) => void;
};

export const AddEditListItem = ({
  commonWidth,
  staticTexts,
  addEditItemFeatureId,
  currentData,
  pageName,
  setIsSaveDisabled,
}: Props) => {
  return (
    <>
      {pageName === TICKETS ? (
        <AddEditSubscriptionItem
          currentData={currentData}
          subscriptionItemFeatureId={addEditItemFeatureId}
          staticTexts={staticTexts}
          commonWidth={commonWidth}
        />
      ) : null}
      {pageName === TRAINERS ? (
        <AddEditTrainerItem
          currentData={currentData}
          trainerItemFeatureId={addEditItemFeatureId}
          staticTexts={staticTexts}
          commonWidth="32%"
          setIsSaveDisabled={setIsSaveDisabled}
        />
      ) : null}
    </>
  );
};
