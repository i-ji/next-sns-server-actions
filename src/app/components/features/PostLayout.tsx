"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "../layout/header/Header";
import PostList from "./PostList";
import { PostType } from "@/utils/interface";
import {
  getAllAPIPosts,
  getFollowedUserAPIPosts,
} from "@/utils/supabaseFunctions";
import { useDetermineIsFouUser } from "@/utils/functions";
import Loading from "@/app/loading";
import { usePostsState } from "@/utils/hooks/PostLayout/usePostsState";

const LIMIT = "10";

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

  const router = useRouter();
  const searchParams = useSearchParams();
  const initialIsForYou = searchParams.get("isForYou") ?? "true";

  const [isForYouUser, setIsForYouUser] = useState(initialIsForYou === "true");

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("isForYou", isForYouUser.toString());
    router.push(`/?${params.toString()}`, { scroll: false });
  }, [isForYouUser, router, searchParams]);

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

  const changeIsForYouUser = (bool: boolean) => {
    setIsForYouUser(bool);
  };

  const [offset, setOffset] = useState(0);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const loadingRef = useRef(false);

  const getFetchPostsData = async () => {
    if (loadingRef.current || !hasMore) return;
    loadingRef.current = true;

    const newPosts: PostType[] = await getAllAPIPosts(offset, LIMIT);
    if (newPosts.length < Number(LIMIT)) setHasMore(false);

    setPosts((prev) => [...prev, ...newPosts]);
    setOffset((prev) => prev + Number(LIMIT));

    loadingRef.current = false;
  };

  const [followOffset, setFollowOffset] = useState(0);
  const followObserverRef = useRef<HTMLDivElement | null>(null);
  const [followHasMore, setFollowHasMore] = useState(true);
  const followLoadingRef = useRef(false);

  const getFetchFollowedUserPostsData = async () => {
    if (followLoadingRef.current || !followHasMore) return;
    followLoadingRef.current = true;
    const followedPosts = await getFollowedUserAPIPosts(followOffset, LIMIT);

    if (followedPosts.length < LIMIT) setFollowHasMore(false);
    setFollowedUserPosts((prev) => [...prev, ...followedPosts]);
    setFollowOffset((prev) => prev + Number(LIMIT));
    followLoadingRef.current = false;
  };

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

  useEffect(() => {
    const getAllPostsData = async () => {
      const posts = await getAllAPIPosts(offset, "all");
      setAllPosts(posts);
    };
    getAllPostsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getFetchPostsData();
    getFetchFollowedUserPostsData();
    setIsLoading(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        const target = entries[0];

        if (target.isIntersecting) {
          if (isForYouUser) {
            getFetchPostsData();
          } else {
            getFetchFollowedUserPostsData();
          }
        }
      },
      {
        threshold: 0.8,
      }
    );

    const currentRef = isForYouUser
      ? observerRef.current
      : followObserverRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isForYouUser, offset, followOffset]);

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
