import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";

const css = readFileSync(new URL("./index.css", import.meta.url), "utf-8");

function getRule(selector) {
  const match = css.match(new RegExp(`${selector}\\s*\\{([^}]*)\\}`));
  return match ? match[1] : null;
}

describe("index.css - #root rules", () => {
  const rootRule = getRule("#root");

  it("defines a #root rule", () => {
    expect(rootRule).not.toBeNull();
  });

  it("no longer hardcodes a fixed 1126px width (regression check)", () => {
    expect(rootRule).not.toMatch(/width:\s*1126px/);
    expect(css).not.toMatch(/width:\s*1126px/);
  });

  it("constrains width responsively with max-width: 100%", () => {
    expect(rootRule).toMatch(/max-width:\s*100%/);
  });

  it("adds a min-height of 100% so #root fills its container", () => {
    expect(rootRule).toMatch(/min-height:\s*100%/);
  });

  it("still falls back to a full small-viewport-height on min-height", () => {
    expect(rootRule).toMatch(/min-height:\s*100svh/);
  });

  it("retains the centered, bordered layout for the root container", () => {
    expect(rootRule).toMatch(/margin:\s*0 auto/);
    expect(rootRule).toMatch(/text-align:\s*center/);
    expect(rootRule).toMatch(/border-inline:\s*1px solid var\(--border\)/);
    expect(rootRule).toMatch(/display:\s*flex/);
    expect(rootRule).toMatch(/flex-direction:\s*column/);
  });
});