import { useState, useEffect } from "react";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={scrolled ? "navbar scrolled" : "navbar"}>
      <div className="logo">
        <span>Sazise.</span>
      </div>

      <ul className={menuOpen ? "nav-links active" : "nav-links"}>
        <li>
          <a href="#home">Home</a>
        </li>
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#skills">Skills</a>
        </li>
        <li>
          <a href="#projects">Projects</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>

      <button
        type="button"
        className={menuOpen ? "hamburger active" : "hamburger"}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
      >
        {" "}
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  );
}

export default Navbar;
