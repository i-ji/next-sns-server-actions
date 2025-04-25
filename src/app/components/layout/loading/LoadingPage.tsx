import { ReactNode } from "react";
import SkeletonCard from "./SkeletonCard";

interface LoadingPageType {
  headerSlot: ReactNode;
}

const LoadingPage = ({ headerSlot }: LoadingPageType) => {
  return (
    <div className="max-w-[640px] mx-auto">
      {headerSlot}

      <div className="mt-[104px] sm:mt-[150px] space-y-3 pb-10">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  );
};

export default LoadingPage;
