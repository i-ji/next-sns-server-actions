import Link from "next/link";
import { FaUser } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import HeaderTemp from "./HeaderTemp";
import { PostType } from "@/utils/interface";
import PostBtn from "../../parts/PostBtn";

interface HeaderType {
  isForYouUser: boolean;
  changeIsForYouUser: (bool: boolean) => void;
  reflectedScreenPost: (post: PostType) => void;
}

const Header = ({
  isForYouUser,
  changeIsForYouUser,
  reflectedScreenPost,
}: HeaderType) => {
  const topScroll = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  const topSlot = (
    <>
      <Link href={"/user/11"}>
        <FaUser />
      </Link>
      <FaTwitter onClick={topScroll} className="cursor-pointer" />
      <PostBtn reflectedScreenPost={reflectedScreenPost} />
    </>
  );

  const bottomSlot = (
    <>
      <div
        className={`w-1/2 text-center py-3 hover:bg-gray-100 flex items-center justify-center gap-2 ${
          isForYouUser ? "bg-gray-100" : ""
        }`}
        onClick={() => changeIsForYouUser(true)}
      >
        For You
      </div>
      <div
        className={`w-1/2 text-center py-3 hover:bg-gray-100 flex items-center justify-center gap-2 ${
          isForYouUser ? "" : "bg-gray-100"
        }`}
        onClick={() => changeIsForYouUser(false)}
      >
        Following
      </div>
    </>
  );

  return (
    <HeaderTemp topHeaderElement={topSlot} bottomHeaderElement={bottomSlot} />
  );
};

export default Header;
