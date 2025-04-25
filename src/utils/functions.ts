import { PostType } from "./interface";

export const toPostType = (
  _posts: {
    id: number;
    body: string;
    user_id: number;
  }[],
  name: string,
  isFollow: boolean
) => {
  const posts = [] as PostType[];

  _posts.forEach((post) => {
    posts.push({
      id: post.id,
      user_id: post.user_id,
      body: post.body,
      users: { name: name, isFollow: isFollow },
    });
  });

  return posts;
};

export const deleteScreenPost = (posts: PostType[], id: number) => {
  const newPosts = posts.filter((post) => {
    return post.id !== id;
  });
  return newPosts;
};

export const updateScreenPost = (
  posts: PostType[],
  id: number,
  editedBody: string
) => {
  const newPosts = posts.map((post) => {
    if (post.id === id) {
      post.body = editedBody;
    }
    return post;
  });
  return newPosts;
};

export const useDetermineIsFouUser = <T>(
  isForUser: boolean,
  value1: T,
  value2: T
) => {
  const result = isForUser ? value1 : value2;
  return result;
};
