import { RefObject } from "react";
import PostItem from "./PostItem";
import { PostType } from "@/utils/interface";
import { usePostsListState } from "@/utils/hooks/PostLayout/PostList/usePostListState";

interface PostListType {
  posts: PostType[];
  changeScreenPosts: (posts: PostType[], user_id: number) => void;
  reflectedScreenDeletePost: (post: PostType) => void;
  reflectedScreenUpdatePost: (post: PostType, editedBody: string) => void;
  propsObserverRef: RefObject<HTMLDivElement | null> | null;
  propsHasMore: boolean | null;
}

const PostList = ({
  posts,
  changeScreenPosts,
  reflectedScreenDeletePost,
  reflectedScreenUpdatePost,
  propsObserverRef,
  propsHasMore,
}: PostListType) => {
  const { toggleScreenFollowBtn, destroyPost, updatePost } = usePostsListState({
    posts,
    changeScreenPosts,
    reflectedScreenDeletePost,
    reflectedScreenUpdatePost,
  });

  return (
    <>
      <div className="mt-[104px] sm:mt-[150px] space-y-3 pb-10">
        {posts.map((post) => {
          return (
            <PostItem
              key={post.id}
              post={post}
              toggleScreenFollowBtn={toggleScreenFollowBtn}
              destroyPost={destroyPost}
              updatePost={updatePost}
            />
          );
        })}
      </div>

      {propsHasMore ? (
        <div ref={propsObserverRef} className="flex justify-center">
          {posts.length === 0 ? (
            <div></div>
          ) : (
            <div className="animate-spin h-6 w-6 border-4 border-gray-500 rounded-full border-t-transparent"></div>
          )}
        </div>
      ) : (
        <div></div>
      )}

      <h1 className="text-center text-2xl sm:text-3xl font-bold mt-[90px]">
        {posts.length === 0 ? "No posts yet" : ""}
      </h1>
    </>
  );
};

export default PostList;
