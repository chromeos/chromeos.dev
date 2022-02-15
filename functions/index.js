const functions = require('firebase-functions');
const lunr = require('lunr');
const ISO6391 = require('iso-639-1');
const fs = require('fs');
const path = require('path');

const dataCache = {};
const previewCache = {};
const PAGE_SIZE = 10;

exports.search = functions.https.onRequest((request, response) => {
  let query = request.query.q.replace(':', '\\:');
  let locale = request.query.locale;

  if (!ISO6391.validate(locale)) {
    locale = 'en';
  }

  if (request.query.field) {
    query = `${request.query.field}:${query}`;
  }

  try {
    const idx = lunr.Index.load(getIndexData(locale));
    const results = idx.search(query);
    const previewData = getPreviewData(locale);
    const searchResults = results.map((r) => previewData[r.ref]);
    let page = request.query.page;
    if (!page) page = 0;
    const returnResult = paginate(searchResults, page, PAGE_SIZE);
    response.status(200).json(returnResult);
  } catch (error) {
    response.status(500).send(error);
  }
});

/**
 *
 * @param {Array} searchResults
 * @param {Number} page
 * @param {Number} pageSize
 * @return {Object} - Search results paginated
 */
function paginate(searchResults, page, pageSize) {
  const result = {};
  if (searchResults.length > pageSize) {
    const start = page * pageSize;
    const end = start + pageSize;
    result.data = searchResults.slice(start, end);
  } else {
    result.data = searchResults;
  }

  result.pagination = {
    items: searchResults.length,
    pages: Math.ceil(searchResults.length / pageSize),
  };
  return result;
}

/**
 *
 * @param {string} locale - The locale the search is in.
 * @return {object} - The previews info mapped by href.
 */
function getPreviewData(locale) {
  if (previewCache[locale]) return previewCache[locale];

  const previewFileName = `preview-${locale}.json`;
  const previewData = JSON.parse(fs.readFileSync(path.join(__dirname, 'indexes', previewFileName), 'utf-8'));
  previewCache[locale] = previewData;
  return previewData;
}

/**
 *
 * @param {string} locale - The locale the search is in.
 * @return {object} - JSON data from a precomputed index for lunr.
 */
function getIndexData(locale) {
  if (dataCache[locale]) return dataCache[locale];

  const indexFileName = `index-${locale}.json`;
  const lnrData = JSON.parse(fs.readFileSync(path.join(__dirname, 'indexes', indexFileName), 'utf-8'));

  dataCache[locale] = lnrData;

  return lnrData;
}
