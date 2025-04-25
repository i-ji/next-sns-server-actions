import { useState } from "react";
import { PostType } from "@/utils/interface";
import { deleteScreenPost, updateScreenPost } from "@/utils/functions";

export const usePostsState = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [followedUserPosts, setFollowedUserPosts] = useState<PostType[]>([]);
  const [allPosts, setAllPosts] = useState<PostType[]>([]);

  const changeScreenPosts = (_posts: PostType[]) => {
    setPosts(_posts);

    const newFollowedUserPosts = posts.filter((post) => {
      return post.users.isFollow;
    });

    const newPosts = allPosts
      .filter((post) =>
        newFollowedUserPosts.some((_post) => _post.user_id === post.user_id)
      )
      .map((post) => {
        post.users.isFollow = true;
        return post;
      });

    setFollowedUserPosts(newPosts);
  };
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
    setAllPosts((prev) => [post, ...prev]);
  };

  const reflectedScreenDeletePost = (_post: PostType) => {
    const newPosts = deleteScreenPost(posts, _post.id);
    setPosts(newPosts);

    const newFollowedUserPosts = deleteScreenPost(followedUserPosts, _post.id);
    setFollowedUserPosts(newFollowedUserPosts);

    const newAllPosts = deleteScreenPost(allPosts, _post.id);
    setAllPosts(newAllPosts);
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

    const newAllPosts = updateScreenPost(allPosts, _post.id, editedBody);
    setAllPosts(newAllPosts);
  };

  return {
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
  };
};
