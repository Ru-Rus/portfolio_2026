import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { cn } from '../src/lib/utils.ts';

describe('Utility: cn (classnames + tailwind-merge)', () => {
  it('merges simple class names', () => {
    const result = cn('btn', 'btn-primary');
    assert.equal(result, 'btn btn-primary');
  });

  it('handles conditional class expressions', () => {
    const isPrimary = true;
    const isHidden = false;
    const result = cn('base', isPrimary && 'text-blue-500', isHidden && 'hidden');
    assert.equal(result, 'base text-blue-500');
  });

  it('correctly resolves Tailwind class collisions (twMerge)', () => {
    // p-4 should overwrite p-2
    const result = cn('p-2', 'p-4');
    assert.equal(result, 'p-4');

    // text-white should overwrite text-black
    const colorResult = cn('text-black', 'text-white');
    assert.equal(colorResult, 'text-white');
  });

  it('handles empty inputs, undefined, and null gracefully', () => {
    const result = cn(null, undefined, '', false);
    assert.equal(result, '');
  });
});
