import React from 'react';
import '../styles/animations.css';
import Navbar from "../components/Navbar/Navbar.jsx";

import Hero from "../sections/Hero.jsx";
import About from "../sections/About.jsx";
import Skills from "../sections/Skills.jsx";
import ContactPreview from "../sections/ContactPreview.jsx";
import FeaturedProjects from "../sections/FeaturedProjects.jsx";

function Home(){

    return(
        <>
            <Hero />
            <About />
            <Skills />
            <FeaturedProjects />
            <ContactPreview />
        </>
    )
}


export default Home;
