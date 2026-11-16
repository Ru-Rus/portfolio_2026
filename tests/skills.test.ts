import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { skillCategories, alsoFamiliarWith } from '../src/data/skills.ts';

describe('Data Integrity: Skills', () => {
  it('skillCategories is populated with categories', () => {
    assert.ok(skillCategories.length > 0, 'skillCategories must not be empty');
  });

  it('each category contains valid skills with non-empty basis', () => {
    for (const cat of skillCategories) {
      assert.ok(cat.category && cat.category.trim().length > 0, 'Category name must not be empty');
      assert.ok(Array.isArray(cat.skills) && cat.skills.length > 0, `Category ${cat.category} must have skills`);
      
      const skillNames = new Set<string>();
      for (const skill of cat.skills) {
        assert.ok(skill.name && skill.name.trim().length > 0, `Skill name in ${cat.category} must not be empty`);
        assert.ok(skill.basis && skill.basis.trim().length > 0, `Skill "${skill.name}" in ${cat.category} must have a description/basis`);
        assert.ok(!skillNames.has(skill.name), `Duplicate skill "${skill.name}" in category ${cat.category}`);
        skillNames.add(skill.name);
      }
    }
  });

  it('alsoFamiliarWith contains a valid list of skills', () => {
    assert.ok(alsoFamiliarWith.length > 0, 'alsoFamiliarWith must not be empty');
    for (const item of alsoFamiliarWith) {
      assert.ok(typeof item === 'string' && item.trim().length > 0, 'Each item in alsoFamiliarWith must be a non-empty string');
    }
  });
});
