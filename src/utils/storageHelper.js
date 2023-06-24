const FAVOURITES = "favourites";

//Set the favourites array in localStorage
const setFavourites = (arr) => {
  const arrJson = JSON.stringify(arr);
  localStorage.setItem(FAVOURITES, arrJson);
};

//Get the favourites array from localStorage
export const getFavourites = () => {
  const posts = localStorage.getItem(FAVOURITES);
  return posts ? JSON.parse(posts) : [];
};

//Add a post in favourites array
export const addPostInFavourites = (post) => {
  const favourites = getFavourites();
  const updatedFavourites = [post, ...favourites];
  setFavourites(updatedFavourites);
};

//Remove a post from favourites array
export const deletePostInFavourites = (id) => {
  const favourites = getFavourites();
  const updatedFavourites = favourites.filter((item) => item.id !== id);
  setFavourites(updatedFavourites)
};
