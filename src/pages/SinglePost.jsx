import { NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  fetchAuthor,
  fetchComments,
  fetchSinglePost,
  getSinglePost,
} from "../services/api";
import {
  FaHeart,
  FaRegHeart,
  FaSmile,
  FaUserCircle,
  FaArrowLeft,
  FaCheckCircle,
} from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import {
  addPostInFavourites,
  deletePostInFavourites,
  isPostFavourite,
} from "../utils/postStorageHelper";
import CustomSpinner from "../components/CustomSpinner";
import { toast } from "react-toastify";

function MyForm() {
  <Form>
    <Form.Group className="mb-3" controlId="formBasicName">
      <Form.Label>Name</Form.Label>
      <Form.Control type="text" placeholder="Enter name" />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email" />
    </Form.Group>

    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
      <Form.Label>Comment</Form.Label>
      <Form.Control as="textarea" rows={3} />
    </Form.Group>

    <Button variant="primary" type="submit">
      Submit
    </Button>
  </Form>;
}

function FilledHeart(props) {
  const { post, setIsFavourite } = props;

  const handleClick = () => {
    deletePostInFavourites(post.id);
    setIsFavourite(false);
    toast.error("Removed from favourites!", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <Button className="ms-auto" variant="transparent" onClick={handleClick}>
      <FaHeart color="red" className="favourite-icon" />
    </Button>
  );
}

function EmptyHeart(props) {
  const { post, setIsFavourite } = props;

  const handleClick = () => {
    addPostInFavourites(post);
    setIsFavourite(true);
    toast.success("Added to favourites!", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <Button className="ms-auto" variant="transparent" onClick={handleClick}>
      <FaRegHeart className="favourite-icon" />
    </Button>
  );
}

function Comment(props) {
  const { name, email, body } = props;

  return (
    <div className="comment">
      <div className="comment-header">
        <FaUserCircle size="2.5rem" />
        <p>{email}</p>
      </div>
      <p>{body}</p>
    </div>
  );
}

function CommentBox(props) {
  const { comments } = props;

  return (
    <>
      <h3 id="comment-heading" className="text-center mt-5">
        Comments
      </h3>
      <div className="comments-section">
        {comments.map((item) => {
          return (
            <Comment
              name={item.name}
              email={item.email}
              body={item.body}
              key={item.id}
            />
          );
        })}
      </div>
    </>
  );
}

function AuthorBox(props) {
  const { author } = props;

  return (
    <div className="author-box my-5">
      <FaSmile size="5rem" className="author-profile" />
      <div>
        <p>
          by {author?.name}, @{author?.username}
        </p>
        <hr className="author-hr" />
        <p>{author?.company?.catchPhrase.repeat(3)}</p>
      </div>
    </div>
  );
}

export default function SinglePost(props) {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [isFavourite, setIsFavourite] = useState(false);
  const { isLoading, setIsLoading } = props;

  useEffect(() => {
    const getPostDetails = async (id) => {
      try {
        setIsLoading(true);
        const fetchedPost = await getSinglePost(id);
        setPost(fetchedPost);
        const postComments = await fetchComments(id);
        setIsFavourite(isPostFavourite(id));
        setComments(postComments);
        console.log("render");
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

    getPostDetails(id);
  }, [id, setIsLoading]);

  return (
    <Container>
      <Stack direction="horizontal">
        <Button as={NavLink} to="/" className="previous-btn">
          <FaArrowLeft className="icon-left" />
          Home
        </Button>
        {isFavourite ? (
          <FilledHeart post={post} setIsFavourite={setIsFavourite} />
        ) : (
          <EmptyHeart post={post} setIsFavourite={setIsFavourite} />
        )}
      </Stack>
      {isLoading ? (
        <CustomSpinner />
      ) : (
        <>
          <h2 className="mt-5 mb-3">{post?.title}</h2>
          <p>{post?.body?.repeat(3)}</p>
          <p>{post?.body?.repeat(3)}</p>
          <p>{post?.body?.repeat(3)}</p>
          <AuthorBox author={post.author} />
          <CommentBox comments={comments} />
        </>
      )}
    </Container>
  );
}
