import React from 'react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import Navbar from './Navbar';

// jsdom exposes `scrollY` as a getter-only property, so it must be redefined
// (rather than assigned) in order to simulate scroll positions in tests.
function setScrollY(value) {
  Object.defineProperty(window, 'scrollY', {
    configurable: true,
    value,
  });
}

afterEach(() => {
  cleanup();
  setScrollY(0);
});

describe('Navbar', () => {
  describe('structure', () => {
    it('renders the nav element with the base "navbar" class', () => {
      render(<Navbar />);
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveClass('navbar');
      expect(nav).not.toHaveClass('scrolled');
    });

    it('does not wrap its contents in a "navbar-inner" div (wrapper was removed/commented out)', () => {
      render(<Navbar />);
      const nav = screen.getByRole('navigation');
      expect(nav.querySelector('.navbar-inner')).not.toBeInTheDocument();
    });

    it('renders the logo, nav links, and hamburger button as direct children of the nav element', () => {
      render(<Navbar />);
      const nav = screen.getByRole('navigation');
      const directChildClasses = Array.from(nav.children).map((el) => el.className);
      expect(directChildClasses).toEqual(
        expect.arrayContaining(['logo', 'nav-links', 'hamburger'])
      );
    });

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

    it('renders the nav-links list with the primary-navigation id', () => {
      render(<Navbar />);
      const list = document.getElementById('primary-navigation');
      expect(list).toBeInTheDocument();
      expect(list.tagName).toBe('UL');
      expect(list).toHaveClass('nav-links');
      expect(list).not.toHaveClass('active');
    });
  });

  describe('hamburger menu toggle', () => {
    it('renders the hamburger button closed by default with correct aria attributes', () => {
      render(<Navbar />);
      const button = screen.getByRole('button', { name: 'Open navigation menu' });
      expect(button).toHaveClass('hamburger');
      expect(button).not.toHaveClass('active');
      expect(button).toHaveAttribute('aria-expanded', 'false');
      expect(button).toHaveAttribute('aria-controls', 'primary-navigation');
    });

    it('opens the menu when the hamburger button is clicked', () => {
      render(<Navbar />);
      const button = screen.getByRole('button', { name: 'Open navigation menu' });

      fireEvent.click(button);

      expect(screen.getByRole('button', { name: 'Close navigation menu' })).toHaveClass('active');
      expect(button).toHaveAttribute('aria-expanded', 'true');
      expect(document.getElementById('primary-navigation')).toHaveClass('active');
    });

    it('closes the menu when the hamburger button is clicked twice', () => {
      render(<Navbar />);
      const button = screen.getByRole('button', { name: 'Open navigation menu' });

      fireEvent.click(button);
      fireEvent.click(screen.getByRole('button', { name: 'Close navigation menu' }));

      const reopenedButton = screen.getByRole('button', { name: 'Open navigation menu' });
      expect(reopenedButton).not.toHaveClass('active');
      expect(reopenedButton).toHaveAttribute('aria-expanded', 'false');
      expect(document.getElementById('primary-navigation')).not.toHaveClass('active');
    });

    it('closes the menu when a nav link is clicked', () => {
      render(<Navbar />);
      const button = screen.getByRole('button', { name: 'Open navigation menu' });
      fireEvent.click(button);

      expect(document.getElementById('primary-navigation')).toHaveClass('active');

      fireEvent.click(screen.getByRole('link', { name: 'About' }));

      expect(document.getElementById('primary-navigation')).not.toHaveClass('active');
      expect(screen.getByRole('button', { name: 'Open navigation menu' })).toHaveAttribute(
        'aria-expanded',
        'false'
      );
    });
  });

  describe('scroll behavior', () => {
    it('adds the "scrolled" class when the window is scrolled past 30px', () => {
      render(<Navbar />);
      const nav = screen.getByRole('navigation');
      expect(nav).not.toHaveClass('scrolled');

      setScrollY(50);
      fireEvent.scroll(window);

      expect(nav).toHaveClass('navbar', 'scrolled');
    });

    it('removes the "scrolled" class when scrolling back to the top', () => {
      render(<Navbar />);
      const nav = screen.getByRole('navigation');

      setScrollY(100);
      fireEvent.scroll(window);
      expect(nav).toHaveClass('scrolled');

      setScrollY(0);
      fireEvent.scroll(window);
      expect(nav).not.toHaveClass('scrolled');
    });

    it('does not add the "scrolled" class at exactly the 30px boundary', () => {
      render(<Navbar />);
      const nav = screen.getByRole('navigation');

      setScrollY(30);
      fireEvent.scroll(window);

      expect(nav).not.toHaveClass('scrolled');
    });

    it('removes the scroll event listener on unmount', () => {
      const removeSpy = vi.spyOn(window, 'removeEventListener');
      const { unmount } = render(<Navbar />);

      unmount();

      expect(removeSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
      removeSpy.mockRestore();
    });
  });
});