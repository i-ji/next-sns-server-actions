import Link from "next/link";
import { UserType, PostType } from "@/utils/interface";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import HeaderTemp from "./HeaderTemp";
import PostBtn from "../../parts/PostBtn";
import FollowBtn from "../../parts/FollowBtn";

interface UserHeaderType {
  user: UserType;
  toggleScreenFollowBtn: (id: number, bool: boolean) => void;
  screenFollow: boolean;
  reflectedScreenAddPost: (post: PostType) => void;
}

const UserHeader = ({
  user,
  toggleScreenFollowBtn,
  screenFollow,
  reflectedScreenAddPost,
}: UserHeaderType) => {
  const topSlot = (
    <>
      <Link
        href={"/"}
        className={`${user.id === 11 ? "" : "mr-auto"}`}
        scroll={false}
      >
        <IoMdArrowRoundBack />
      </Link>

      <h1
        className={`sm:absolute sm:left-80 sm:-translate-x-1/2 text-center w-[140px] sm:w-[400px] truncate ${
          user.id === 11 ? "" : "translate-x-1/5"
        }`}
      >
        {user.name}
      </h1>

      {user.id === 11 ? (
        <PostBtn reflectedScreenPost={reflectedScreenAddPost} />
      ) : (
        <FollowBtn
          isFollow={screenFollow}
          user_id={user.id}
          toggleScreenFollowBtn={toggleScreenFollowBtn}
        />
      )}
    </>
  );

  const bottomSlot = (
    <>
      {user.id === 1 ? (
        <div></div>
      ) : (
        <Link
          href={`/user/${user.id - 1}`}
          className="w-1/2 text-center py-3 hover:bg-gray-100 flex items-center justify-center gap-2"
        >
          <FaAngleDoubleLeft />
          Prev User
        </Link>
      )}

      {user.id === 11 ? (
        <div></div>
      ) : (
        <Link
          href={`/user/${user.id + 1}`}
          className="w-1/2 text-center py-3 hover:bg-gray-100 flex items-center justify-center gap-2"
        >
          Next User
          <FaAngleDoubleRight />
        </Link>
      )}
    </>
  );

  return (
    <HeaderTemp topHeaderElement={topSlot} bottomHeaderElement={bottomSlot} />
  );
};

export default UserHeader;
