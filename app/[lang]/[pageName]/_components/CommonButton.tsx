"use client";

export const CommonButton = ({
  text,
  onClick,
  isDisabled,
}: {
  text: string;
  onClick: () => void;
  isDisabled?: boolean;
}) => {
  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      style={{ color: isDisabled ? "lightgray" : "black" }}
      className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
    >
      {text}
    </button>
  );
};
