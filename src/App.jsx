import React from "react";
import Navbar from "./components/Navbar/Navbar.jsx";
import Home from "./pages/Home.jsx";

const App = () => {
  return (
    <>
      <Navbar />

      <Home />

      <section
        id="about"
        style={{ height: "100vh", background: "#181818" }}
      ></section>

      <section
        id="skills"
        style={{ height: "100vh", background: "#222" }}
      ></section>

      <section
        id="projects"
        style={{ height: "100vh", background: "#181818" }}
      ></section>

      <section
        id="contact"
        style={{ height: "100vh", background: "#111" }}
      ></section>
    </>
  );
};

export default App;
