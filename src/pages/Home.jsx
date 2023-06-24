import { useState, useEffect } from "react";
import { fetchPosts } from "../services/api";
import PostsList from "../components/PostsList";
import Button from "react-bootstrap/Button";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetchPosts(currentPage);
        setPosts(response);
      } catch (err) {
        console.log(err);
      }
    };

    getPosts();
  }, [currentPage, setPosts]);

  return (
    <div>
      <PostsList posts={posts} />
      {currentPage !== 1 ? (
        <Button onClick={() => setCurrentPage(currentPage - 1)}>
          Previous
        </Button>
      ) : (
        ""
      )}
      {currentPage === 10 ? (
        ""
      ) : (
        <Button onClick={() => setCurrentPage(currentPage + 1)}>Next</Button>
      )}
    </div>
  );
}
