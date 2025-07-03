import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useInitialForYou = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialIsForYou = searchParams.get("isForYou") ?? "true";

  const [isForYouUser, setIsForYouUser] = useState(initialIsForYou === "true");

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("isForYou", isForYouUser.toString());
    router.push(`/?${params.toString()}`, { scroll: false });
  }, [isForYouUser, router, searchParams]);

  return {
    isForYouUser,
    setIsForYouUser,
  };
};
