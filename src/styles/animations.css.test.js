import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";

const css = readFileSync(new URL("./animations.css", import.meta.url), "utf-8");

function getRule(selector) {
  const match = css.match(new RegExp(`${selector}\\s*\\{([^}]*)\\}`));
  return match ? match[1] : null;
}

function getKeyframesBlock(name) {
  const match = css.match(new RegExp(`@keyframes ${name}[\\s\\S]*?(?=@keyframes\\s|$)`));
  return match ? match[0] : null;
}

describe("animations.css", () => {
  it("defines the .hero-content text layer above the background gradients", () => {
    const rule = getRule("\\.hero-content");
    expect(rule).not.toBeNull();
    expect(rule).toMatch(/position:\s*relative/);
    expect(rule).toMatch(/z-index:\s*2/);
    expect(rule).toMatch(/text-align:\s*left/);
    expect(rule).toMatch(/color:\s*white/);
  });

  it("defines the .hero full-height container with clipped overflow", () => {
    const rule = getRule("\\.hero(?!-)");
    expect(rule).not.toBeNull();
    expect(rule).toMatch(/position:\s*relative/);
    expect(rule).toMatch(/overflow:\s*hidden/);
    expect(rule).toMatch(/min-height:\s*100vh/);
    expect(rule).toMatch(/display:\s*grid/);
    expect(rule).toMatch(/background:\s*#09090b/);
  });

  it("defines a shared blurred, circular .gradient style", () => {
    const rule = getRule("\\.gradient(?!\\.)");
    expect(rule).not.toBeNull();
    expect(rule).toMatch(/border-radius:\s*50%/);
    expect(rule).toMatch(/filter:\s*blur\(120px\)/);
    expect(rule).toMatch(/opacity:\s*\.6/);
  });

  it.each([
    ["one", "#2563eb", "floatOne", "18s"],
    ["two", "#7c3aed", "floatTwo", "22s"],
    ["three", "#06b6d4", "floatThree", "20s"],
  ])('defines .%s with its color and its %s float animation', (className, color, animationName, duration) => {
    const rule = getRule(`\\.${className}`);
    expect(rule).not.toBeNull();
    expect(rule).toContain(color);
    expect(rule).toContain(animationName);
    expect(rule).toContain(duration);
  });

  it.each(["floatOne", "floatTwo", "floatThree"])(
    "defines a %s keyframes animation with 0%%, 50%% and 100%% transform steps",
    (name) => {
      const block = getKeyframesBlock(name);
      expect(block).not.toBeNull();
      expect(block).toMatch(/0%\s*\{\s*transform:\s*translate\(/);
      expect(block).toMatch(/50%\s*\{\s*transform:\s*translate\(/);
      expect(block).toMatch(/100%\s*\{\s*transform:\s*translate\(/);
    }
  );

  it("returns each float animation to its starting transform (0% matches 100%)", () => {
    ["floatOne", "floatTwo", "floatThree"].forEach((name) => {
      const block = getKeyframesBlock(name);
      const steps = [...block.matchAll(/(\d+)%\s*\{\s*transform:\s*translate\(([^)]*)\)/g)];
      const start = steps.find((s) => s[1] === "0");
      const end = steps.find((s) => s[1] === "100");
      expect(start).toBeDefined();
      expect(end).toBeDefined();
      expect(start[2]).toBe(end[2]);
    });
  });
});