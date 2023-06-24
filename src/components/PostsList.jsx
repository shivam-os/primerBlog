import PostCard from "./PostCard";

export default function PostsList(props) {
  const { posts } = props;

  return (
    <div>
      {posts.map((item) => {
        return (
          <PostCard
            id={item.id}
            title={item.title}
            body={item.body}
            key={item.id}
          />
        );
      })}
    </div>
  );
}
