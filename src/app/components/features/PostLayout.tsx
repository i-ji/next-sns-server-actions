"use client";

import { useState } from "react";
import Header from "../layout/header/Header";
import PostList from "./PostList";
import Loading from "@/app/loading";
import { usePostsState } from "@/utils/hooks/PostLayout/usePostsState";
import { useInitialForYou } from "@/utils/hooks/PostLayout/useInitialForYou";
import { useInfiniteScroll } from "@/utils/hooks/PostLayout/useInfiniteScroll";
import { useToggleForYou } from "@/utils/hooks/PostLayout/useToggleIsForYou";

const PostLayout = () => {
  const {
    posts,
    setPosts,
    followedUserPosts,
    setFollowedUserPosts,
    changeScreenPosts,
    changeFollowedUserScreenPosts,
    reflectedScreenAddPost,
    reflectedScreenUpdatePost,
    reflectedScreenDeletePost,
    setAllPosts,
  } = usePostsState();

  const [isLoading, setIsLoading] = useState(true);

  const { isForYouUser, setIsForYouUser } = useInitialForYou();

  const { observerRef, hasMore, followObserverRef, followHasMore } =
    useInfiniteScroll({
      setPosts,
      setFollowedUserPosts,
      isForYouUser,
      setAllPosts,
      setIsLoading,
    });

  const {
    changeIsForYouUser,
    propsPosts,
    propsChangeScreenPosts,
    propsObserverRef,
    propsHasMore,
  } = useToggleForYou({
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
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Header
        isForYouUser={isForYouUser}
        changeIsForYouUser={changeIsForYouUser}
        reflectedScreenPost={reflectedScreenAddPost}
      />

      <PostList
        posts={propsPosts}
        changeScreenPosts={propsChangeScreenPosts}
        reflectedScreenDeletePost={reflectedScreenDeletePost}
        reflectedScreenUpdatePost={reflectedScreenUpdatePost}
        propsObserverRef={propsObserverRef}
        propsHasMore={propsHasMore}
      />
    </>
  );
};

export default PostLayout;
