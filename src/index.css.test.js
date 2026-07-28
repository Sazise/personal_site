import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

let css;

beforeAll(() => {
  const cssPath = fileURLToPath(new URL('./index.css', import.meta.url));
  css = readFileSync(cssPath, 'utf-8');
});

function getRuleBody(source, selector) {
  const match = source.match(new RegExp(`${selector}\\s*\\{([^}]*)\\}`));
  return match ? match[1] : null;
}

describe('index.css - #root rule', () => {
  it('sets max-width to 100% instead of a fixed pixel width', () => {
    const rootRule = getRuleBody(css, '#root');
    expect(rootRule).not.toBeNull();
    expect(rootRule).toMatch(/max-width:\s*100%;/);
  });

  it('no longer constrains #root to a fixed 1126px width', () => {
    const rootRule = getRuleBody(css, '#root');
    expect(rootRule).not.toMatch(/width:\s*1126px/);
  });

  it('adds a min-height of 100% for the #root container', () => {
    const rootRule = getRuleBody(css, '#root');
    expect(rootRule).toMatch(/min-height:\s*100%;/);
  });

  it('still retains the existing 100svh min-height fallback rule', () => {
    const rootRule = getRuleBody(css, '#root');
    expect(rootRule).toMatch(/min-height:\s*100svh;/);
  });

  it('preserves layout-related declarations untouched by this change', () => {
    const rootRule = getRuleBody(css, '#root');
    expect(rootRule).toMatch(/margin:\s*0 auto;/);
    expect(rootRule).toMatch(/text-align:\s*center;/);
    expect(rootRule).toMatch(/display:\s*flex;/);
  });
});