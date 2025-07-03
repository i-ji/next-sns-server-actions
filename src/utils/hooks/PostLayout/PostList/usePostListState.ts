import { deleteActionPost, updateActionPost } from "@/utils/actions";
import { PostType } from "@/utils/interface";
import { toggleFollowAPIUser } from "@/utils/supabaseFunctions";

interface UsePostsStateProps {
  posts: PostType[];
  changeScreenPosts: (posts: PostType[], user_id: number) => void;
  reflectedScreenDeletePost: (post: PostType) => void;
  reflectedScreenUpdatePost: (post: PostType, editedBody: string) => void;
}
export const usePostsListState = ({
  posts,
  changeScreenPosts,
  reflectedScreenDeletePost,
  reflectedScreenUpdatePost,
}: UsePostsStateProps) => {
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

  return {
    toggleScreenFollowBtn,
    destroyPost,
    updatePost,
  };
};
