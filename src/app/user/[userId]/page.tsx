import { notFound } from "next/navigation";
import { getAPIUser } from "@/utils/supabaseFunctions";
import { UserType } from "@/utils/interface";
import { toPostType } from "@/utils/functions";
import Display from "@/app/components/layout/DisplayUserPage";

interface UserPageType {
  params: Promise<{ userId: string }>;
}

export default async function Page({ params }: UserPageType) {
  const [user]: UserType[] = await getAPIUser((await params).userId);
  if (!user) {
    notFound();
  }

  const posts = toPostType(user.posts, user.name, user.isFollow);

  return <Display user={user} posts={posts.sort((a, b) => b.id - a.id)} />;
}
