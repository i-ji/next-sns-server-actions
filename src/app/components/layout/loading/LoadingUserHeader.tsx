import React from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import HeaderTemp from "../HeaderTemp";

const LoadingUserHeader = () => {
  const topSlot = (
    <>
      <IoMdArrowRoundBack />
      <h1 className="absolute left-1/3 sm:left-80 sm:-translate-x-1/2 w-[270px]">
        <Skeleton className="w-1/2 sm:w-full h-[24px] sm:h-[30px] rounded-full" />
      </h1>

      <Button
        className=" rounded-2xl sm:w-[100px] ml-auto h-[30px]"
        variant="outline"
      >
        Follow
      </Button>
    </>
  );

  const bottomSlot = (
    <>
      <div className="w-1/2 text-center py-3 hover:bg-gray-100 flex items-center justify-center gap-2">
        <FaAngleDoubleLeft />
        Prev User
      </div>

      <div className="w-1/2 text-center py-3 hover:bg-gray-100 flex items-center justify-center gap-2">
        Next User
        <FaAngleDoubleRight />
      </div>
    </>
  );
  return (
    <HeaderTemp topHeaderElement={topSlot} bottomHeaderElement={bottomSlot} />
  );
};

export default LoadingUserHeader;
