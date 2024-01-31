// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getPosts = async (token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${BACKEND_URL}/posts`, requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to fetch posts");
  }

  const data = await response.json();
  return data;
};

export const createPost = async (token, postData) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(postData),
  };

  const response = await fetch(`${BACKEND_URL}/posts`, requestOptions);
  if (!response.ok) {
    throw new Error('Failed to create post');
  }

  return response.json();
};


export const getSinglePost = async (token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${BACKEND_URL}/posts/userPost`, requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to fetch posts");
  }

  const data = await response.json();
  return data;
};

export const deletePost = async (token, postId) => {
  console.log("Deleting post with ID:", postId); // Log the postId

  const requestOptions = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const url = `${BACKEND_URL}/posts/posts/${postId}`;
  console.log("Request URL:", url); // Log the request URL

  const response = await fetch(url, requestOptions);

  console.log("Response status:", response.status); // Log the response status

  if (!response.ok) {
    throw new Error(`Error in deleting post: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};