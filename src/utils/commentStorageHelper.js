const COMMENTS = "comments";

//Set the comments array in localStorage
const setComments = (arr) => {
  const arrJson = JSON.stringify(arr);
  localStorage.setItem(COMMENTS, arrJson);
};

//Get the comments array from localStorage
export const getComments = () => {
  const comments = localStorage.getItem(COMMENTS);
  return comments ? JSON.parse(comments) : [];
};

//Add a comment in comments array
export const addComment = (comment) => {
  const favourites = getComments();
  const updatedFavourites = [comment, ...favourites];
  setComments(updatedFavourites);
};

//Remove a comment from comments array
export const deleteComment = (id) => {
  const comments = getComments();
  const updatedComments = comments.filter((item) => item.id !== id);
  setComments(updatedComments)
};

//Check if post is a favourite
export const isPostFavourite = (id) => {
  const favourites = getComments()
  return favourites.some((item) => item.id === Number(id))
}

