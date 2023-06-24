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
            author={item.author.name}
            key={item.id}
          />
        );
      })}
    </div>
  );
}
