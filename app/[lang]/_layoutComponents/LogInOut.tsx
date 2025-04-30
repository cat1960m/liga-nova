import { signOut } from "@/app/auth";
import { ArrowRightIcon, PowerIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export type Props = {
    isAuthenticated: boolean;
}

export const LogInOut = ({isAuthenticated}: Props) => {
    return (
        <>
         {isAuthenticated ? (
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
              <PowerIcon className="w-6" />
              <div className="hidden md:block">Sign Out</div>
            </button>
          </form>
        ) : (
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        )}
        </>
    )
}