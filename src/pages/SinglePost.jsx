import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import { fetchAuthor, fetchComments, fetchSinglePost } from "../services/api";
import { FaUserCircle } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

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
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getPostDetails = async (id) => {
      try {
        const post = await fetchSinglePost(id);
        const postAuthor = await fetchAuthor(post.userId);
        const postComments = await fetchComments(id);
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

  return (
    <Container>
      <Stack direction="horizontal">
        <Button>Home</Button>
        <Button className="ms-auto">
          <FaHeart />
        </Button>
      </Stack>
      <h2>{title}</h2>
      <p>{body}</p>
      <div>
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
