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
  const [isEdit, setIsEdit] = useState(false);

  const btnAction = async (formData: FormData, id: number) => {
    const btn = formData.get("btn");

    if (btn === "update") {
      const body = String(formData.get("editedBody"));
      updatePost(id, body);
      setIsEdit(false);
    } else if (btn === "delete") {
      destroyPost(id);
    }
  };

  const deleteAndEdit = (
    <div className=" w-[50px] flex items-center justify-between">
      {isEdit ? (
        <button className="cursor-pointer" name="btn" value="update">
          <CiSaveDown2 />
        </button>
      ) : (
        <FiEdit onClick={() => setIsEdit(true)} className="cursor-pointer" />
      )}

      <button className="cursor-pointer" name="btn" value="delete">
        <MdDeleteOutline />
      </button>
    </div>
  );

  return (
    <Card key={post.id} className="mx-1 sm:mx-0">
      <form
        action={async (formData: FormData) => {
          await btnAction(formData, post.id);
        }}
      >
        <CardHeader>
          <CardTitle className="font-bold text-2xl flex justify-between">
            <Link
              href={`/user/${post.user_id}`}
              scroll={false}
              className="hover:underline"
            >
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
            <Input name="editedBody" defaultValue={post.body} />
          ) : (
            <p>{post.body}</p>
          )}
        </CardContent>
      </form>
    </Card>
  );
};

export default PostItem;
