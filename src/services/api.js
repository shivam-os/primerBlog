const url = "https://jsonplaceholder.typicode.com";

//GET 10 posts and add author field to each of them
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
  return response
};

//GET a single post according to post id
const fetchSinglePost = async (id) => {
  const response = await fetch(`${url}/posts/${id}`);
  return response.json();
};

//GET a single author according to post id
const fetchAuthor = async (id) => {
  const response = await fetch(`${url}/users?id=${id}`);
  return response.json();
};

//GET comments of a post according to post id
export const fetchComments = async (id) => {
  const response = await fetch(`${url}/comments?postId=${id}`);
  return response.json();
};

//GET a single post according to post id and add author field to it
export const getSinglePost = async (id) => {
  const post = await fetchSinglePost(id);
  const [author] = await fetchAuthor(post.userId);
  post.author = author;
  return post;
}


