export interface PostType {
  id: number;
  user_id: number;
  body: string;
  users: {
    name: string;
    isFollow: boolean;
  };
}

export interface UserType {
  id: number;
  name: string;
  isFollow: boolean;
  posts: [{ id: number; body: string; user_id: number }];
}
