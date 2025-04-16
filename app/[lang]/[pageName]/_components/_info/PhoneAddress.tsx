import { FullData, MainParams } from "@/app/lib/definitions";
import { ShowInfoGroupItem } from "./ShowInfoGroupItem";
import { StaticTexts } from "@/app/dictionaries/definitions";
import { INFO_ADDRESS, INFO_BODY, INFO_TELEPHONE } from "@/app/lib/constants";

export type Props = {
  groupData: FullData[];
  isEdit: boolean;
  staticTexts: StaticTexts;
  params: MainParams;
};

export const PhoneAddress = ({
  groupData,
  isEdit,
  staticTexts,
  params,
}: Props) => {
  const dataAddress = groupData.find((item) => item.text_type === INFO_ADDRESS);
    const dataTelephone = groupData.find(
      (item) => item.text_type === INFO_TELEPHONE
    );

  return (
    <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
      <ShowInfoGroupItem
        isEdit={isEdit}
        staticTexts={staticTexts}
        data={dataTelephone}
        params={params}
      />

      <ShowInfoGroupItem
        isEdit={isEdit}
        staticTexts={staticTexts}
        data={dataAddress}
        params={params}
      />
    </div>
  );
};
