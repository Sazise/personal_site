import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

vi.mock('./components/Navbar/Navbar.jsx', () => ({
  default: () => <nav data-testid="mock-navbar">Navbar</nav>,
}));

vi.mock('./pages/Home.jsx', () => ({
  default: () => <div data-testid="mock-home">Home</div>,
}));

describe('App', () => {
  it('renders the Navbar component', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('mock-navbar')).toBeInTheDocument();
  });

  it('renders the Home component', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('mock-home')).toBeInTheDocument();
  });

  it('renders the about section with the correct id and inline styles', () => {
    const { container } = render(<App />);
    const about = container.querySelector('#about');
    expect(about).toBeInTheDocument();
    expect(about.tagName).toBe('SECTION');
    expect(about.style.height).toBe('100vh');
    expect(about).toBeEmptyDOMElement();
  });

  it('renders the skills section with the correct id and inline styles', () => {
    const { container } = render(<App />);
    const skills = container.querySelector('#skills');
    expect(skills).toBeInTheDocument();
    expect(skills.tagName).toBe('SECTION');
    expect(skills.style.height).toBe('100vh');
    expect(skills).toBeEmptyDOMElement();
  });

  it('renders the projects section with the correct id and inline styles', () => {
    const { container } = render(<App />);
    const projects = container.querySelector('#projects');
    expect(projects).toBeInTheDocument();
    expect(projects.tagName).toBe('SECTION');
    expect(projects.style.height).toBe('100vh');
    expect(projects).toBeEmptyDOMElement();
  });

  it('renders the contact section with the correct id and inline styles', () => {
    const { container } = render(<App />);
    const contact = container.querySelector('#contact');
    expect(contact).toBeInTheDocument();
    expect(contact.tagName).toBe('SECTION');
    expect(contact.style.height).toBe('100vh');
    expect(contact).toBeEmptyDOMElement();
  });

  it('does not render a "home" section (the static home markup was replaced by the Home component)', () => {
    const { container } = render(<App />);
    expect(container.querySelector('#home')).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Home' })).not.toBeInTheDocument();
  });

  it('renders the Navbar, Home, and static sections in the expected order', () => {
    const { container } = render(<App />);
    const ids = Array.from(container.children).map((el) =>
      el.dataset?.testid || el.id || el.tagName
    );
    expect(ids).toEqual(['mock-navbar', 'mock-home', 'about', 'skills', 'projects', 'contact']);
  });

  it('renders exactly four static placeholder sections', () => {
    const { container } = render(<App />);
    const sections = container.querySelectorAll('section');
    expect(sections).toHaveLength(4);
  });
});