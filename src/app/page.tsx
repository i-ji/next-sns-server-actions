"use client";

import { useEffect, useState } from "react";
import Header from "./components/layout/Header";
import PostList from "./components/features/PostList";
import { PostType, UserType } from "@/utils/interface";
import {
  getAllAPIPosts,
  getFollowedUserAPIPosts,
} from "@/utils/supabaseFunctions";
import {
  updateScreenPost,
  deleteScreenPost,
  toPostType,
} from "@/utils/functions";
import Loading from "./loading";

export default function Home() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const changeScreenPosts = (_posts: PostType[]) => {
    setPosts(_posts);

    const newFollowedUserPosts = posts.filter((post) => {
      return post.users.isFollow;
    });

    setFollowedUserPosts(newFollowedUserPosts);
  };

  const [followedUserPosts, setFollowedUserPosts] = useState<PostType[]>([]);
  const changeFollowedUserScreenPosts = (
    _posts: PostType[],
    user_id: number
  ) => {
    const newFollowedUserPosts = _posts.filter((post) => {
      return post.user_id !== user_id;
    });
    setFollowedUserPosts(newFollowedUserPosts);

    const newPosts = posts.map((post) => {
      if (post.user_id === user_id) {
        post.users.isFollow = false;
      }

      return post;
    });

    setPosts(newPosts);
  };

  const reflectedScreenAddPost = (post: PostType) => {
    setPosts((prev) => [post, ...prev]);
    setFollowedUserPosts((prev) => [post, ...prev]);
  };

  const reflectedScreenDeletePost = (_post: PostType) => {
    const newPosts = deleteScreenPost(posts, _post.id);
    setPosts(newPosts);

    const newFollowedUserPosts = deleteScreenPost(followedUserPosts, _post.id);
    setFollowedUserPosts(newFollowedUserPosts);
  };

  const reflectedScreenUpdatePost = (_post: PostType, editedBody: string) => {
    const newPosts = updateScreenPost(posts, _post.id, editedBody);
    setPosts(newPosts);

    const newFollowedUserPosts = updateScreenPost(
      followedUserPosts,
      _post.id,
      editedBody
    );
    setFollowedUserPosts(newFollowedUserPosts);
  };

  const [isLoading, setIsLoading] = useState(true);

  const [isForYouUser, setIsForYouUser] = useState(true);
  const propsPosts = isForYouUser
    ? posts
    : followedUserPosts.sort((a, b) => b.id - a.id);

  const propsChangeScreenPosts = isForYouUser
    ? changeScreenPosts
    : changeFollowedUserScreenPosts;

  const changeIsForYouUser = (bool: boolean) => {
    setIsForYouUser(bool);
  };

  useEffect(() => {
    const getFetchPostsData = async () => {
      const newPosts: PostType[] = await getAllAPIPosts();

      setPosts(newPosts);
    };

    const getFetchFollowedUserPostsData = async () => {
      const newUsers: UserType[] = await getFollowedUserAPIPosts();
      const followedPost = [] as PostType[];

      newUsers.forEach((user) => {
        const newPosts = toPostType(user.posts, user.name, user.isFollow);
        newPosts.map((post) => {
          followedPost.push(post);
        });
      });

      setFollowedUserPosts(followedPost);
      setIsLoading(false);
    };

    getFetchPostsData();
    getFetchFollowedUserPostsData();
  }, []);

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
      />
    </>
  );
}
