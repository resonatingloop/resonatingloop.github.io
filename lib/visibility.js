'use strict';
/* =========================================================================
   THE VISIBILITY RULEBOOK — single source of truth.
   -------------------------------------------------------------------------
   Read this one file and you know every rule that governs who can see a post.

   Three values:
     public    → appears in nav, the archive, and (later) rss/sitemap/search.
     unlisted  → builds a normal route, reachable by direct URL, but excluded
                 from nav/archive/rss/sitemap/search and marked noindex,nofollow.
     private   → never in the production build at all.

   FAIL CLOSED: a post that does not explicitly and correctly declare its
   visibility STOPS THE BUILD. We never default to public. The one outcome we
   make structurally impossible is "forgot or mistyped the tag → leaked."
   ========================================================================= */

const VALID = new Set(['public', 'unlisted', 'private']);

/* Validate a post's visibility. Throws (hard-fail the build) on anything that
   isn't exactly one of the three values — including undefined and typos. */
function requireVisibility(value, inputPath) {
  if (typeof value !== 'string' || !VALID.has(value)) {
    throw new Error(
      `\n[visibility] ${inputPath || '(unknown file)'}\n` +
      `  visibility must be exactly one of: ${[...VALID].join(', ')}\n` +
      `  got: ${JSON.stringify(value)}\n` +
      `  Every writing post must declare its visibility explicitly in frontmatter.\n`
    );
  }
  return value;
}

const isPublic   = (v) => v === 'public';
const isUnlisted = (v) => v === 'unlisted';
const isPrivate  = (v) => v === 'private';

module.exports = { VALID, requireVisibility, isPublic, isUnlisted, isPrivate };
