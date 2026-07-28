import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import Home from "./Home.jsx";

describe("Home", () => {
  afterEach(() => {
    cleanup();
  });

  it('renders a top-level section with the "hero" class', () => {
    const { container } = render(<Home />);
    const section = container.querySelector("section.hero");
    expect(section).toBeInTheDocument();
  });

  it("renders exactly three gradient background decorations with distinct classes", () => {
    const { container } = render(<Home />);
    const gradients = container.querySelectorAll(".gradient");
    expect(gradients).toHaveLength(3);
    expect(container.querySelector(".gradient.one")).toBeInTheDocument();
    expect(container.querySelector(".gradient.two")).toBeInTheDocument();
    expect(container.querySelector(".gradient.three")).toBeInTheDocument();
  });

  it("renders the intro greeting text", () => {
    render(<Home />);
    expect(screen.getByText("Hello, I'm")).toBeInTheDocument();
  });

  it("renders the name as a level-1 heading", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Sazise Nkomba" })
    ).toBeInTheDocument();
  });

  it("renders the role as a level-2 heading", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { level: 2, name: "Software Developer" })
    ).toBeInTheDocument();
  });

  it("renders the descriptive paragraph", () => {
    render(<Home />);
    expect(
      screen.getByText(/I build modern web applications, mobile apps and AI-powered/i)
    ).toBeInTheDocument();
  });

  it('renders "Projects" and "Contact" call-to-action buttons', () => {
    render(<Home />);
    expect(screen.getByRole("button", { name: "Projects" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Contact" })).toBeInTheDocument();
  });

  it("nests all textual content inside a hero-content wrapper", () => {
    const { container } = render(<Home />);
    const heroContent = container.querySelector(".hero-content");
    expect(heroContent).toBeInTheDocument();
    expect(heroContent.querySelector("h1")).toHaveTextContent("Sazise Nkomba");
    expect(heroContent.querySelector("h2")).toHaveTextContent("Software Developer");
    expect(heroContent.querySelectorAll("button")).toHaveLength(2);
  });

  it("does not render any additional buttons beyond Projects and Contact", () => {
    render(<Home />);
    expect(screen.getAllByRole("button")).toHaveLength(2);
  });
});