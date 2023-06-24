import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { fetchAuthor, fetchComments, fetchSinglePost } from "../services/api";
import { FaUserCircle } from "react-icons/fa";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {
  addPostInFavourites,
  deletePostInFavourites,
  isPostFavourite,
} from "../utils/postStorageHelper";

function FilledHeart(props) {
  const { post, setIsFavourite } = props;

  const handleClick = () => {
    deletePostInFavourites(post.id);
    setIsFavourite(false);
  };

  return (
    <Button className="ms-auto" variant="transparent" onClick={handleClick}>
      <FaHeart color="red" />
    </Button>
  );
}

function EmptyHeart(props) {
  const { post, setIsFavourite } = props;

  const handleClick = () => {
    addPostInFavourites(post);
    setIsFavourite(true);
  };

  return (
    <Button className="ms-auto" variant="transparent" onClick={handleClick}>
      <FaRegHeart />
    </Button>
  );
}

function Comment(props) {
  const { name, email, body } = props;

  return (
    <div>
      <Stack direction="horizontal">
        <FaUserCircle size="2.5rem" />
        <Stack gap={0}>
          <p>{name}</p>
          <p>{email}</p>
        </Stack>
      </Stack>
      <p>{body}</p>
    </div>
  );
}

export default function SinglePost() {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [comments, setComments] = useState([]);
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    const getPostDetails = async (id) => {
      try {
        const post = await fetchSinglePost(id);
        const postAuthor = await fetchAuthor(post.userId);
        const postComments = await fetchComments(id);
        setPost(post);
        console.log(isPostFavourite(id));
        setIsFavourite(isPostFavourite(id));
        setTitle(post.title);
        setBody(post.body);
        setAuthor(postAuthor);
        setComments(postComments);
      } catch (err) {
        console.log(err);
      }
    };

    getPostDetails(id);
  }, []);

  const handleCommentSubmit = (e) => {
    
  }

  return (
    <Container>
      <Stack direction="horizontal">
        <Button>Home</Button>
        {isFavourite ? (
          <FilledHeart post={post} setIsFavourite={setIsFavourite} />
        ) : (
          <EmptyHeart post={post} setIsFavourite={setIsFavourite} />
        )}
      </Stack>
      <h2>{title}</h2>
      <p>{body}</p>
      <div>
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
        </Form>
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
    </Container>
  );
}
