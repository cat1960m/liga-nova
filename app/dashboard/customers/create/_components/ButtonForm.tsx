"use client";

import { createCustomer1, State } from "@/app/lib/actions_customers";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

export const ButtonForm = () => {
  const { pending, data } = useFormStatus();

  data?.set("image_url", "public/customers/amy-burns.png");

  return (
    <button type="submit" disabled={pending}>
      {pending ? "loading..." : "Submit"}
    </button>
  );
};
