import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { computeSystemMetrics, toggles } from '../src/lib/playgroundMetrics.ts';

describe('System Design Playground Logic', () => {
  it('toggles list defines all 4 architecture components with icons', () => {
    assert.equal(toggles.length, 4, 'Should define 4 toggles');
    const ids = toggles.map((t) => t.id);
    assert.ok(ids.includes('loadBalancer'), 'Missing loadBalancer');
    assert.ok(ids.includes('replicas'), 'Missing replicas');
    assert.ok(ids.includes('cache'), 'Missing cache');
    assert.ok(ids.includes('dbReplica'), 'Missing dbReplica');
  });

  it('computes baseline metrics for single server without cache', () => {
    const metrics = computeSystemMetrics({
      loadBalancer: false,
      replicas: false,
      cache: false,
      dbReplica: false,
    });

    assert.equal(metrics.throughput.level, 'normal');
    assert.match(metrics.throughput.value, /1,000 req\/s/);
    assert.match(metrics.latency.value, /95ms - 120ms/);
    assert.equal(metrics.latency.level, 'normal');
    assert.equal(metrics.availability.isResilient, false);
    assert.match(metrics.availability.status, /Single Point of Failure/);
  });

  it('calculates boosted throughput when Load Balancer and Replicas are active', () => {
    const metrics = computeSystemMetrics({
      loadBalancer: true,
      replicas: true,
      cache: false,
      dbReplica: false,
    });

    assert.equal(metrics.throughput.level, 'boosted');
    assert.match(metrics.throughput.value, /3,500 req\/s/);
  });

  it('warns about bottleneck when Replicas are on but Load Balancer is missing', () => {
    const metrics = computeSystemMetrics({
      loadBalancer: false,
      replicas: true,
      cache: false,
      dbReplica: false,
    });

    assert.equal(metrics.throughput.level, 'warning');
    assert.match(metrics.throughput.subtext, /without a Load Balancer/);
  });

  it('calculates sub-15ms latency when Redis cache is enabled', () => {
    const metrics = computeSystemMetrics({
      loadBalancer: true,
      replicas: true,
      cache: true,
      dbReplica: false,
    });

    assert.equal(metrics.latency.level, 'optimal');
    assert.match(metrics.latency.value, /8ms - 15ms/);
  });

  it('reports high availability resilience when all redundancy layers are active', () => {
    const metrics = computeSystemMetrics({
      loadBalancer: true,
      replicas: true,
      cache: true,
      dbReplica: true,
    });

    assert.equal(metrics.availability.isResilient, true);
    assert.match(metrics.availability.status, /Highly Available/);
  });
});
