'use strict';

const { requireVisibility, isPrivate } = require('../lib/visibility');

function isArchive(data) {
  return data.page.inputPath === './writing/index.njk';
}

function permalink(data) {
  if (isArchive(data)) {
    return '/writing/index.html';
  }

  const visibility = requireVisibility(data.visibility, data.page.inputPath);
  if (isPrivate(visibility)) return false;
  return `${data.page.filePathStem}/index.html`;
}

module.exports = {
  layout: 'post.njk',
  tags: ['writing'],
  eleventyComputed: { permalink },
};
