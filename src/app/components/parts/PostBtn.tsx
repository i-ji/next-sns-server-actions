import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FaPen } from "react-icons/fa";
import { PostType } from "@/utils/interface";
import { addActionPost } from "@/utils/actions";

interface PostBtnType {
  reflectedScreenPost: (post: PostType) => void;
}

const PostBtn = ({ reflectedScreenPost }: PostBtnType) => {
  const [open, setOpen] = useState(false);

  const sendBody = async (formData: FormData) => {
    const body = String(formData.get("body"));
    if (body === "") return;

    const result = await addActionPost(body);
    const newPost = result as unknown as PostType;
    reflectedScreenPost(newPost);

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <FaPen className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form
          action={async (formData: FormData) => {
            await sendBody(formData);
          }}
        >
          <Textarea placeholder="What's happening?" name="body" />

          <div className="text-right">
            <Button className="mt-3">Post</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PostBtn;
