import PostCard from "./PostCard";

export default function PostsList(props) {
  const { posts } = props;

  return (
    <div>
      {posts.length ? (
        <>
          {posts.map((item) => {
            return (
              <PostCard
                id={item.id}
                title={item.title}
                body={item.body}
                author={item?.author}
                key={item.id}
              />
            );
          })}
        </>
      ) : (
        <p>No posts found!</p>
      )}
    </div>
  );
}
