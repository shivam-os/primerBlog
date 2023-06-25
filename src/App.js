import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Favourites from "./pages/Favourites";
import SinglePost from "./pages/SinglePost";

function App() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Container className="app">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              setIsLoading={setIsLoading}
              isLoading={isLoading}
            />
          }
        />
        <Route
          path="/posts/:id"
          element={
            <SinglePost setIsLoading={setIsLoading} isLoading={isLoading} />
          }
        />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </Container>
  );
}

export default App;
