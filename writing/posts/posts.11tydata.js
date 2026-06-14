'use strict';
/* =========================================================================
   THE VISIBILITY CHOKEPOINT.
   -------------------------------------------------------------------------
   Folder data applied to EVERY post in writing/posts/. Everything that
   decides a post's reach is computed here, from the single rulebook in
   lib/visibility.js. To audit visibility behavior, you only need to read
   these two files.
   ========================================================================= */

const { requireVisibility, isPublic, isPrivate } = require('../../lib/visibility');

module.exports = {
  layout: 'post.njk',
  tags: ['writing'],   // intent only — non-public posts are pulled back out below

  eleventyComputed: {
    // 1) VALIDATE every post up front. Missing or mistyped visibility THROWS
    //    here and stops the whole build (fail closed; never defaults public).
    visibility: (data) => requireVisibility(data.visibility, data.page.inputPath),

    // 2) PRIVATE → no output file at all. Belt-and-suspenders: private posts
    //    normally live in the ignored _drafts/ folder and never reach here,
    //    but if one ever does, permalink:false means it is not written to _site.
    permalink: (data) => {
      const v = requireVisibility(data.visibility, data.page.inputPath);
      if (isPrivate(v)) return false;
      return data.permalink;            // else 11ty's default route
    },

    // 3) THE ONE MOVE: keep every non-public post out of ALL collections.
    //    Collections feed nav, the archive, and (later) rss/sitemap/search —
    //    so excluding here excludes from every one of them at once.
    //    => collections.writing is public-only BY CONSTRUCTION.
    eleventyExcludeFromCollections: (data) => {
      const v = requireVisibility(data.visibility, data.page.inputPath);
      return !isPublic(v);              // public → in collections; unlisted/private → out
    },
  },
};
