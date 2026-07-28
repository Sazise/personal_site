import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "./Navbar.jsx";

describe("Navbar", () => {
  beforeEach(() => {
    window.scrollY = 0;
  });

  afterEach(() => {
    cleanup();
  });

  it("renders the logo text", () => {
    render(<Navbar />);
    expect(screen.getByText("Sazise.")).toBeInTheDocument();
  });

  it("renders all navigation links with the correct hrefs", () => {
    render(<Navbar />);
    const expectedLinks = [
      { text: "Home", href: "#home" },
      { text: "About", href: "#about" },
      { text: "Skills", href: "#skills" },
      { text: "Projects", href: "#projects" },
      { text: "Contact", href: "#contact" },
    ];

    expectedLinks.forEach(({ text, href }) => {
      const link = screen.getByRole("link", { name: text });
      expect(link).toHaveAttribute("href", href);
    });
  });

  it('does not render a wrapping "navbar-inner" div (currently commented out)', () => {
    const { container } = render(<Navbar />);
    expect(container.querySelector(".navbar-inner")).not.toBeInTheDocument();
  });

  it("still renders the logo, nav links and hamburger button as direct nav content", () => {
    const { container } = render(<Navbar />);
    const nav = container.querySelector("nav");
    expect(nav.querySelector(".logo")).toBeInTheDocument();
    expect(nav.querySelector("#primary-navigation")).toBeInTheDocument();
    expect(nav.querySelector(".hamburger")).toBeInTheDocument();
  });

  it('does not have the "scrolled" class before any scrolling', () => {
    const { container } = render(<Navbar />);
    const nav = container.querySelector("nav");
    expect(nav).toHaveClass("navbar");
    expect(nav).not.toHaveClass("scrolled");
  });

  it('adds the "scrolled" class once scrolled beyond 30px', () => {
    const { container } = render(<Navbar />);
    const nav = container.querySelector("nav");

    window.scrollY = 50;
    fireEvent.scroll(window);

    expect(nav).toHaveClass("navbar", "scrolled");
  });

  it('does not add the "scrolled" class at exactly 30px (boundary case)', () => {
    const { container } = render(<Navbar />);
    const nav = container.querySelector("nav");

    window.scrollY = 30;
    fireEvent.scroll(window);

    expect(nav).not.toHaveClass("scrolled");
  });

  it('removes the "scrolled" class when scrolling back to the top', () => {
    const { container } = render(<Navbar />);
    const nav = container.querySelector("nav");

    window.scrollY = 50;
    fireEvent.scroll(window);
    expect(nav).toHaveClass("scrolled");

    window.scrollY = 0;
    fireEvent.scroll(window);
    expect(nav).not.toHaveClass("scrolled");
  });

  it("toggles the mobile menu open state when the hamburger button is clicked", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    const toggleButton = screen.getByRole("button");
    const navList = screen.getByRole("list");

    expect(navList).not.toHaveClass("active");
    expect(toggleButton).not.toHaveClass("active");
    expect(toggleButton).toHaveAttribute("aria-expanded", "false");
    expect(toggleButton).toHaveAttribute("aria-label", "Open navigation menu");

    await user.click(toggleButton);

    expect(navList).toHaveClass("active");
    expect(toggleButton).toHaveClass("active");
    expect(toggleButton).toHaveAttribute("aria-expanded", "true");
    expect(toggleButton).toHaveAttribute("aria-label", "Close navigation menu");

    await user.click(toggleButton);

    expect(navList).not.toHaveClass("active");
    expect(toggleButton).toHaveAttribute("aria-expanded", "false");
  });

  it("closes the mobile menu when a nav link is clicked", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    await user.click(screen.getByRole("button"));
    const navList = screen.getByRole("list");
    expect(navList).toHaveClass("active");

    await user.click(screen.getByRole("link", { name: "About" }));

    expect(navList).not.toHaveClass("active");
  });

  it("renders the hamburger button with three visual bar spans", () => {
    render(<Navbar />);
    const button = screen.getByRole("button");
    expect(button.querySelectorAll('span[aria-hidden="true"]')).toHaveLength(3);
  });

  it("removes the scroll listener on unmount", () => {
    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");
    const { unmount } = render(<Navbar />);

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith("scroll", expect.any(Function));
    removeEventListenerSpy.mockRestore();
  });
});