"use client";

import PostList from "../features/PostList";
import { PostType, UserType } from "@/utils/interface";
import UserHeader from "./header/UserHeader";
import { useIndividualPostsState } from "@/utils/hooks/DisplayUserPage/useIndividualPostsState";

interface DisplayType {
  user: UserType;
  posts: PostType[];
}

const Display = ({ user, posts }: DisplayType) => {
  const {
    screenPosts,
    screenFollow,
    toggleScreenFollowBtn,
    changeScreenPosts,
    reflectedScreenAddPost,
    reflectedScreenUpdatePost,
    reflectedScreenDeletePost,
  } = useIndividualPostsState(user, posts);

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
        propsObserverRef={null}
        propsHasMore={null}
      />
    </>
  );
};

export default Display;
