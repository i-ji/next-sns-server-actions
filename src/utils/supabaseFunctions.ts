const POST_ENDPOINT = "http://localhost:3000/api/post";
const FOLLOWEDUSERPOST_ENDPOINT = "http://localhost:3000/api/followedUserPost";
const USER_ENDPOINT = "http://localhost:3000/api/user";

export const getAllAPIPosts = async () => {
  try {
    const res = await fetch(POST_ENDPOINT);

    const posts = res.json();
    return posts;
  } catch (error) {
    console.error(error);
  }
};

export const updateAPIPost = async (id: number, body: string) => {
  try {
    const res = await fetch(`${POST_ENDPOINT}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ body }),
    });
    const post = res.json();
    return post;
  } catch (error) {
    console.error(error);
  }
};

export const deleteAPIPost = async (id: number) => {
  try {
    const res = await fetch(`${POST_ENDPOINT}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    const post = res.json();
    return post;
  } catch (error) {
    console.error(error);
  }
};

export const getFollowedUserAPIPosts = async () => {
  try {
    const res = await fetch(FOLLOWEDUSERPOST_ENDPOINT);

    const posts = res.json();
    return posts;
  } catch (error) {
    console.error(error);
  }
};

export const getAPIUser = async (id: string) => {
  try {
    const res = await fetch(`${USER_ENDPOINT}/${id}`);

    const user = res.json();
    return user;
  } catch (error) {
    console.error(error);
  }
};

export const toggleFollowAPIUser = async (id: number, isFollow: boolean) => {
  try {
    const res = await fetch(`${USER_ENDPOINT}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isFollow: isFollow }),
    });

    const user = res.json();
    return user;
  } catch (error) {
    console.error(error);
  }
};
