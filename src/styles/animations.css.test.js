import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

describe('src/styles/animations.css', () => {
  let css;

  beforeAll(() => {
    css = readFileSync(join(__dirname, 'animations.css'), 'utf-8');
  });

  const getRuleBody = (selector) => {
    const match = css.match(new RegExp(`(?:^|\\})\\s*${selector.replace(/[.#]/g, '\\$&')}\\s*\\{([^}]*)\\}`));
    return match ? match[1] : null;
  };

  const getKeyframesBody = (name) => {
    const match = css.match(new RegExp(`@keyframes\\s+${name}\\s*\\{([\\s\\S]*?)\\n\\}`));
    return match ? match[1] : null;
  };

  it('has balanced braces', () => {
    const openCount = (css.match(/\{/g) || []).length;
    const closeCount = (css.match(/\}/g) || []).length;
    expect(openCount).toBe(closeCount);
  });

  it('defines the .hero-content rule with expected layering and text styles', () => {
    const body = getRuleBody('.hero-content');
    expect(body).not.toBeNull();
    expect(body).toContain('position:relative');
    expect(body).toContain('z-index:2');
    expect(body).toContain('text-align:left');
    expect(body).toContain('color:white');
  });

  it('defines the .hero rule as a full-height, centered, dark section', () => {
    const body = getRuleBody('.hero');
    expect(body).not.toBeNull();
    expect(body).toContain('position:relative');
    expect(body).toContain('overflow:hidden');
    expect(body).toContain('min-height:100vh');
    expect(body).toContain('display:grid');
    expect(body).toContain('background:#09090b');
  });

  it('defines a shared .gradient rule for the blurred blobs', () => {
    const body = getRuleBody('.gradient');
    expect(body).not.toBeNull();
    expect(body).toContain('position:absolute');
    expect(body).toContain('border-radius:50%');
    expect(body).toContain('filter:blur(120px)');
  });

  it.each([
    ['.one', 'floatOne', '#2563eb'],
    ['.two', 'floatTwo', '#7c3aed'],
    ['.three', 'floatThree', '#06b6d4'],
  ])('defines %s with its own color and animation reference', (selector, animationName, color) => {
    const body = getRuleBody(selector);
    expect(body).not.toBeNull();
    expect(body).toContain(`background:${color}`);
    expect(body).toContain(animationName);
  });

  it.each(['floatOne', 'floatTwo', 'floatThree'])(
    'defines a @keyframes rule for %s with 0%%, 50%% and 100%% steps',
    (name) => {
      const body = getKeyframesBody(name);
      expect(body).not.toBeNull();
      expect(body).toMatch(/0%\s*\{\s*transform:translate\(/);
      expect(body).toMatch(/50%\s*\{\s*transform:translate\(/);
      expect(body).toMatch(/100%\s*\{\s*transform:translate\(/);
    }
  );

  it('animates floatOne and floatTwo back to their origin at 0% and 100%', () => {
    const oneBody = getKeyframesBody('floatOne');
    const twoBody = getKeyframesBody('floatTwo');
    expect(oneBody).toMatch(/0%\{\s*transform:translate\(0,0\);/);
    expect(oneBody).toMatch(/100%\{\s*transform:translate\(0,0\);/);
    expect(twoBody).toMatch(/0%\{\s*transform:translate\(0,0\);/);
    expect(twoBody).toMatch(/100%\{\s*transform:translate\(0,0\);/);
  });

  it('gives floatThree a non-zero starting/ending offset that matches at 0% and 100%', () => {
    const threeBody = getKeyframesBody('floatThree');
    const zeroPercent = threeBody.match(/0%\{\s*transform:translate\(([^)]+)\);/)[1];
    const hundredPercent = threeBody.match(/100%\{\s*transform:translate\(([^)]+)\);/)[1];
    expect(zeroPercent).toBe('-40px,20px');
    expect(hundredPercent).toBe(zeroPercent);
  });
});