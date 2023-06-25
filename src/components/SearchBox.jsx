import Form from "react-bootstrap/Form";

export default function SearchBox(props) {
  const { setFilteredResults, posts } = props;

  //Handle the change in input value
  const handleChange = (e) => {
    if (!e.target.value) {
      setFilteredResults(posts);
    }

    //Return posts having search term in title or author of the 10 fetched posts
    const results = posts.filter(
      (item) =>
        item.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.author.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredResults(results);
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="searchBox.ControlInput1">
        <Form.Control
          size="lg"
          type="text"
          placeholder="Search by post title or author.."
          onChange={handleChange}
        />
      </Form.Group>
    </Form>
  );
}
