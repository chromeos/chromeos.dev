import lunr from 'lunr';
import { preferences } from 'service-worker-i18n-redirect/preferences';
import { expose } from 'comlink';

const PAGE_SIZE = 10;
/**
 * Offline Search
 */
class OfflineSearch {
  /**
   * Construct new Offline Search
   * @param {string} locale - Locale string
   */
  constructor(locale) {
    this.cache_ = {
      index: {},
      preview: {},
    };

    this.init(locale);
  }
  /**
   * Initialization of passed in locale
   * @param {string} locale - Locale string
   */
  async init(locale) {
    this.storage_ = await caches.open('pages-cache');
    this.locale_ = locale || (await preferences.get('lang'));
    this.getData(this.locale_);
  }

  /**
   * Memoization cache function for getting data.
   * @param {string} locale - Locale string
   */
  async getData(locale) {
    const language = locale || this.locale_;
    // We can test just the one because we're going to put both in at once
    // Also want to do Promise.all instead of individual requests so they can be run in parallel
    if (!(language in this.cache_.index)) {
      const files = await Promise.all([`/js/indexes/index-${language}.json`, `/js/indexes/preview-${language}.json`].map((f) => fetch(f).then((r) => r.json())));
      this.cache_.index[language] = files[0];
      this.cache_.preview[language] = files[1];
    }

    return {
      index: this.cache_.index[language],
      preview: this.cache_.preview[language],
    };
  }

  /**
   *
   * @param {Array} searchResults
   * @param {Number} page
   * @param {Number} pageSize
   * @return {Object} - Search results paginated
   */
  paginate(searchResults, page, pageSize) {
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
   * A search result
   * @typedef {object} SearchResult
   *
   * @property {string} title - Title of search result
   * @property {string} href - Absolute-path URL of search result
   * @property {string} metadesc - Meta description of search result
   * @property {string} section - Section search result resides in
   * @property {string[]} tags - Relevant tags for the search results
   * @property {boolean} offline - Whether the search result is available offline
   */

  /**
   * @param {object} query - Query object
   * @param {string} query.q - Query term
   * @param {string} query.[locale] - Locale for the search
   * @param {string} query.[field] - Field to search on
   * @param {string} query.[p] - The current page of results
   * @return {SearchResult[]} - Object
   */
  async search({ q, locale, field, p }) {
    const language = locale || this.locale_;

    const data = await this.getData(language);

    let query = q.replace(/:/g, ' ');
    if (field) {
      query = `+${query.field}:${query}`;
    }

    const idx = lunr.Index.load(data.index);
    const results = await Promise.all(
      idx.search(query).map(async (r) => {
        const preview = data.preview[r.ref];
        preview.offline = (await this.storage_.match(preview.href)) ? true : false;
        return preview;
      }),
    );

    return this.paginate(results, p, PAGE_SIZE);
  }
}

expose({
  OfflineSearch,
});
