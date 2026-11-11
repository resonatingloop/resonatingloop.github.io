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

test('production output publishes only the public writing collection', (t) => {
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
  assert.match(home, /href="\/upward\/"/);
  assert.match(home, /href="\/cootie-oracle\/"/);
  assert.match(home, /href="\/writing\/"/);
  assert.match(home, /<a class="channel" href="\/writing\/">writing<\/a>/);
  assert.match(home, /2 transmissions/);

  const archivePath = path.join(output, 'writing', 'index.html');
  assert.equal(fs.existsSync(archivePath), true);
  const archive = fs.readFileSync(archivePath, 'utf8');

  for (const source of findMarkdownFiles(writingRoot)) {
    const data = readFrontMatter(source);
    const relative = path.relative(writingRoot, source).replace(/\.md$/, '');
    const rendered = path.join(output, 'writing', relative, 'index.html');

    if (data.visibility === 'private') {
      assert.equal(fs.existsSync(rendered), false, relative);
      assert.equal(archive.includes(`href="/writing/${relative}/"`), false);
      continue;
    }

    assert.equal(fs.existsSync(rendered), true, relative);
    const html = fs.readFileSync(rendered, 'utf8');
    assert.match(html, /^<!DOCTYPE html>/, relative);
    assert.match(html, /<link rel="icon" type="image\/svg\+xml" href="\/favicon\.svg" \/>/, relative);
    if (data.visibility === 'unlisted') {
      assert.equal(archive.includes(`href="/writing/${relative}/"`), false);
      assert.match(
        html,
        /<meta name="robots" content="noindex,nofollow" \/>/,
        relative
      );
    } else {
      assert.equal(archive.includes(`href="/writing/${relative}/"`), true);
      assert.doesNotMatch(html, /<meta name="robots" content="noindex,nofollow" \/>/);
    }
  }
});

test('series writing renders a portable dispatch with a plain-text sealed record', (t) => {
  const fixture = fs.mkdtempSync(path.join(os.tmpdir(), 'resonatrix-dispatch-'));
  const output = path.join(fixture, '_site');
  t.after(() => fs.rmSync(fixture, { recursive: true, force: true }));

  for (const source of [
    'eleventy.config.js',
    'favicon.svg',
    'main.js',
    'style.css',
    '_includes',
    'lib',
  ]) {
    fs.cpSync(path.join(repo, source), path.join(fixture, source), {
      recursive: true,
    });
  }
  fs.mkdirSync(path.join(fixture, 'writing'), { recursive: true });
  fs.copyFileSync(
    path.join(repo, 'writing', 'writing.11tydata.js'),
    path.join(fixture, 'writing', 'writing.11tydata.js')
  );
  fs.writeFileSync(path.join(fixture, 'index.njk'), '<p>fixture</p>', 'utf8');
  fs.writeFileSync(
    path.join(fixture, 'writing', 'dispatch.md'),
    `---
title: field dispatch one
deck: a portable witness record from an invented inquiry.
visibility: unlisted
eleventyExcludeFromCollections: true
series: field notes
seriesEntry: "001"
author: codex
fieldStudy: observer + codex
displayDate: "2026-11-08"
colophon:
  - label: source aperture
    value: sealed
  - label: private trace window
    value: fixture units f001-f004
credits:
  - label: author
    value: codex
  - label: editorial selection and custody
    value: archive keeper
---

A transcript is an unpleasant object.

## The correction that worked

Case-local references remain text, not public links.
`,
    'utf8'
  );

  execFileSync(
    path.join(repo, 'node_modules', '.bin', 'eleventy'),
    ['--output', output],
    { cwd: fixture, stdio: 'pipe' }
  );

  const html = fs.readFileSync(
    path.join(output, 'writing', 'dispatch', 'index.html'),
    'utf8'
  );
  assert.equal((html.match(/<h1>/g) || []).length, 1);
  assert.match(html, /<a class="skip-link" href="#main-content">skip to writing<\/a>/);
  assert.match(html, /<main class="prose" id="main-content">/);
  assert.match(html, /<article class="post post--series">/);
  assert.match(html, /<span class="post__series-name">field notes<\/span>/);
  assert.match(html, /<p class="post__deck">a portable witness record/);
  assert.match(html, /authored by <strong class="post__author post__author--codex">codex<\/strong>/);
  assert.match(html, /<footer class="post__colophon" aria-labelledby="sealed-source-colophon">/);
  assert.match(html, /<h2 id="sealed-source-colophon">sealed-source colophon<\/h2>/);
  assert.match(html, /<dt>private trace window<\/dt>\s*<dd>fixture units f001-f004<\/dd>/);
  assert.doesNotMatch(html, /<a[^>]*>fixture units f001-f004<\/a>/);
  assert.match(html, /<meta name="robots" content="noindex,nofollow" \/>/);
});
