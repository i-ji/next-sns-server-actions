import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PostType } from "@/utils/interface";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { CiSaveDown2 } from "react-icons/ci";
import FollowBtn from "../parts/FollowBtn";

interface PostItemType {
  post: PostType;
  toggleScreenFollowBtn: (id: number, bool: boolean) => void;
  destroyPost: (id: number) => void;
  updatePost: (id: number, editedBody: string) => void;
}

const PostItem = ({
  post,
  toggleScreenFollowBtn,
  destroyPost,
  updatePost,
}: PostItemType) => {
  const deletePost = (id: number) => {
    destroyPost(id);
  };

  const [isEdit, setIsEdit] = useState(false);
  const [editedBody, setEditedBody] = useState(post.body);

  const editPost = async (id: number) => {
    if (editedBody === "") return;

    updatePost(id, editedBody);
    setIsEdit(false);
  };

  // const editPost = async (formData: FormData) => {
  //   const btn = formData.get("deleteAndEdit");
  // };

  const deleteAndEdit = (
    <div className=" w-[50px] flex items-center justify-between">
      {isEdit ? (
        <CiSaveDown2
          onClick={() => editPost(post.id)}
          className="cursor-pointer"
        />
      ) : (
        <FiEdit onClick={() => setIsEdit(true)} className="cursor-pointer" />
      )}
      <MdDeleteOutline
        onClick={() => deletePost(post.id)}
        className="cursor-pointer"
      />
    </div>
  );

  return (
    <Card key={post.id} className="mx-1 sm:mx-0">
      <CardHeader>
        <CardTitle className="font-bold text-2xl flex justify-between">
          <Link href={`/user/${post.user_id}`} className=" hover:underline">
            {post.users.name}
          </Link>

          {post.user_id === 11 ? (
            deleteAndEdit
          ) : (
            <FollowBtn
              isFollow={post.users.isFollow}
              user_id={post.user_id}
              toggleScreenFollowBtn={toggleScreenFollowBtn}
            />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isEdit ? (
          <Input
            onChange={(e) => setEditedBody(e.target.value)}
            value={editedBody}
          />
        ) : (
          <p>{post.body}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default PostItem;
