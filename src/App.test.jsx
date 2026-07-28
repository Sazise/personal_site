import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import App from "./App.jsx";

vi.mock("./components/Navbar/Navbar.jsx", () => ({
  default: () => <div data-testid="navbar-mock" />,
}));

vi.mock("./pages/Home.jsx", () => ({
  default: () => <div data-testid="home-mock" />,
}));

describe("App", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the Navbar component", () => {
    render(<App />);
    expect(screen.getByTestId("navbar-mock")).toBeInTheDocument();
  });

  it("renders the Home component", () => {
    render(<App />);
    expect(screen.getByTestId("home-mock")).toBeInTheDocument();
  });

  it("no longer renders a standalone #home section (content moved into Home component)", () => {
    const { container } = render(<App />);
    expect(container.querySelector("#home")).not.toBeInTheDocument();
    expect(screen.queryByText("Home", { selector: "h1" })).not.toBeInTheDocument();
  });

  it("renders Navbar before Home, and Home before the static placeholder sections", () => {
    const { container } = render(<App />);
    const children = Array.from(container.children);

    const navbarIndex = children.findIndex(
      (el) => el.getAttribute("data-testid") === "navbar-mock"
    );
    const homeIndex = children.findIndex(
      (el) => el.getAttribute("data-testid") === "home-mock"
    );
    const aboutIndex = children.findIndex((el) => el.id === "about");

    expect(navbarIndex).toBe(0);
    expect(homeIndex).toBeGreaterThan(navbarIndex);
    expect(aboutIndex).toBeGreaterThan(homeIndex);
  });

  it.each([
    ["about", "#181818"],
    ["skills", "#222"],
    ["projects", "#181818"],
    ["contact", "#111"],
  ])('renders the "%s" section with full-height and the correct background', (id, background) => {
    const { container } = render(<App />);
    const section = container.querySelector(`#${id}`);

    expect(section).toBeInTheDocument();
    expect(section.tagName).toBe("SECTION");
    expect(section).toHaveStyle({ height: "100vh", background });
  });

  it("renders each static placeholder section with no content", () => {
    const { container } = render(<App />);
    ["about", "skills", "projects", "contact"].forEach((id) => {
      expect(container.querySelector(`#${id}`)).toBeEmptyDOMElement();
    });
  });

  it("renders exactly four static placeholder sections plus the mocked Navbar and Home", () => {
    const { container } = render(<App />);
    const sections = container.querySelectorAll("section");
    expect(sections).toHaveLength(4);
  });
});