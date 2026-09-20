'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { requireVisibility, isPublic } = require('./visibility');

function parseScalar(value) {
  const trimmed = value.trim();
  if (trimmed === 'true') return true;
  if (trimmed === 'false') return false;
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) ||
      (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function readFrontMatter(filePath) {
  const source = fs.readFileSync(filePath, 'utf8');
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!match) {
    throw new Error(`[visibility] ${filePath}\n  writing files require front matter.`);
  }

  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim() || line.trimStart().startsWith('#')) continue;
    const separator = line.indexOf(':');
    if (separator === -1) continue;
    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1);
    data[key] = parseScalar(value);
  }
  return data;
}

function findMarkdownFiles(root) {
  const files = [];

  function visit(directory) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      if (entry.name.startsWith('.')) continue;
      const absolute = path.join(directory, entry.name);
      if (entry.isDirectory()) visit(absolute);
      if (entry.isFile() && entry.name.endsWith('.md')) files.push(absolute);
    }
  }

  visit(root);
  return files.sort();
}

function validateWritingSources(root) {
  const errors = [];
  const files = findMarkdownFiles(root);
  let publicCount = 0;

  for (const filePath of files) {
    const relative = path.relative(process.cwd(), filePath);
    let data;
    try {
      data = readFrontMatter(filePath);
      requireVisibility(data.visibility, relative);
    } catch (error) {
      errors.push(error.message);
      continue;
    }

    const excluded = data.eleventyExcludeFromCollections === true;
    if (isPublic(data.visibility)) publicCount += 1;
    if (isPublic(data.visibility) && excluded) {
      errors.push(
        `[visibility] ${relative}\n` +
        '  public writing must be available to the public writing collection.'
      );
    }
    if (!isPublic(data.visibility) && !excluded) {
      errors.push(
        `[visibility] ${relative}\n` +
        '  unlisted/private writing must set eleventyExcludeFromCollections: true.'
      );
    }
  }

  if (errors.length) throw new Error(`\n${errors.join('\n\n')}\n`);
  return { files, publicCount };
}

module.exports = { findMarkdownFiles, readFrontMatter, validateWritingSources };
