import { FullData } from "@/app/lib/definitions";
import { ShowInfoGroupItem } from "../ShowInfoGroupItem/ShowInfoGroupItem";
import { INFO_ADDRESS, INFO_TELEPHONE } from "@/app/lib/constants";
import styles from "./phoneAddress.module.css";
import { StaticTexts } from "@/app/dictionaries/definitions";

export type Props = {
  groupData: FullData[];
  isEdit: boolean;
  lang: string;
  staticTexts: StaticTexts;
};

export const PhoneAddress = ({ groupData, staticTexts, lang, isEdit }: Props) => {
  const dataAddress = groupData.find((item) => item.text_type === INFO_ADDRESS);
  const dataTelephone = groupData.find(
    (item) => item.text_type === INFO_TELEPHONE
  );

  return (
    <div className={styles.container}>
      <ShowInfoGroupItem
        data={dataTelephone}
        staticTexts={staticTexts}
        lang={lang}
        isEdit={isEdit}
      />
      <ShowInfoGroupItem
        data={dataAddress}
        staticTexts={staticTexts}
        lang={lang}
        isEdit={isEdit}
      />
    </div>
  );
};
