import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";

export default function PostCard(props) {
  const { title, body, author, id } = props;

  return (
    <Card className="mt-5 postcard">
      <Card.Body>
        <Card.Title className="postcard-title" as={NavLink} to={`/posts/${id}`}>
          {title}
        </Card.Title>
        <Card.Text className="mt-3 postcard-author">@{author?.name}</Card.Text>
        <hr className="postcard-hr"/>
        <Card.Text>{body}</Card.Text>
        <Button className="postcard-button" as={NavLink} to={`/posts/${id}`}>
          Read More
        </Button>
      </Card.Body>
    </Card>
  );
}
