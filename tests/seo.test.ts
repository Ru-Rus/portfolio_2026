import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { projects } from '../src/data/projects.ts';

describe('SEO & Metadata Integrity', () => {
  const publicDir = path.resolve(import.meta.dirname, '../public');
  const indexHtmlPath = path.resolve(import.meta.dirname, '../index.html');
  const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

  it('verifies public/og-image.png exists and is non-empty', () => {
    const ogImagePath = path.join(publicDir, 'og-image.png');
    assert.ok(fs.existsSync(ogImagePath), 'public/og-image.png must exist');
    const stats = fs.statSync(ogImagePath);
    assert.ok(stats.size > 1000, 'public/og-image.png should be a valid image file (> 1KB)');
  });

  it('index.html contains open graph and twitter card preview tags', () => {
    assert.ok(indexHtml.includes('property="og:image"'), 'Missing og:image tag');
    assert.ok(indexHtml.includes('content="/og-image.png"'), 'og:image must reference /og-image.png');
    assert.ok(indexHtml.includes('name="twitter:card" content="summary_large_image"'), 'Twitter card must be summary_large_image');
    assert.ok(indexHtml.includes('name="twitter:image"'), 'Missing twitter:image tag');
  });

  it('public/sitemap.xml includes all major pages and project case studies', () => {
    const sitemapPath = path.join(publicDir, 'sitemap.xml');
    assert.ok(fs.existsSync(sitemapPath), 'public/sitemap.xml must exist');
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');

    // Check base routes
    const routes = ['about', 'projects', 'playground', 'skills', 'contact'];
    for (const route of routes) {
      assert.ok(sitemapContent.includes(`/${route}`), `sitemap.xml should include /${route}`);
    }

    // Check project routes
    for (const project of projects) {
      assert.ok(sitemapContent.includes(`/projects/${project.slug}`), `sitemap.xml should include project ${project.slug}`);
    }
  });

  it('public/robots.txt references the sitemap', () => {
    const robotsPath = path.join(publicDir, 'robots.txt');
    assert.ok(fs.existsSync(robotsPath), 'public/robots.txt must exist');
    const robotsContent = fs.readFileSync(robotsPath, 'utf8');
    assert.ok(robotsContent.includes('Sitemap:'), 'robots.txt must declare Sitemap:');
  });
});
