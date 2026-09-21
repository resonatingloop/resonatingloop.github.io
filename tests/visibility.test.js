'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const { requireVisibility } = require('../lib/visibility');
const {
  findMarkdownFiles,
  readFrontMatter,
  validateWritingSources,
} = require('../lib/writing-metadata');

const repo = path.resolve(__dirname, '..');
const writingRoot = path.join(repo, 'writing');

test('visibility values fail closed', () => {
  for (const value of ['public', 'unlisted', 'private']) {
    assert.equal(requireVisibility(value, 'fixture.md'), value);
  }
  for (const value of [undefined, '', 'draft', 'Public']) {
    assert.throws(() => requireVisibility(value, 'fixture.md'));
  }
});

test('current writing metadata satisfies the publication boundary', () => {
  assert.doesNotThrow(() => validateWritingSources(writingRoot));
});

test('unlisted writing without collection exclusion is rejected', (t) => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'resonatrix-visibility-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  fs.writeFileSync(
    path.join(root, 'witness.md'),
    '---\ntitle: witness\nvisibility: unlisted\n---\n',
    'utf8'
  );
  assert.throws(
    () => validateWritingSources(root),
    /eleventyExcludeFromCollections: true/
  );
});

test('production output keeps the unlisted chamber unadvertised', (t) => {
  const output = fs.mkdtempSync(path.join(os.tmpdir(), 'resonatrix-build-'));
  t.after(() => fs.rmSync(output, { recursive: true, force: true }));

  execFileSync(
    path.join(repo, 'node_modules', '.bin', 'eleventy'),
    ['--output', output],
    { cwd: repo, stdio: 'pipe' }
  );

  const home = fs.readFileSync(path.join(output, 'index.html'), 'utf8');
  const favicon = fs.readFileSync(path.join(output, 'favicon.svg'), 'utf8');
  assert.match(favicon, /<svg[^>]+viewBox="0 0 64 64"/);
  assert.match(home, /<link rel="icon" type="image\/svg\+xml" href="\/favicon\.svg" \/>/);
  assert.match(home, /href="\/geomatria\/"/);
  assert.match(home, /href="https:\/\/cyphers\.news\/"/);
  assert.match(home, /href="\/cootie-oracle\/"/);
  assert.doesNotMatch(home, /href="\/writing\/"/);
  assert.equal(fs.existsSync(path.join(output, 'writing', 'index.html')), false);

  for (const source of findMarkdownFiles(writingRoot)) {
    const data = readFrontMatter(source);
    const relative = path.relative(writingRoot, source).replace(/\.md$/, '');
    const rendered = path.join(output, 'writing', relative, 'index.html');

    if (data.visibility === 'private') {
      assert.equal(fs.existsSync(rendered), false, relative);
      continue;
    }

    assert.equal(fs.existsSync(rendered), true, relative);
    const html = fs.readFileSync(rendered, 'utf8');
    assert.match(html, /^<!DOCTYPE html>/, relative);
    assert.match(html, /<link rel="icon" type="image\/svg\+xml" href="\/favicon\.svg" \/>/, relative);
    if (data.visibility === 'unlisted') {
      assert.match(
        html,
        /<meta name="robots" content="noindex,nofollow" \/>/,
        relative
      );
    }
  }
});
