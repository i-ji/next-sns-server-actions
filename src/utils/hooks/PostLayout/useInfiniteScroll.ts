import { PostType } from "@/utils/interface";
import {
  getAllAPIPosts,
  getFollowedUserAPIPosts,
} from "@/utils/supabaseFunctions";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

const LIMIT = "10";

interface UseInfiniteScrollProps {
  setPosts: Dispatch<SetStateAction<PostType[]>>;
  setFollowedUserPosts: Dispatch<SetStateAction<PostType[]>>;
  isForYouUser: boolean;
  setAllPosts: (value: SetStateAction<PostType[]>) => void;
  setIsLoading: (value: SetStateAction<boolean>) => void;
}

export const useInfiniteScroll = ({
  setPosts,
  setFollowedUserPosts,
  isForYouUser,
  setAllPosts,
  setIsLoading,
}: UseInfiniteScrollProps) => {
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

  return {
    offset,
    observerRef,
    hasMore,
    getFetchPostsData,
    followOffset,
    followObserverRef,
    followHasMore,
    getFetchFollowedUserPostsData,
  };
};
