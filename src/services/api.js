const url = "https://jsonplaceholder.typicode.com";

export const fetchPosts = async (page) => {
  const response = await fetch(`${url}/posts?_page=${page}`);
  return response.json();
};

export const fetchSinglePost = async (id) => {
  const response = await fetch(`${url}/posts/${id}`);
  return response.json();
};

export const fetchAuthor = async (id) => {
  const response = await fetch(`${url}/users?id=${id}`);
  return response.json();
};

export const fetchComments = async (id) => {
  const response = await fetch(`${url}/comments?postId=${id}`);
  return response.json();
};
