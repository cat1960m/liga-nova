"use client";

import { createCustomer1, State } from "@/app/lib/actions_customers";
import { Button } from "@/app/ui/button";
import Link from "next/link";
import Form from "next/form";
import { useActionState, useState } from "react";
import { ButtonForm } from "./ButtonForm";
import { ImageForm } from "./ImageForm";
import { InputItem } from "./InputItem";

export const CreateCustomerForm = () => {
  const initialState: State = { message: null, errors: {} };
  const [imageValue, setImageValue] = useState("");

  const [state, formAction] = useActionState(createCustomer1, initialState);

  return (
    <Form action={formAction}>
      <InputItem state={state} />
      <div>
        <p> Email:</p>
        <input
          name="email"
          aria-label="Email"
          type="email"
          aria-describedby="email_area"
          defaultValue={state?.lastData?.get("email")?.toString() ?? undefined}
        />
      </div>
      <div id="email_area" aria-live="polite" aria-atomic="true">
        {state.errors?.email &&
          state.errors.email.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
      <ImageForm state={state} />
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/customers"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <ButtonForm />
      </div>
    </Form>
  );
};
