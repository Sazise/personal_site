import React from "react";
import Navbar from "./components/Navbar/Navbar.jsx";

const App = () => {
  return (
    <>
      <Navbar />

      <section
        id="home"
        style={{
          height: "100vh",
          background: "#111",
          color: "white",
          display: "grid",
          placeItems: "center",
        }}
      >
        <h1>Home</h1>
      </section>

      <section id="about" style={{height: "100vh", background: "#181818"}}>

      </section>

      <section id="skills" style={{height: "100vh", background: "#222"}}>
        
      </section>

      <section id="projects" style={{height: "100vh", background: "#181818"}}>
        
      </section>

      <section id="contact" style={{height: "100vh", background: "#111"}}>
        
      </section>
    </>
  );
};

export default App;
