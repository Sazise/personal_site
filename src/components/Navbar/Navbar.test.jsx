import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navbar from './Navbar.jsx';

afterEach(() => {
  cleanup();
  window.scrollY = 0;
});

describe('Navbar', () => {
  it('renders the logo text', () => {
    render(<Navbar />);
    expect(screen.getByText('Sazise.')).toBeInTheDocument();
  });

  it('renders all navigation links with the correct hrefs', () => {
    render(<Navbar />);

    const expectedLinks = [
      ['Home', '#home'],
      ['About', '#about'],
      ['Skills', '#skills'],
      ['Projects', '#projects'],
      ['Contact', '#contact'],
    ];

    expectedLinks.forEach(([text, href]) => {
      const link = screen.getByRole('link', { name: text });
      expect(link).toHaveAttribute('href', href);
    });
  });

  it('does not render a wrapping .navbar-inner element (markup is commented out)', () => {
    const { container } = render(<Navbar />);
    expect(container.querySelector('.navbar-inner')).not.toBeInTheDocument();
  });

  it('still renders the logo, nav list and hamburger inside the nav element', () => {
    const { container } = render(<Navbar />);
    const nav = container.querySelector('nav');
    expect(nav.querySelector('.logo')).toBeInTheDocument();
    expect(nav.querySelector('#primary-navigation')).toBeInTheDocument();
    expect(nav.querySelector('button.hamburger')).toBeInTheDocument();
  });

  it('applies the base "navbar" class when the page has not been scrolled', () => {
    const { container } = render(<Navbar />);
    const nav = container.querySelector('nav');
    expect(nav).toHaveClass('navbar');
    expect(nav).not.toHaveClass('scrolled');
  });

  it('adds the "scrolled" class once the window scrolls past 30px', () => {
    const { container } = render(<Navbar />);
    const nav = container.querySelector('nav');

    window.scrollY = 50;
    fireEvent.scroll(window);

    expect(nav).toHaveClass('navbar scrolled');
  });

  it('removes the "scrolled" class again once scrolled back to the top', () => {
    const { container } = render(<Navbar />);
    const nav = container.querySelector('nav');

    window.scrollY = 50;
    fireEvent.scroll(window);
    expect(nav).toHaveClass('scrolled');

    window.scrollY = 0;
    fireEvent.scroll(window);
    expect(nav).not.toHaveClass('scrolled');
  });

  it('does not mark the navbar as scrolled at exactly the 30px threshold', () => {
    const { container } = render(<Navbar />);
    const nav = container.querySelector('nav');

    window.scrollY = 30;
    fireEvent.scroll(window);

    expect(nav).not.toHaveClass('scrolled');
  });

  it('toggles the hamburger menu open and closed when clicked', async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    const button = screen.getByRole('button', { name: 'Open navigation menu' });
    const navList = document.getElementById('primary-navigation');

    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(navList).not.toHaveClass('active');

    await user.click(button);

    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(button).toHaveAccessibleName('Close navigation menu');
    expect(navList).toHaveClass('nav-links active');
    expect(button).toHaveClass('hamburger active');

    await user.click(button);

    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAccessibleName('Open navigation menu');
    expect(navList).not.toHaveClass('active');
    expect(button).not.toHaveClass('active');
  });

  it('closes the menu when a navigation link is clicked', async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    const button = screen.getByRole('button', { name: 'Open navigation menu' });
    await user.click(button);
    expect(document.getElementById('primary-navigation')).toHaveClass('active');

    await user.click(screen.getByRole('link', { name: 'About' }));

    expect(document.getElementById('primary-navigation')).not.toHaveClass('active');
    expect(screen.getByRole('button', { name: 'Open navigation menu' })).toBeInTheDocument();
  });

  it('cleans up the scroll listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = render(<Navbar />);

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    removeEventListenerSpy.mockRestore();
  });

  it('has an accessible hamburger button with aria-controls pointing to the nav list', () => {
    render(<Navbar />);
    const button = screen.getByRole('button', { name: 'Open navigation menu' });
    expect(button).toHaveAttribute('aria-controls', 'primary-navigation');
  });
});