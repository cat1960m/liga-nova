import { signOut } from "@/app/auth";
import { UserIcon } from "@heroicons/react/24/outline";
import { UserIcon as UserIconSolid } from "@heroicons/react/24/solid";

import Link from "next/link";

import styles from "./logInOut.module.css";

export type Props = {
  isAuthenticated: boolean;
};

export const LogInOut = ({ isAuthenticated }: Props) => {
  return (
    <>
      {isAuthenticated ? (
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button className={styles.container} title="Sign Out">
            <UserIconSolid className={styles.icon} />
          </button>
        </form>
      ) : (
        <Link href="/login" className={styles.container} title="Log In">
          <UserIcon className={styles.icon} />
        </Link>
      )}
    </>
  );
};
