import { useDetermineIsFouUser } from "@/utils/functions";
import { PostType } from "@/utils/interface";
import { RefObject, SetStateAction } from "react";

interface UserToggleForYou {
  setIsForYouUser: (value: SetStateAction<boolean>) => void;
  isForYouUser: boolean;
  posts: PostType[];
  followedUserPosts: PostType[];
  changeScreenPosts: (_posts: PostType[]) => void;
  changeFollowedUserScreenPosts: (_posts: PostType[], user_id: number) => void;
  observerRef: RefObject<HTMLDivElement | null>;
  followObserverRef: RefObject<HTMLDivElement | null>;
  hasMore: boolean;
  followHasMore: boolean;
}

export const useToggleForYou = ({
  setIsForYouUser,
  isForYouUser,
  posts,
  followedUserPosts,
  changeScreenPosts,
  changeFollowedUserScreenPosts,
  observerRef,
  followObserverRef,
  hasMore,
  followHasMore,
}: UserToggleForYou) => {
  const changeIsForYouUser = (bool: boolean) => {
    setIsForYouUser(bool);
  };

  const propsPosts = useDetermineIsFouUser(
    isForYouUser,
    posts,
    followedUserPosts.sort((a, b) => b.id - a.id)
  );

  const propsChangeScreenPosts = useDetermineIsFouUser(
    isForYouUser,
    changeScreenPosts,
    changeFollowedUserScreenPosts
  );

  const propsObserverRef = useDetermineIsFouUser(
    isForYouUser,
    observerRef,
    followObserverRef
  );

  const propsHasMore = useDetermineIsFouUser(
    isForYouUser,
    hasMore,
    followHasMore
  );

  return {
    changeIsForYouUser,
    propsPosts,
    propsChangeScreenPosts,
    propsObserverRef,
    propsHasMore,
  };
};
