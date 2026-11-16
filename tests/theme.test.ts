import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

describe('Theme Palette Integrity (index.css)', () => {
  const cssPath = path.resolve(import.meta.dirname, '../src/index.css');
  const cssContent = fs.readFileSync(cssPath, 'utf8');

  it('defines :root light mode variables', () => {
    assert.ok(cssContent.includes(':root {'), 'index.css must define a :root block');
    assert.ok(cssContent.includes('--background: #f8fafc;'), 'Light mode background should use softened slate-50');
    assert.ok(cssContent.includes('--foreground: #0f172a;'), 'Light mode foreground should use high-contrast slate-900');
    assert.ok(cssContent.includes('--primary: #1d4ed8;'), 'Light mode primary/headings should use deep accessible blue');
    assert.ok(cssContent.includes('--brand: #2563eb;'), 'Light mode brand should use accessible blue');
  });

  it('defines .dark dark mode variables', () => {
    assert.ok(cssContent.includes('.dark {'), 'index.css must define a .dark block');
    assert.ok(cssContent.includes('--background: #000000;'), 'Dark mode background should be obsidian black');
    assert.ok(cssContent.includes('--foreground: #ffffff;'), 'Dark mode foreground should be pure white');
    assert.ok(cssContent.includes('--brand: #A0C3E8;'), 'Dark mode brand should use the light blue accent');
  });

  it('ensures light mode brand color has high contrast compared to dark mode', () => {
    // Extract root brand and dark brand
    const rootBrandMatch = cssContent.match(/:root\s*\{[^}]*--brand:\s*([^;]+);/s);
    const darkBrandMatch = cssContent.match(/\.dark\s*\{[^}]*--brand:\s*([^;]+);/s);

    assert.ok(rootBrandMatch, 'Should find :root --brand definition');
    assert.ok(darkBrandMatch, 'Should find .dark --brand definition');

    const lightBrand = rootBrandMatch[1].trim();
    const darkBrand = darkBrandMatch[1].trim();

    // They must not be identical (light mode must not use the washed-out dark mode pastel)
    assert.notEqual(
      lightBrand.toLowerCase(),
      darkBrand.toLowerCase(),
      'Light mode brand color must be optimized for light backgrounds, not identical to dark mode pastel'
    );
  });
});
