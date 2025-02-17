"use client";

import { RemoveFeature } from "@/app/lib/actions_fitness";
import { usePathname } from "next/navigation";

export const DeleteButton = ({ featureId }: { featureId: number }) => {
  const pathName = usePathname();

  const handleDelete = async () => {
    await RemoveFeature({ id: featureId, pathName: pathName });
  };

  return (
    <button
      onClick={handleDelete}
      className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
    >
      Delete
    </button>
  );
};
