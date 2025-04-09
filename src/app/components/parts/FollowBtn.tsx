import React from "react";
import { Button } from "@/components/ui/button";

interface FollowBtnType {
  isFollow: boolean;
  user_id: number;
  toggleScreenFollowBtn: (user_id: number, bool: boolean) => void;
}

const FollowBtn = ({
  isFollow,
  user_id,
  toggleScreenFollowBtn,
}: FollowBtnType) => {
  const toggleFollow = async (bool: boolean) => {
    toggleScreenFollowBtn(user_id, bool);
  };

  return (
    <>
      {isFollow ? (
        <Button
          className=" rounded-2xl w-[100px] ml-auto h-[30px] cursor-pointer"
          onClick={() => toggleFollow(false)}
        >
          Following
        </Button>
      ) : (
        <Button
          variant="outline"
          className=" rounded-2xl w-[100px] ml-auto h-[30px] cursor-pointer"
          onClick={() => toggleFollow(true)}
        >
          Follow
        </Button>
      )}
    </>
  );
};

export default FollowBtn;
