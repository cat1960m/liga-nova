import { getPageData } from "@/app/lib/actionsContainer";
import { FullData } from "@/app/lib/definitions";
import { useCallback, useEffect, useMemo, useState } from "react";

export const useIcons = ({
  lang,
  isNoUseIcon = false,
}: {
  lang: string;
  isNoUseIcon?: boolean;
}) => {
  const [icons, setIcons] = useState<FullData[]>([]);

  const getIcons = useCallback(async () => {
    const pageFullData: FullData[] | null = await getPageData({
      lang,
      pageName: "icon",
    });

    setIcons(pageFullData ?? []);
  }, [lang]);

  useEffect(() => {
    if (isNoUseIcon) {
      return;
    }
    getIcons();
  }, [isNoUseIcon, getIcons]);

  const reloadIcons = async () => {
    await getIcons();
  };

  const PREMIUM = "premium%28--0%29";
  const premiumIcon = useMemo(
    () => icons.find((icon) => icon.value?.includes(PREMIUM)),
    [icons]
  );

  return { icons, premiumIcon, reloadIcons };
};
