import { PageData } from "@/app/lib/definitions";
import styles from "./mobileMenu.module.css";
import { LinkBody } from "../LinkBody/LInkBody";
import { PhoneIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ActionButton } from "../../[pageName]/_components/__commonComponents/_buttons/ActionButton/ActionButton";
import { PHONE, WORK_SCHEDULE1, WORK_SCHEDULE2 } from "@/app/lib/constants";

export type Props = {
  basePages: PageData[];
  mainPages: PageData[];
  lang: string;
  onClose: () => void;
};

export const MobileMenu = ({ basePages, mainPages, lang, onClose }: Props) => {
  const handlePhoneClick = () => {};
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.schedule}>{WORK_SCHEDULE1}{WORK_SCHEDULE2}</div>
        <XMarkIcon width="32px" onClick={onClose} />
      </div>
      <div className={styles.header1}>
        <ActionButton onClick={handlePhoneClick}>
          <PhoneIcon />
          {PHONE}
        </ActionButton>
      </div>

      {mainPages?.map((page) => {
        return (
          <LinkBody
            pageName={page.name}
            lang={lang}
            isMain
            pageTitle={page.text_content}
            key={page.id}
          />
        );
      })}
      {basePages?.map((page) => {
        return (
          <LinkBody
            pageName={page.name}
            lang={lang}
            isMain
            pageTitle={page.text_content}
            key={page.id}
          />
        );
      })}
    </div>
  );
};
