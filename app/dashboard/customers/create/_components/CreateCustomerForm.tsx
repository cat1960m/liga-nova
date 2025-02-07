"use client";

import { createCustomer1, State } from "@/app/lib/actions_customers";
import { Button } from "@/app/ui/button";
import Link from "next/link";
import { useActionState } from "react";

export const CreateCustomerForm = () => {
  const initialState: State = { message: null, errors: {} };

  const [state, formAction] = useActionState(createCustomer1, initialState);

  console.log("state", state);

  return (
    <form action={formAction}>
      <div>
        <p> Name:</p>
        <input name="name" aria-label="Name" />
      </div>
      <div>
        <p> Email:</p>
        <input name="email" aria-label="Email" type="email" />
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/customers"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Invoice</Button>
      </div>
    </form>
  );
};
