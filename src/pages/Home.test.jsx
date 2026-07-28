import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from './Home';

describe('Home', () => {
  it('renders a section with the "hero" class', () => {
    const { container } = render(<Home />);
    const hero = container.querySelector('section.hero');
    expect(hero).toBeInTheDocument();
  });

  it('renders three animated gradient divs with unique modifier classes', () => {
    const { container } = render(<Home />);
    expect(container.querySelector('.gradient.one')).toBeInTheDocument();
    expect(container.querySelector('.gradient.two')).toBeInTheDocument();
    expect(container.querySelector('.gradient.three')).toBeInTheDocument();
    expect(container.querySelectorAll('.gradient')).toHaveLength(3);
  });

  it('renders the greeting text', () => {
    render(<Home />);
    expect(screen.getByText("Hello, I'm")).toBeInTheDocument();
  });

  it('renders the name as a top-level heading', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { level: 1, name: 'Sazise Nkomba' })).toBeInTheDocument();
  });

  it('renders the role/title as a secondary heading', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { level: 2, name: 'Software Developer' })).toBeInTheDocument();
  });

  it('renders the descriptive summary paragraph', () => {
    render(<Home />);
    expect(
      screen.getByText(/I build modern web applications, mobile apps and AI-powered\s*experiences\./)
    ).toBeInTheDocument();
  });

  it('renders "Projects" and "Contact" buttons inside a buttons container', () => {
    const { container } = render(<Home />);
    const buttonsContainer = container.querySelector('.buttons');
    expect(buttonsContainer).toBeInTheDocument();

    const projectsButton = screen.getByRole('button', { name: 'Projects' });
    const contactButton = screen.getByRole('button', { name: 'Contact' });

    expect(projectsButton).toBeInTheDocument();
    expect(contactButton).toBeInTheDocument();
    expect(buttonsContainer).toContainElement(projectsButton);
    expect(buttonsContainer).toContainElement(contactButton);
  });

  it('nests all textual content within a "hero-content" wrapper', () => {
    const { container } = render(<Home />);
    const heroContent = container.querySelector('.hero-content');
    expect(heroContent).toBeInTheDocument();
    expect(heroContent).toContainElement(screen.getByRole('heading', { level: 1 }));
    expect(heroContent).toContainElement(screen.getByRole('button', { name: 'Projects' }));
  });

  it('renders exactly two buttons', () => {
    render(<Home />);
    expect(screen.getAllByRole('button')).toHaveLength(2);
  });
});