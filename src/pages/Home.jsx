import { useState, useEffect } from "react";
import { fetchPosts } from "../services/api";
import PostsList from "../components/PostsList";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import CustomSpinner from "../components/CustomSpinner";
import { toast } from "react-toastify";

export default function Home(props) {
  const { posts, setPosts, setIsLoading, isLoading } = props;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getPosts = async () => {
      try {
        setIsLoading(true);
        const response = await fetchPosts(currentPage);
        setPosts(response);
      } catch (err) {
        console.log(err);
        toast.error("Something went wrong!", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } finally {
        setIsLoading(false);
      }
    };

    getPosts();
  }, [currentPage, setPosts, setIsLoading]);

  return (
    <div>
      {isLoading ? <CustomSpinner /> : <PostsList posts={posts} />}

      <Stack direction="horizontal" className="my-5">
        {currentPage !== 1 ? (
          <Button
            className="previous-btn"
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <FaArrowLeft className="icon-left" />
            Previous
          </Button>
        ) : (
          ""
        )}
        {currentPage === 10 ? (
          ""
        ) : (
          <Button
            id="next-btn"
            className="ms-auto"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next <FaArrowRight />
          </Button>
        )}
      </Stack>
    </div>
  );
}
