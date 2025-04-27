import { FullData, MainParams } from "@/app/lib/definitions";
import { ShowInfoGroupItem } from "./ShowInfoGroupItem";
import { INFO_ADDRESS, INFO_BODY, INFO_TELEPHONE } from "@/app/lib/constants";

export type Props = {
  groupData: FullData[];
  params: MainParams;
};

export const PhoneAddress = ({
  groupData,
  params,
}: Props) => {
  const dataAddress = groupData.find((item) => item.text_type === INFO_ADDRESS);
  const dataTelephone = groupData.find(
    (item) => item.text_type === INFO_TELEPHONE
  );

  return (
    <div
      style={{
        display: "flex",
        gap: "30px",
        flexWrap: "wrap",
      }}
    >
      <ShowInfoGroupItem
        data={dataTelephone}
        params={params}
      />

      <ShowInfoGroupItem
        data={dataAddress}
        params={params}
      />
    </div>
  );
};
