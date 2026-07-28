import React from 'react';
import '../styles/animations.css';
import Navbar from "../components/Navbar/Navbar.jsx";

import Hero from "../sections/Hero.jsx";
import About from "../sections/About.jsx";
import Skills from "../sections/Skills.jsx";
import Contact from "../sections/Contact.jsx";
import Footer from "../sections/Footer.jsx";

function Home(){

    return(
        <>
            <Navbar/>

            <main>
                <Hero/>
                <About/>
                <Skills/>
                <Contact/>
            </main>

            <Footer/>
        </>
    )
}


export default Home;
