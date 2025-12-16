"use client";

import { Bars3Icon, PhoneIcon } from "@heroicons/react/24/outline";
import styles from "./mobileMenu.module.css";
import { useEffect, useState } from "react";
import { PageData } from "@/app/lib/definitions";
import { MobileMenuOpen } from "./MobileMenuOpen/MobileMenuOpen";
import { Logo } from "../Logo/Logo";
import { usePathname } from "next/navigation";
import { LangSelector } from "../LangSelector";

export type Props = {
  basePages: PageData[];
  mainPages: PageData[];
  lang: string;
};

export const MobileMenu = (props: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    setIsMenuOpen(false);

    return () => {
      setIsMenuOpen(false);
    };
  }, [pathName]);

  return (
    <div className={styles.main}>
      {isMenuOpen ? (
        <MobileMenuOpen {...props} onClose={() => setIsMenuOpen(false)} />
      ) : null}
      {!isMenuOpen ? (
        <div className={styles.container}>
          <Bars3Icon onClick={() => setIsMenuOpen(true)} width="32px" />

          <Logo />

          <div className={styles.right}>
            <LangSelector />
            <PhoneIcon className={styles.phone} />
          </div>
        </div>
      ) : null}
    </div>
  );
};
