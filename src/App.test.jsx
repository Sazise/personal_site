import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import App from './App.jsx';

afterEach(cleanup);

describe('App', () => {
  it('renders the Navbar', () => {
    render(<App />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText('Sazise.')).toBeInTheDocument();
  });

  it('renders the Home page content instead of the old inline #home section', () => {
    const { container } = render(<App />);

    // The Home component renders a .hero section rather than a plain #home section.
    expect(container.querySelector('section.hero')).toBeInTheDocument();
    expect(container.querySelector('#home')).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: 'Sazise Nkomba' })).toBeInTheDocument();
  });

  it('renders the remaining placeholder sections with their ids and inline styles', () => {
    const { container } = render(<App />);

    const sections = [
      ['about', '#181818'],
      ['skills', '#222'],
      ['projects', '#181818'],
      ['contact', '#111'],
    ];

    sections.forEach(([id, background]) => {
      const section = container.querySelector(`#${id}`);
      expect(section).toBeInTheDocument();
      expect(section).toHaveStyle({ height: '100vh', background });
      expect(section).toBeEmptyDOMElement();
    });
  });

  it('renders sections in the expected order: navbar, home, about, skills, projects, contact', () => {
    const { container } = render(<App />);

    const orderedIdentifiers = Array.from(container.children).map((el) => {
      if (el.tagName.toLowerCase() === 'nav') return 'nav';
      if (el.classList.contains('hero')) return 'home';
      return el.id;
    });

    expect(orderedIdentifiers).toEqual(['nav', 'home', 'about', 'skills', 'projects', 'contact']);
  });
});