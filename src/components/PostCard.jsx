import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";

export default function PostCard(props) {
  const { title, body, id } = props;

  return (
    <Card>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{body}</Card.Text>
        <Button variant="primary" as={NavLink} to={`/posts/${id}`}>
          Read More {id}
        </Button>
      </Card.Body>
    </Card>
  );
}
