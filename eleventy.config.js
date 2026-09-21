'use strict';
const path = require('node:path');
const { validateWritingSources } = require('./lib/writing-metadata');
/* =========================================================================
   Eleventy build — boring on purpose.
   -------------------------------------------------------------------------
   · The plate is composed by index.njk while style.css and main.js remain
     passthrough assets.
   · Private drafts in _drafts/ are IGNORED at the input level — the build
     cannot see them at all, independent of any frontmatter. (They are also
     .gitignore'd so the public repo can't leak their source.)
   · Visibility values live in lib/visibility.js; source validation and
     collection exclusion live in lib/writing-metadata.js and
     writing/writing.11tydata.js. Audit those three.
   ========================================================================= */

module.exports = function (eleventyConfig) {
  // Validate the writing boundary before Eleventy considers output paths.
  const writing = validateWritingSources(path.join(__dirname, 'writing'));

  // Static parts of the plate; index.njk is intentionally templated so the
  // writing signal can appear only when the public collection is non-empty.
  eleventyConfig.addPassthroughCopy('favicon.svg');
  eleventyConfig.addPassthroughCopy('style.css');
  eleventyConfig.addPassthroughCopy('main.js');

  // PRIVATE: the build literally cannot see this folder.
  eleventyConfig.ignores.add('_drafts/**');
  // don't template the project README as a page
  eleventyConfig.ignores.add('README.md');
  eleventyConfig.ignores.add('AGENTS.md');
  eleventyConfig.ignores.add('STATUS.md');
  eleventyConfig.ignores.add('specs/**');
  eleventyConfig.ignores.add('tests/**');
  if (writing.publicCount === 0) eleventyConfig.ignores.add('writing/index.njk');

  return {
    dir: { input: '.', includes: '_includes', output: '_site' },
    // .html is NOT a template format → index.html is only ever passthrough-copied
    templateFormats: ['njk', 'md'],
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
  };
};
