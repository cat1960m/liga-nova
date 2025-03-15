import { FullData } from "@/app/lib/definitions";
import { SubscriptionItem } from "./_tickets/SubscriptionItem";
import { TrainerItem } from "./_trainers/TrainerItem";

export type Props = {
  currentData: FullData[];
  pageName: string;
};

export const ListItem = ({ currentData, pageName }: Props) => {
  return (
    <>
      {pageName === "tickets" ? (
        <SubscriptionItem currentData={currentData} />
      ) : null}
      {pageName === "trainers" ? (
        <TrainerItem currentData={currentData} />
      ) : null}
    </>
  );
};
