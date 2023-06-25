const url = "https://jsonplaceholder.typicode.com";

export const fetchPosts = async (page) => {
  const postData = await fetch(`${url}/posts?_page=${page}`)
  const response = await postData.json()
  const authorData = await fetch(`${url}/users`)
  const authors = await authorData.json()
  for (let i = 0; i < response.length; i++) {
    for (let j = 0; j < authors.length; j++) {
      if (response[i].userId === authors[j].id) {
        response[i].author = authors[j];
        break;
      }
    }
  }
  console.log(response);
  return response
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

export const getSinglePost = async (id) => {
  const post = await fetchSinglePost(id);
  const [author] = await fetchAuthor(post.userId);
  post.author = author;
  return post;
}


