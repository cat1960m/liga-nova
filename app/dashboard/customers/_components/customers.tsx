"use client";

import { getCustomers, removeCustomer } from "@/app/lib/actions_customers";
import { Customer } from "@/app/lib/definitions";
import clsx from "clsx";
import { use, useActionState, useState } from "react";
import postgres from "postgres";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/app/ui/button";
import styles from "./styles.module.css";

export const Customers = ({
  customers: customersPromise,
}: {
  customers: Promise<postgres.RowList<Customer[]> | null>;
}) => {
  const customers = use(customersPromise);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  const [disabledIds, setDisabledIds] = useState<string[]>([]);

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

  const handleRemove = async (id: string) => {
    setDisabledIds([...disabledIds, id]);
    setTimeout(async () => {
      await removeCustomer(id);
      setDisabledIds(disabledIds.filter((disabledId) => disabledId !== id));
    }, 3000);
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

      <table>
        <thead>
          <tr>
            <th>image</th>
            <th className={styles.headerColumn2}>name</th>
            <th>email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {customers?.map(({ id, name, email, image_url }) => {
            return (
              <tr key={id}>
                <td>
                  {image_url ? (
                    <Image
                      src={image_url}
                      alt="...image"
                      width="40"
                      height={20}
                    />
                  ) : (
                    <></>
                  )}
                </td>

                <td>
                  <p
                    className={clsx({
                      "text-sm text-red-500": selectedIds.includes(id),
                    })}
                    onClick={() => handleClick(id)}
                  >{`${name}`}</p>
                </td>

                <td>
                  <p
                    className={clsx({
                      "text-sm text-red-500": selectedIds.includes(id),
                    })}
                    onClick={() => handleClick(id)}
                  >{`${email}`}</p>
                </td>

                <td onClick={() => handleRemove(id)}>
                  <button
                    className={clsx(
                      "flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
                    )}
                    disabled={disabledIds.includes(id)}
                  >
                    {!disabledIds.includes(id) ? "Remove" : "-------"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
