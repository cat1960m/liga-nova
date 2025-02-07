"use client";

import { getCustomers } from "@/app/lib/actions_customers";
import { Customer } from "@/app/lib/definitions";
import clsx from "clsx";
import { use, useState } from "react";
import postgres from "postgres";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

export const Customers = ({
  customers: customersPromise,
}: {
  customers: Promise<postgres.RowList<Customer[]> | null>;
}) => {
  const customers = use(customersPromise);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const router = useRouter();
  const pathname = usePathname();

  if (!customers) {
    return <p>Customers Page error</p>;
  }
  const handleClick = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  if (!customers) {
    return <p>Customers Page error</p>;
  }

  return (
    <>
      <p>Customers Page!!!</p>
      <button
        onClick={() => router.replace(`${pathname}/create`)}
        style={{ width: "50%" }}
        className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
      >
        Add Customer
      </button>

      {customers?.map(({ id, name, email, image_url }) => {
        return (
          <div key={id}>
            {image_url ? (
              <Image src={image_url} alt="...image" width="40" height={20} />
            ) : null}
            {image_url}
            <p
              className={clsx({
                "text-sm text-red-500": selectedIds.includes(id),
              })}
              onClick={() => handleClick(id)}
            >{`${name} - ${email}`}</p>
          </div>
        );
      })}
    </>
  );
};
