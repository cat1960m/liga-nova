"use server";

import { getCustomers } from "@/app/lib/actions_customers";
import { Customers } from "./_components/customers";
import { Suspense } from "react";
import Link from "next/link";

export default async function Page() {
  const customers = getCustomers();

  return (
    <>
      ---------
      <Suspense fallback={"...Loading"}>
        <Link
          href={"/dashboard/customers/create"}
          className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
        >
          Create Customer
        </Link>

        <Customers customers={customers} />
      </Suspense>
      {/*  <Customers customers={customers} /> */}
    </>
  );
}
