import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import Home from './Home.jsx';

afterEach(cleanup);

describe('Home', () => {
  it('renders a section with the "hero" class', () => {
    const { container } = render(<Home />);
    const section = container.querySelector('section.hero');
    expect(section).toBeInTheDocument();
  });

  it('renders the three animated gradient elements with the expected classes', () => {
    const { container } = render(<Home />);
    expect(container.querySelector('.gradient.one')).toBeInTheDocument();
    expect(container.querySelector('.gradient.two')).toBeInTheDocument();
    expect(container.querySelector('.gradient.three')).toBeInTheDocument();
    expect(container.querySelectorAll('.gradient')).toHaveLength(3);
  });

  it('renders the intro greeting text', () => {
    render(<Home />);
    expect(screen.getByText("Hello, I'm")).toBeInTheDocument();
  });

  it('renders the name as a top level heading', () => {
    render(<Home />);
    const heading = screen.getByRole('heading', { level: 1, name: 'Sazise Nkomba' });
    expect(heading).toBeInTheDocument();
  });

  it('renders the role as a level 2 heading', () => {
    render(<Home />);
    const subheading = screen.getByRole('heading', { level: 2, name: 'Software Developer' });
    expect(subheading).toBeInTheDocument();
  });

  it('renders the descriptive paragraph', () => {
    render(<Home />);
    expect(
      screen.getByText(/I build modern web applications, mobile apps and AI-powered/i)
    ).toBeInTheDocument();
  });

  it('renders "Projects" and "Contact" call-to-action buttons', () => {
    render(<Home />);
    expect(screen.getByRole('button', { name: 'Projects' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Contact' })).toBeInTheDocument();
  });

  it('nests the textual content inside a .hero-content wrapper', () => {
    const { container } = render(<Home />);
    const heroContent = container.querySelector('.hero-content');
    expect(heroContent).toBeInTheDocument();
    expect(heroContent).toHaveTextContent('Sazise Nkomba');
    expect(heroContent).toHaveTextContent('Software Developer');
    expect(heroContent.querySelector('.buttons')).toBeInTheDocument();
  });

  it('renders the gradients as siblings of, not inside, the hero-content wrapper', () => {
    const { container } = render(<Home />);
    const heroContent = container.querySelector('.hero-content');
    expect(heroContent.querySelector('.gradient')).not.toBeInTheDocument();
  });
});