import PostsList from "../components/PostsList";

export default function Home(props) {
  const { posts } = props;

  return (
    <div>
      <PostsList posts={posts} />
    </div>
  );
}
