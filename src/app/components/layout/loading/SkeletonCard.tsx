import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonCard = () => {
  return (
    <Card className="mx-1 sm:mx-0">
      <CardHeader>
        <CardTitle className="font-bold text-2xl flex justify-between">
          <Skeleton className="w-11/12 sm:w-[590px] h-5 sm:h-8 rounded-full" />
        </CardTitle>
      </CardHeader>
      <CardContent className=" space-y-2">
        <Skeleton className="w-11/12 sm:w-[590px] h-5 sm:h-8 rounded-full" />
        <Skeleton className="w-11/12 sm:w-[590px] h-5 sm:h-8 rounded-full" />
        <Skeleton className="w-1/2 sm:w-[300px] h-5 sm:h-8  rounded-full" />
      </CardContent>
    </Card>
  );
};

export default SkeletonCard;
