import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

describe('src/index.css', () => {
  let css;

  beforeAll(() => {
    css = readFileSync(join(__dirname, 'index.css'), 'utf-8');
  });

  const getRuleBody = (selector) => {
    const match = css.match(new RegExp(`${selector.replace(/[.#]/g, '\\$&')}\\s*\\{([^}]*)\\}`));
    return match ? match[1] : null;
  };

  it('has balanced braces', () => {
    const openCount = (css.match(/\{/g) || []).length;
    const closeCount = (css.match(/\}/g) || []).length;
    expect(openCount).toBe(closeCount);
  });

  it('defines a #root rule block', () => {
    const rootBlock = getRuleBody('#root');
    expect(rootBlock).not.toBeNull();
  });

  it('makes #root fluid instead of a fixed 1126px width', () => {
    const rootBlock = getRuleBody('#root');
    expect(rootBlock).toContain('max-width: 100%');
    expect(rootBlock).not.toMatch(/width:\s*1126px/);
  });

  it('adds a min-height: 100% rule to #root', () => {
    const rootBlock = getRuleBody('#root');
    expect(rootBlock).toMatch(/min-height:\s*100%;/);
  });

  it('still retains the pre-existing #root layout rules', () => {
    const rootBlock = getRuleBody('#root');
    expect(rootBlock).toContain('margin: 0 auto');
    expect(rootBlock).toContain('text-align: center');
    expect(rootBlock).toContain('display: flex');
    expect(rootBlock).toMatch(/min-height:\s*100svh;/);
  });
});