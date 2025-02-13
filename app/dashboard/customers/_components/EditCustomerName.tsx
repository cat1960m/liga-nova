"use client";

import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { ChangeText } from "./ChangeText";

export const EditCustomerName = ({
  id,
  name,
}: {
  id: string;
  name: string;
}) => {
  const [editId, setEditId] = useState<string | null>(null);

  return (
    <>
      <PencilIcon
        style={{ width: "24px", height: "24px" }}
        title="Edit customer"
        onClick={() => setEditId(id)}
      />
      {editId ? (
        <ChangeText name={name} onClose={() => setEditId(null)} />
      ) : null}
    </>
  );
};
