import { useEffect, useState } from "react";
import { getFavourites } from "../utils/postStorageHelper";
import PostsList from "../components/PostsList";

export default function Favourites() {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const getFavouritePosts = () => {
      const posts = getFavourites();
      setFavourites(posts);
    };
    getFavouritePosts();
  }, []);

  return (
    <div>
      <PostsList posts={favourites} />
    </div>
  );
}
