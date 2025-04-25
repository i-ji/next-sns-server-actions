const POST_ENDPOINT = "/api/post";
const FOLLOWEDUSERPOST_ENDPOINT = "/api/followedUserPost";
const USER_ENDPOINT = "/api/user";

export const getAllAPIPosts = async (offset: number, limit: string = "10") => {
  try {
    const res = await fetch(
      `${POST_ENDPOINT}/?offset=${offset}&limit=${limit}`
    );

    const posts = res.json();
    return posts;
  } catch (error) {
    console.error(error);
    return [];
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
    return [];
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
    return [];
  }
};

export const getFollowedUserAPIPosts = async (
  offset: number,
  limit: string = "10"
) => {
  try {
    const queryParams = new URLSearchParams({
      offset: offset.toString(),
      limit: limit.toString(),
    });

    const res = await fetch(
      `${FOLLOWEDUSERPOST_ENDPOINT}/?${queryParams.toString()}`
    );

    const posts = res.json();
    return posts;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getAPIUser = async (id: string) => {
  try {
    const res = await fetch(`${USER_ENDPOINT}/${id}`);

    const user = res.json();
    return user;
  } catch (error) {
    console.error(error);
    return [];
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
    return [];
  }
};
