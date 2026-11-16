import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { projects } from '../src/data/projects.ts';

describe('Data Integrity: Projects', () => {
  it('contains at least one project', () => {
    assert.ok(projects.length > 0, 'Projects array must not be empty');
  });

  it('each project has a unique valid slug', () => {
    const slugs = new Set<string>();
    for (const project of projects) {
      assert.ok(project.slug, `Project "${project.title}" is missing a slug`);
      assert.match(project.slug, /^[a-z0-9-]+$/, `Slug "${project.slug}" must be lowercase and hyphenated`);
      assert.ok(!slugs.has(project.slug), `Duplicate project slug detected: "${project.slug}"`);
      slugs.add(project.slug);
    }
  });

  it('each project has non-empty required fields', () => {
    for (const project of projects) {
      assert.ok(project.title && project.title.trim().length > 0, `Project ${project.slug} must have a title`);
      assert.ok(project.summary && project.summary.trim().length > 0, `Project ${project.slug} must have a summary`);
      assert.ok(project.role && project.role.trim().length > 0, `Project ${project.slug} must have a role`);
      assert.ok(project.team && project.team.trim().length > 0, `Project ${project.slug} must have a team`);
      assert.ok(project.tech && project.tech.length > 0, `Project ${project.slug} must list at least one technology`);
      assert.ok(['real', 'placeholder'].includes(project.status), `Project ${project.slug} has invalid status: ${project.status}`);
    }
  });

  it('each project has valid external links if specified', () => {
    for (const project of projects) {
      if (project.links) {
        for (const link of project.links) {
          assert.ok(link.label, `Link in project ${project.slug} is missing a label`);
          assert.match(link.url, /^https?:\/\//, `Link URL "${link.url}" in project ${project.slug} must start with http:// or https://`);
        }
      }
    }
  });

  it('architecture diagrams have valid structure if present', () => {
    for (const project of projects) {
      if (project.diagram) {
        assert.ok(Array.isArray(project.diagram.services), `Project ${project.slug} diagram must have services array`);
        assert.ok(project.diagram.services.length > 0, `Project ${project.slug} diagram must have at least one service`);
        for (const service of project.diagram.services) {
          assert.ok(service.id && service.label, `Service node in project ${project.slug} must have id and label`);
        }
      }
    }
  });
});
