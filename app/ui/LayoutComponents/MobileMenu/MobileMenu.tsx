"use client";

import { Bars3Icon, PhoneIcon } from "@heroicons/react/24/outline";
import styles from "./mobileMenu.module.css";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { PageData } from "@/app/lib/definitions";
import { MobileMenuOpen } from "./MobileMenuOpen/MobileMenuOpen";
import { Logo } from "../Logo/Logo";

export type Props = {
  basePages: PageData[];
  mainPages: PageData[];
  lang: string;
};

export const MobileMenu = (props: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    return () => {
      setIsMenuOpen(false);
    };
  }, []);
  return (
    <div className={styles.main}>
      {isMenuOpen ? (
        <MobileMenuOpen {...props} onClose={() => setIsMenuOpen(false)} />
      ) : null}
      {!isMenuOpen ? (
        <div className={styles.container}>
          <Bars3Icon onClick={() => setIsMenuOpen(true)} width="32px" />

          <Logo />

          <PhoneIcon className={styles.phone} />
        </div>
      ) : null}
    </div>
  );
};
