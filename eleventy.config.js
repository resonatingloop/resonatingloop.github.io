'use strict';
/* =========================================================================
   Eleventy build — boring on purpose.
   -------------------------------------------------------------------------
   · The hand-built plate (index.html / style.css / main.js) is passthrough:
     never templated, never touched.
   · Private drafts in _drafts/ are IGNORED at the input level — the build
     cannot see them at all, independent of any frontmatter. (They are also
     .gitignore'd so the public repo can't leak their source.)
   · ALL visibility filtering lives in lib/visibility.js and the folder data
     file writing/posts/posts.11tydata.js. Audit those two.
   ========================================================================= */

module.exports = function (eleventyConfig) {
  // the plate, verbatim
  eleventyConfig.addPassthroughCopy('index.html');
  eleventyConfig.addPassthroughCopy('style.css');
  eleventyConfig.addPassthroughCopy('main.js');

  // PRIVATE: the build literally cannot see this folder.
  eleventyConfig.ignores.add('_drafts/**');
  // don't template the project README as a page
  eleventyConfig.ignores.add('README.md');

  return {
    dir: { input: '.', includes: '_includes', output: '_site' },
    // .html is NOT a template format → index.html is only ever passthrough-copied
    templateFormats: ['njk', 'md'],
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
  };
};
