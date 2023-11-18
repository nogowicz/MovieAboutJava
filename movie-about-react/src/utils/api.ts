const BLOG_DOMAIN = "http://localhost:3000/api";

interface Post {
  id: string;
  title: string;
  content: string;
}

interface Comment {
  id: string;
  text: string;
}

export const getAllPosts = async (): Promise<Post[]> => {
  const response = await fetch(`${BLOG_DOMAIN}/posts`);
  return response.ok ? await response.json() : [];
};

export const getPostById = async (id: string): Promise<Post> => {
  const response = await fetch(`${BLOG_DOMAIN}/posts/${id}`);
  if (!response.ok) {
    throw new Error("Post with id: " + id + " not found");
  }
  return await response.json();
};

export const submitNewPost = async (
  newPost: Post,
  token: string
): Promise<Post> => {
  const response = await fetch(`${BLOG_DOMAIN}/posts`, {
    method: "POST",
    body: JSON.stringify(newPost),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error(response.status.toString());
  }
  return response.json();
};

export const updatePost = async (
  updatedPost: Post,
  token: string
): Promise<Post> => {
  const response = await fetch(`${BLOG_DOMAIN}/posts`, {
    method: "PUT",
    body: JSON.stringify(updatedPost),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error(response.status.toString());
  }
  return response.json();
};

export const deletePost = async (
  postId: string,
  token: string
): Promise<boolean> => {
  const response = await fetch(`${BLOG_DOMAIN}/posts/${postId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error(response.status.toString());
  }
  return response.ok;
};

export const submitNewComment = async (
  newComment: Comment,
  token: string
): Promise<Comment> => {
  const response = await fetch(`${BLOG_DOMAIN}/comments`, {
    method: "POST",
    body: JSON.stringify(newComment),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error(response.status.toString());
  }
  return response.json();
};

export const updateComment = async (
  updatedComment: Comment,
  token: string
): Promise<Comment> => {
  const response = await fetch(`${BLOG_DOMAIN}/comments`, {
    method: "PUT",
    body: JSON.stringify(updatedComment),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error(response.status.toString());
  }
  return response.json();
};

export const deleteComment = async (
  commentId: string,
  token: string
): Promise<boolean> => {
  const response = await fetch(`${BLOG_DOMAIN}/comments/${commentId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error(response.status.toString());
  }
  return response.ok;
};

interface RegisterResponse {
  userName: string;
}

export const register = async (
  registerRequest: any
): Promise<RegisterResponse> => {
  const response = await fetch(`${BLOG_DOMAIN}/auth/signup`, {
    method: "POST",
    body: JSON.stringify(registerRequest),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.userName);
  }
  return data;
};

interface LoginResponse {
  error: string;
}

export const login = async (loginRequest: any): Promise<LoginResponse> => {
  const response = await fetch(`${BLOG_DOMAIN}/auth/login`, {
    method: "POST",
    body: JSON.stringify(loginRequest),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(response.json());
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error);
  }
  return data;
};
