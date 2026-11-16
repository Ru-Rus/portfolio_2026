import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { certifications } from '../src/data/certifications.ts';

const VALID_CATEGORIES = [
  'Programming',
  'Web Development',
  'Database',
  'Data Engineering',
  'Tools',
  'Soft Skills',
];

describe('Data Integrity: Certifications', () => {
  it('contains expected number of certificates (29)', () => {
    assert.equal(certifications.length, 29, 'Total count of certificates should be 29');
  });

  it('each certificate has a unique valid slug', () => {
    const slugs = new Set<string>();
    for (const cert of certifications) {
      assert.ok(cert.slug, `Certificate "${cert.name}" is missing a slug`);
      assert.match(cert.slug, /^[a-z0-9-]+$/, `Slug "${cert.slug}" must be lowercase and hyphenated`);
      assert.ok(!slugs.has(cert.slug), `Duplicate certificate slug detected: "${cert.slug}"`);
      slugs.add(cert.slug);
    }
  });

  it('each certificate image file exists in public/certs/', () => {
    const certsDir = path.resolve(import.meta.dirname, '../public/certs');
    for (const cert of certifications) {
      const imgPath = path.join(certsDir, `${cert.slug}.jpg`);
      assert.ok(fs.existsSync(imgPath), `Missing image file for cert "${cert.slug}": expected ${imgPath}`);
    }
  });

  it('each certificate has valid category and ISO date', () => {
    for (const cert of certifications) {
      assert.ok(VALID_CATEGORIES.includes(cert.category), `Invalid category "${cert.category}" in cert "${cert.slug}"`);
      assert.match(cert.date, /^\d{4}-\d{2}-\d{2}$/, `Date "${cert.date}" in cert "${cert.slug}" must match YYYY-MM-DD`);
      assert.ok(!isNaN(Date.parse(cert.date)), `Date "${cert.date}" in cert "${cert.slug}" is not a valid date`);
    }
  });

  it('each certificate verification URL is valid', () => {
    for (const cert of certifications) {
      assert.match(cert.url, /^https:\/\//, `Verification URL "${cert.url}" in cert "${cert.slug}" must start with https://`);
    }
  });
});
