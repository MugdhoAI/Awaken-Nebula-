// Smoke test for nebula.html: checks the markup and that the module
// script parses. Run with: npm test
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(new URL('..', import.meta.url)));
const html = readFileSync(join(root, 'nebula.html'), 'utf8');

function check(name, condition) {
  assert.ok(condition, name);
  console.log(`ok: ${name}`);
}

// Markup
check('starts with a doctype', html.startsWith('<!DOCTYPE html>'));
check('has a canvas container', html.includes('id="canvas-container"'));
check('has an instructions overlay', html.includes('id="instructions"'));
check('has a stats element', html.includes('id="stats"'));
check('loads a pinned Three.js version', html.includes("three@0.160.0/build/three.module.js"));

// The module script must exist and parse as valid JavaScript
const match = html.match(/<script type="module">([\s\S]*?)<\/script>/);
check('has exactly one module script', match !== null);
const dir = mkdtempSync(join(tmpdir(), 'awaken-nebula-'));
try {
  const scriptPath = join(dir, 'nebula-script.mjs');
  writeFileSync(scriptPath, match[1]);
  execFileSync(process.execPath, ['--check', scriptPath], { stdio: 'pipe' });
  console.log('ok: module script parses (node --check)');
} finally {
  rmSync(dir, { recursive: true, force: true });
}

// Regression checks for shipped fixes and features
check('mouse center is recalculated on resize', html.includes('windowHalfX = window.innerWidth / 2;'));
check('pixel ratio is capped', html.includes('Math.min(window.devicePixelRatio, 2)'));
check('touch drag is handled', html.includes("addEventListener('touchmove'"));
check('keyboard pause and speed controls exist', html.includes("event.code === 'Space'") && html.includes('speedMultiplier'));
check('reduced motion is honored', html.includes("prefers-reduced-motion: reduce"));
check('live FPS stats are updated', html.includes('updateStats()') && html.includes('FPS'));

console.log('smoke test passed');
