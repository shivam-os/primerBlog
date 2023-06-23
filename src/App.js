import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPosts } from "./services/api";
import Container from "react-bootstrap/Container";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Favourites from "./pages/Favourites";
import SinglePost from "./pages/SinglePost";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetchPosts();
        setPosts(response);
      } catch (err) {
        console.log(err);
      }
    };

    getPosts();
  }, []);

  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<Home posts={posts}/>} />
        <Route path="/posts/:id" element={<SinglePost />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </Container>
  );
}

export default App;
