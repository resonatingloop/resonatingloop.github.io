'use strict';

const fs = require('node:fs');
const path = require('node:path');

const repo = path.resolve(__dirname, '..');
const output = path.join(repo, '_site');

if (path.dirname(output) !== repo || path.basename(output) !== '_site') {
  throw new Error(`refusing to clean unexpected output path: ${output}`);
}

fs.rmSync(output, { recursive: true, force: true });
