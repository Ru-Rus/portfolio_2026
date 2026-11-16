import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

describe('Technology Icons & Brand Logo Mapping', () => {
  const iconFilePath = path.resolve(import.meta.dirname, '../src/components/icons/TechIcons.tsx');
  const iconFileContent = fs.readFileSync(iconFilePath, 'utf8');

  it('verifies TechIcons.tsx exists and defines key technology SVGs', () => {
    assert.ok(fs.existsSync(iconFilePath), 'TechIcons.tsx must exist');
    assert.ok(iconFileContent.includes('export function ReactIcon'), 'ReactIcon must be exported');
    assert.ok(iconFileContent.includes('export function TypeScriptIcon'), 'TypeScriptIcon must be exported');
    assert.ok(iconFileContent.includes('export function CSharpIcon'), 'CSharpIcon must be exported');
    assert.ok(iconFileContent.includes('export function PythonIcon'), 'PythonIcon must be exported');
    assert.ok(iconFileContent.includes('export function SqlServerIcon'), 'SqlServerIcon must be exported');
    assert.ok(iconFileContent.includes('export function MongoDbIcon'), 'MongoDbIcon must be exported');
    assert.ok(iconFileContent.includes('export function KafkaIcon'), 'KafkaIcon must be exported');
    assert.ok(iconFileContent.includes('export function NginxIcon'), 'NginxIcon must be exported');
    assert.ok(iconFileContent.includes('export function AzureIcon'), 'AzureIcon must be exported');
  });

  it('techIconMap maps all essential backend and frontend technologies', () => {
    const requiredTechs = [
      'React',
      'TypeScript',
      'JavaScript',
      'Tailwind CSS',
      'C#',
      '.NET',
      'Python',
      'FastAPI',
      'SQL Server',
      'PostgreSQL',
      'MongoDB',
      'Redis',
      'Apache Kafka',
      'Nginx',
      'Azure',
      'Git',
      'Load Balancing',
      'System Design',
      'REST APIs',
      'gRPC',
      'Windows Forms',
      'React Native',
      'MySQL',
    ];

    for (const tech of requiredTechs) {
      assert.ok(
        iconFileContent.includes(`"${tech}"`) || iconFileContent.includes(`${tech}:`),
        `techIconMap should map "${tech}"`
      );
    }
  });

  it('exports TechIcon wrapper component', () => {
    assert.ok(iconFileContent.includes('export function TechIcon'), 'TechIcon wrapper must be exported');
  });
});
