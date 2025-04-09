import PostItem from "./PostItem";
import { PostType } from "@/utils/interface";
import { toggleFollowAPIUser } from "@/utils/supabaseFunctions";
import { deleteAPIPost, updateAPIPost } from "@/utils/supabaseFunctions";

interface PostListType {
  posts: PostType[];
  changeScreenPosts: (posts: PostType[], user_id: number) => void;
  reflectedScreenDeletePost: (post: PostType) => void;
  reflectedScreenUpdatePost: (post: PostType, editedBody: string) => void;
}

const PostList = ({
  posts,
  changeScreenPosts,
  reflectedScreenDeletePost,
  reflectedScreenUpdatePost,
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
    const [deletedPost]: PostType[] = await deleteAPIPost(id);

    reflectedScreenDeletePost(deletedPost);
  };

  const updatePost = async (id: number, editedBody: string) => {
    const [updatedPost]: PostType[] = await updateAPIPost(id, editedBody);

    reflectedScreenUpdatePost(updatedPost, editedBody);
  };

  return (
    <>
      <div className="mt-[125px] sm:mt-[150px] space-y-3 pb-10">
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

      <h1 className="text-center text-2xl sm:text-3xl font-bold mt-[90px]">
        {posts.length === 0 ? "No posts yet" : ""}
      </h1>
    </>
  );
};

export default PostList;
