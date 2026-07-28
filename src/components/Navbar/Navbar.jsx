import { useState, useEffect } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={scrolled ? "navbar scrolled" : "navbar"}>
      {/* <div className="navbar-inner"> */}
          <div className="logo">
            <span>Sazise.</span>
          </div>
          <ul
          id="primary-navigation"
            className={menuOpen ? "nav-links active" : "nav-links"}
          >
            <li>
              <Link to="#home" onClick={closeMenu}>Home</Link>
            </li>
            <li>
              <Link to="#about" onClick={closeMenu}>About</Link>
            </li>
            <li>
              <Link to="#skills" onClick={closeMenu}>Skills</Link>
            </li>
            <li>
              <Link to="#projects" onClick={closeMenu}>Projects</Link>
            </li>
            <li>
              <Link to="#contact" onClick={closeMenu}>Contact</Link>
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
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
      {/* </div> */}
    </nav>
  );
}

export default Navbar;
