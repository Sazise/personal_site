import React from 'react';
import '../styles/animations.css';

const Hero = () => {
  return (
    <section className="hero">
    <div className="gradient one"></div>
    <div className="gradient two"></div>
    <div className="gradient three"></div>

    <div className="hero-content">
        <p>Hello, I'm</p>

        <h1>Sazise Nkomba</h1>

        <h2>Software Developer</h2>

        <p>
            I build modern web applications, mobile apps and AI-powered
            experiences.
        </p>

        <div className="buttons">
            <button>Projects</button>
            <button>Contact</button>
        </div>
    </div>
</section>
  )
}

export default Hero