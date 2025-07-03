import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const SkeletonCard = () => {
  return (
    <Card className="mx-1 sm:mx-0 gap-1.5">
      <CardHeader>
        <CardTitle className="font-bold text-2xl flex justify-between">
          <Skeleton className="w-7/12 sm:w-[390px] h-8 rounded-full mt-0" />
          <Button
            variant="outline"
            className="rounded-2xl w-[100px] ml-auto h-[30px]"
          >
            Follow
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 py-0.5">
        <Skeleton className="w-11/12 sm:w-[590px] h-4 rounded-full" />
        <Skeleton className="w-11/12 sm:w-[590px] h-4 rounded-full" />
        <Skeleton className="w-11/12 sm:w-[590px] h-4 rounded-full sm:hidden" />
        <Skeleton className="w-1/2 sm:w-[300px] h-4   rounded-full" />
      </CardContent>
    </Card>
  );
};

export default SkeletonCard;
