"use client";

import PostList from "../features/PostList";
import { PostType, UserType } from "@/utils/interface";
import UserHeader from "./UserHeader";
import { useState } from "react";
import { toggleFollowAPIUser } from "@/utils/supabaseFunctions";
import { deleteScreenPost, updateScreenPost } from "@/utils/functions";

interface DisplayType {
  user: UserType;
  posts: PostType[];
}

const Display = ({ user, posts }: DisplayType) => {
  const [screenPosts, setScreenPosts] = useState([...posts]);
  const [screenFollow, setScreenFollow] = useState(user.isFollow);

  const toggleScreenFollowBtn = async (id: number, bool: boolean) => {
    await toggleFollowAPIUser(id, bool);
    const newPosts = posts.map((post) => {
      post.users.isFollow = bool;
      return post;
    });
    changeScreenPosts(newPosts);
  };

  const changeScreenPosts = (_posts: PostType[]) => {
    setScreenFollow((prev) => !prev);

    setScreenPosts(_posts);
  };

  const reflectedScreenAddPost = (post: PostType) => {
    setScreenPosts((prev) => [post, ...prev]);
  };

  const reflectedScreenUpdatePost = (post: PostType, editedBody: string) => {
    const newPosts = updateScreenPost(screenPosts, post.id, editedBody);
    setScreenPosts(newPosts);
  };

  const reflectedScreenDeletePost = (post: PostType) => {
    const newPosts = deleteScreenPost(screenPosts, post.id);
    setScreenPosts(newPosts);
  };

  return (
    <>
      <UserHeader
        user={user}
        toggleScreenFollowBtn={toggleScreenFollowBtn}
        screenFollow={screenFollow}
        reflectedScreenAddPost={reflectedScreenAddPost}
      />
      <PostList
        posts={screenPosts}
        changeScreenPosts={changeScreenPosts}
        reflectedScreenUpdatePost={reflectedScreenUpdatePost}
        reflectedScreenDeletePost={reflectedScreenDeletePost}
      />
    </>
  );
};

export default Display;
