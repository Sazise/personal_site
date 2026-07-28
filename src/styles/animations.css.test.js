import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

let css;

beforeAll(() => {
  const cssPath = fileURLToPath(new URL('./animations.css', import.meta.url));
  css = readFileSync(cssPath, 'utf-8');
});

// `selectorPattern` is a regex fragment (not a literal string), allowing callers
// to pass lookaheads (e.g. `\.hero(?!-)`) to disambiguate similarly named selectors.
function getRuleBody(source, selectorPattern) {
  const match = source.match(new RegExp(`${selectorPattern}\\s*\\{([^}]*)\\}`));
  return match ? match[1] : null;
}

function getKeyframeBody(source, name) {
  const start = source.indexOf(`@keyframes ${name}`);
  if (start === -1) return null;
  const braceStart = source.indexOf('{', start);
  const braceEnd = source.indexOf('\n}', braceStart);
  return source.slice(braceStart, braceEnd === -1 ? undefined : braceEnd + 2);
}

describe('animations.css - layout rules', () => {
  it('defines a .hero-content rule for positioning the text over the gradients', () => {
    const rule = getRuleBody(css, '\\.hero-content');
    expect(rule).not.toBeNull();
    expect(rule).toMatch(/position:\s*relative;/);
    expect(rule).toMatch(/z-index:\s*2;/);
    expect(rule).toMatch(/text-align:\s*left;/);
    expect(rule).toMatch(/color:\s*white;/);
  });

  it('defines a .hero rule establishing the full-height animated background', () => {
    const rule = getRuleBody(css, '\\.hero(?!-)');
    expect(rule).not.toBeNull();
    expect(rule).toMatch(/position:\s*relative;/);
    expect(rule).toMatch(/overflow:\s*hidden;/);
    expect(rule).toMatch(/min-height:\s*100vh;/);
    expect(rule).toMatch(/background:\s*#09090b;/);
  });

  it('defines a base .gradient rule with a blur filter', () => {
    const rule = getRuleBody(css, '\\.gradient(?!\\s*\\.)');
    expect(rule).not.toBeNull();
    expect(rule).toMatch(/position:\s*absolute;/);
    expect(rule).toMatch(/border-radius:\s*50%;/);
    expect(rule).toMatch(/filter:\s*blur\(120px\);/);
    expect(rule).toMatch(/opacity:\s*\.6;/);
  });
});

describe('animations.css - gradient modifier classes', () => {
  it('defines the .one gradient with its color, position, and animation', () => {
    const rule = getRuleBody(css, '\\.one');
    expect(rule).not.toBeNull();
    expect(rule).toMatch(/background:\s*#2563eb;/);
    expect(rule).toMatch(/top:\s*-150px;/);
    expect(rule).toMatch(/left:\s*-100px;/);
    expect(rule).toMatch(/animation:\s*floatOne 18s ease-in-out infinite;/);
  });

  it('defines the .two gradient with its color, position, and animation', () => {
    const rule = getRuleBody(css, '\\.two');
    expect(rule).not.toBeNull();
    expect(rule).toMatch(/background:\s*#7c3aed;/);
    expect(rule).toMatch(/right:\s*-100px;/);
    expect(rule).toMatch(/bottom:\s*-120px;/);
    expect(rule).toMatch(/animation:\s*floatTwo 22s ease-in-out infinite;/);
  });

  it('defines the .three gradient with its color, position, and animation', () => {
    const rule = getRuleBody(css, '\\.three');
    expect(rule).not.toBeNull();
    expect(rule).toMatch(/background:\s*#06b6d4;/);
    expect(rule).toMatch(/left:\s*45%;/);
    expect(rule).toMatch(/top:\s*45%;/);
    expect(rule).toMatch(/animation:\s*floatThree 20s ease-in-out infinite;/);
  });
});

describe('animations.css - keyframe animations', () => {
  it('defines a floatOne keyframe that translates and returns to origin', () => {
    expect(css).toMatch(/@keyframes\s+floatOne\s*\{/);
    const body = getKeyframeBody(css, 'floatOne');
    expect(body).toMatch(/0%\{\s*transform:translate\(0,0\);\s*\}/);
    expect(body).toMatch(/50%\{\s*transform:translate\(260px,60px\);\s*\}/);
    expect(body).toMatch(/100%\{\s*transform:translate\(0,0\);\s*\}/);
  });

  it('defines a floatTwo keyframe that translates and returns to origin', () => {
    expect(css).toMatch(/@keyframes\s+floatTwo\s*\{/);
    const body = getKeyframeBody(css, 'floatTwo');
    expect(body).toMatch(/0%\{\s*transform:translate\(0,0\);\s*\}/);
    expect(body).toMatch(/50%\{\s*transform:translate\(-80px,-100px\);\s*\}/);
    expect(body).toMatch(/100%\{\s*transform:translate\(0,0\);\s*\}/);
  });

  it('defines a floatThree keyframe that oscillates around an offset origin', () => {
    expect(css).toMatch(/@keyframes\s+floatThree\s*\{/);
    const body = getKeyframeBody(css, 'floatThree');
    expect(body).toMatch(/0%\{\s*transform:translate\(-40px,20px\);\s*\}/);
    expect(body).toMatch(/50%\{\s*transform:translate\(40px,-60px\);\s*\}/);
    expect(body).toMatch(/100%\{\s*transform:translate\(-40px,20px\);\s*\}/);
  });

  it('references each keyframe name from exactly one gradient animation declaration', () => {
    expect(css.match(/animation:\s*floatOne/g)).toHaveLength(1);
    expect(css.match(/animation:\s*floatTwo/g)).toHaveLength(1);
    expect(css.match(/animation:\s*floatThree/g)).toHaveLength(1);
  });
});