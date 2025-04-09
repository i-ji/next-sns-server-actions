import React from "react";
import { FaUser } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import HeaderTemp from "../HeaderTemp";

const LoadingHeader = () => {
  const topSlot = (
    <>
      <FaUser />

      <FaTwitter />
      <FaPen />
    </>
  );

  const bottomSlot = (
    <>
      <div
        className={`w-1/2 text-center py-3 hover:bg-gray-100 flex items-center justify-center gap-2 `}
      >
        For You
      </div>
      <div
        className={`w-1/2 text-center py-3 hover:bg-gray-100 flex items-center justify-center gap-2 `}
      >
        Following
      </div>
    </>
  );
  return (
    <HeaderTemp topHeaderElement={topSlot} bottomHeaderElement={bottomSlot} />
  );
};

export default LoadingHeader;
