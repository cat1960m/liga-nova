"use client";

import { usePathname, useRouter } from "next/navigation";

export const AddCustomerButton = () => {
  const router = useRouter();
  const pathName = usePathname();

  const handleClick = () => {
    router.replace(`${pathName}/create`);
  };
  return (
    <button
      onClick={handleClick}
      style={{ width: "50%" }}
      className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
    >
      Add Customer
    </button>
  );
};
