import { RefObject } from "react";
import PostItem from "./PostItem";
import { PostType } from "@/utils/interface";
import { toggleFollowAPIUser } from "@/utils/supabaseFunctions";
import { updateActionPost, deleteActionPost } from "@/utils/actions";

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
  const toggleScreenFollowBtn = async (id: number, bool: boolean) => {
    const [user] = await toggleFollowAPIUser(id, bool);
    const newPosts = posts.map((post) => {
      if (user.id === post.user_id) {
        post.users.isFollow = bool;
      }
      return post;
    });

    changeScreenPosts(newPosts, id);
  };

  const destroyPost = async (id: number) => {
    const result = await deleteActionPost(id);
    const deletedPost = result as unknown as PostType;
    reflectedScreenDeletePost(deletedPost);
  };

  const updatePost = async (id: number, editedBody: string) => {
    if (editedBody === "") return;
    const result = await updateActionPost(id, editedBody);
    const updatedPost = result as unknown as PostType;
    reflectedScreenUpdatePost(updatedPost, editedBody);
  };

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
