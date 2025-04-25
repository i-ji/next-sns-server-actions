import { useState } from "react";
import { toggleFollowAPIUser } from "@/utils/supabaseFunctions";
import { updateScreenPost, deleteScreenPost } from "@/utils/functions";
import { PostType, UserType } from "@/utils/interface";

export const useIndividualPostsState = (user: UserType, posts: PostType[]) => {
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

  return {
    screenPosts,
    screenFollow,
    toggleScreenFollowBtn,
    changeScreenPosts,
    reflectedScreenAddPost,
    reflectedScreenUpdatePost,
    reflectedScreenDeletePost,
  };
};
