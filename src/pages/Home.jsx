import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";

function PostCard(props) {
  const { title, userId, body, id } = props;

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

export default function Home(props) {
  const { posts } = props;

  return (
    <div>
      {posts.map((item) => {
        return (
          <PostCard
            id={item.id}
            title={item.title}
            userId={item.userId}
            body={item.body}
            key={item.id}
          />
        );
      })}
    </div>
  );
}
