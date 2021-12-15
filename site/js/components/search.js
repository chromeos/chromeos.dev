/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { getData } from '../lib/data';
import { preferences } from 'service-worker-i18n-redirect/preferences';

/**
 * Functionality for a search page.
 */
export class Search {
  /**
   * Search and display search results.
   * @param {HTMLElement} element - Search results wrapper
   * @param {string} locale - The search locale.
   */
  constructor(element, locale) {
    const constants = {
      searchUrl: '/search',
      results: '.search-results__docs',
      summary: '.search-results__summary',

      errorAttr: 'error',
      resultsAttr: 'results',
      loader: '.search-results__loader',
      loaderClass: 'search-results__loader-active',
      searchBox: '.search-results__search-box',
      offline: '.search-results__offline',
      offlineToggle: '.search-results__offline .switch__input',
      pagination: '.pagination__wrapper',
      queryParam: 'q',
      fieldParam: 'field',
      paginationActive: 'pagination__active',
      paginationLink: 'pagination__link',
      paginationEnd: 'pagination__end',
      paginationElipsis: 'pagination__ellipsis',
      page: 'page',
    };

    this.constants_ = Object.freeze(constants);
    this.searchResults_ = element.querySelector(this.constants_.results);
    this.searchSummary_ = element.querySelector(this.constants_.summary);
    this.searchBox_ = element.querySelector(this.constants_.searchBox);
    this.loader_ = element.querySelector(this.constants_.loader);
    this.offline_ = element.querySelector(this.constants_.offline);
    this.offlineToggle_ = element.querySelector(this.constants_.offlineToggle);
    this.offlineSearch_ = false;
    this.currentResults_ = false;
    this.pagination_ = element.querySelector(this.constants_.pagination);

    this.locale_ = locale;
    getData('search', locale).then(data => (this.data_ = data));
    getData('microcopy', locale).then(data => (this.microcopy_ = data));

    this.query_ = this.getQuery_(window.location.search, this.constants_.queryParam);
    this.field_ = this.getQuery_(window.location.search, this.constants_.fieldParam);
    this.page_ = this.getQuery_(window.location.search, this.constants_.page) ? this.getQuery_(window.location.search, this.constants_.page) : 0;

    this.offlineToggle_.addEventListener('click', e => {
      this.manageOfflineSearch_(e.target.checked);
    });
    window.addEventListener('offline', this.handleOffline_.bind(this));
    window.addEventListener('online', this.handleOffline_.bind(this));

    if (this.query_) {
      this.handleLoaderVisibility_();
    }

    this.init();

    this.searchBox_.addEventListener('submit', this.handleSubmit_.bind(this));

    window.addEventListener('popstate', e => {
      const params = new URLSearchParams(window.location.search);
      this.inlineSearch(params);
    });
  }

  /**
   * Allow for inline search when user is on the search page.
   * @param {Event} e - submit event
   */
  handleSubmit_(e) {
    e.preventDefault();
    let form;
    if (e.type == 'click') {
      form = new URLSearchParams();
      form.append('page', e.currentTarget.attributes.getNamedItem('data-value').value);
      form.append('q', e.currentTarget.attributes.getNamedItem('data-query').value);
      form.append('locale', e.currentTarget.attributes.getNamedItem('data-locale').value);
    } else {
      form = new URLSearchParams(new FormData(e.target));
      e.target.reset();
    }
    window.history.pushState('', '', `?${form.toString()}`);
    this.inlineSearch(form);
    window.scrollTo(0, 0);
  }

  /**
   * Offline search initialization, needed for setting everything up when offline.
   */
  async init() {
    const enable = await preferences.get('offline-search');
    this.offlineToggle_.checked = enable;
    this.offlineSearch_ = enable;
    this.handleOffline_();
    await this.manageOfflineSearch_(enable);

    if (this.query_) {
      try {
        const results = await this.search_();
        this.addSearchResults_(results);
      } catch (e) {
        this.showError_();
      }
    }
  }

  /**
   * Allow for inline search when user is on the search page.
   * @param {URLSearchParams} query - Search query
   *
   */
  async inlineSearch(query) {
    this.handleLoaderVisibility_();
    this.query_ = query.get('q');
    this.locale_ = query.get('locale');
    this.field_ = query.get('field');
    this.page_ = query.get('page');

    try {
      const results = await this.search_();
      this.addSearchResults_(results);
    } catch (e) {
      this.showError_();
    }
  }

  /**
   * Set up offline search
   * @param {boolean} enable - Whether to enable or disable offline search
   */
  async manageOfflineSearch_(enable) {
    if (enable) {
      const { wrap: wrapWorker } = await import('comlink');
      const { default: SearchWorker } = await import('/js/search-worker.js?worker');
      const { preferences } = await import('service-worker-i18n-redirect/preferences');
      const language = await preferences.get('lang');

      const worker = wrapWorker(new SearchWorker());
      const OfflineSearch = worker.OfflineSearch;
      const search = await new OfflineSearch(language);
      this.offlineSearch_ = search;
      preferences.set('offline-search', true);
    } else {
      this.offlineSearch_ = false;
      preferences.set('offline-search', false);
    }
  }

  /**
   * Handle connectivity changes
   * @return {boolean} - Whether the user is online or not
   */
  handleOffline_() {
    if (navigator && !navigator.onLine) {
      if (this.offlineSearch_ === false) {
        this.searchBox_.style.display = 'none';
        this.searchSummary_.innerHTML = `<p class="type--h2">${this.data_.offline.unavailable}</p>`;
      }

      if (this.currentResults_) {
        this.addSearchResults_(this.currentResults_);
      }
      this.offline_.style.display = 'none';
      return false;
    }

    this.searchBox_.style.display = 'block';
    this.offline_.style.display = 'flex';
    this.searchSummary_.innerHTML = '';
    if (this.currentResults_) {
      this.addSearchResults_(this.currentResults_);
    }
    return true;
  }

  /**
   * Handles the loader.
   * @private
   */
  handleLoaderVisibility_() {
    if (this.loader_) {
      this.loader_.classList.toggle(this.constants_.loaderClass);
    }
  }

  /**
   * @param {string} queryString params to the search page.
   * @param {string} param params to the search page.
   * @return {string} the search query.
   * @private
   */
  getQuery_(queryString, param) {
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
  }

  /**
   * Calls the search endpoint.
   * @return {Promise} searchResults.
   * @private
   */
  async search_() {
    if (!this.query_) return;
    this.handleLoaderVisibility_();

    if (navigator && navigator.onLine) {
      const data = new FormData();
      if (this.query_) {
        data.append(this.constants_.queryParam, this.query_);
      }
      if (this.field_) {
        data.append(this.constants_.fieldParam, this.field_);
      }
      if (this.locale_) {
        data.append('locale', this.locale_);
      }

      if (this.page_) {
        data.append('page', this.page_);
      }

      const query = [...data.entries()].map(e => `${encodeURIComponent(e[0])}=${encodeURIComponent(e[1])}`).join('&');
      const response = await fetch(`${this.constants_.searchUrl}?${query}`);
      if (!response.ok) {
        if (this.offlineSearch_) {
          return await this.offlineSearch_.search({ q: this.query_, locale: this.locale_, field: this.field_, p: this.page_ });
        }

        throw new Error();
      }
      return response.json();
    } else {
      return await this.offlineSearch_.search({ q: this.query_, locale: this.locale_, field: this.field_, p: this.page_ });
    }
  }

  /**
   * Displays search error.
   *
   * @private
   */
  showError_() {
    this.handleLoaderVisibility_();
    this.searchSummary_.innerHTML = `<p class="type--h2 ">${this.data_.error}</p>`;
  }
  /**
   * Adds the search results.
   * It's useful, when working with offline styles, to set `available = result.offline;` to allow for CSS injection that otherwise doesn't work when you actually go offline.
   * @param {Array} searchResults - To be displayed
   * @private
   */
  addSearchResults_(searchResults) {
    let results = '';
    this.handleLoaderVisibility_();
    this.currentResults_ = searchResults;
    const resultsText = this.data_.results.replace('((d))', searchResults.pagination.items).replace('((t))', `<span class="search-results__query">${this.query_.replace(/[^\w. ]/gi, c => `&#${c.charCodeAt(0)};`)}</span>`);
    this.searchSummary_.innerHTML = `<p class="type--h2">${resultsText}</p>`;
    if (searchResults.data.length > 0) {
      for (let i = 0; i < searchResults.data.length; i++) {
        const result = searchResults.data[i];

        const available = (navigator && navigator.onLine) || result.offline;

        const vars = {
          wrapper: available ? 'a' : 'div',
          class: available ? '' : 'card--disabled',
          icon: available ? 'arrow-forward' : 'cloud-off',
          message: available ? '' : this.data_.offline.result,
        };

        results += `<${vars.wrapper} href="${result.href}" class="card card__search type--base card--rounded ${vars.class}"><article class="card__container"><header  class="card__title"><small class="card__eyebrow type--eyebrow">${result.section}</small><h4 class="type--h4">${result.title}</h4></header><p class="card__body">${result.metadesc}</p><footer class="card__footer">`;

        if (result.tags && result.tags.length > 0) {
          results += this.getTagsSection(result.tags);
        }

        if (vars.message) {
          results += `<span class="card__message"><span class="card__message-body">${vars.message}</span>`;
        }

        results += `<span class="card__icon" aria-hidden="true"><svg role="img" aria-hidden="true" class="icon "><use href="/images/icons/sprite.svg#${vars.icon}"></use></svg></span>`;

        if (vars.message) {
          results += `</span>`;
        }

        results += `</footer></article></${vars.wrapper}>`;
      }
      this.searchResults_.innerHTML = results;
      this.getPagination_();
    } else {
      this.searchResults_.innerHTML = '';
      this.pagination_.innerHTML = '';
    }
  }

  /**
   * @param {Array} tags
   * @return {string} - The tags section for a search result.
   * @private
   */
  getTagsSection(tags) {
    let section = `<section class="topics">
      <h5 class="topics__label type--label">${this.microcopy_.topics}:</h5>
  <ul class="topics__list">`;
    for (let i = 0; i < tags.length; i++) {
      section += `<li class="topics__item type--small">${tags[i]}`;
      if (i !== tags.length - 1) {
        section += ',';
      }
      section += '</li>';
    }
    section += `</ul></section>`;

    return section;
  }

  /**
   * @private
   */
  getPagination_() {
    this.pagination_.innerHTML = '';
    const numPages = parseInt(this.currentResults_.pagination.pages);
    const page = parseInt(this.page_);

    if (numPages > 1) {
      if (page != 0) {
        this.pagination_.appendChild(this.getPaginationButton(page - 1, this.getPrevButtonText(), this.constants_.paginationEnd, this.data_.pagination.prev));
      }

      if (numPages <= 5 || this.page_ <= 2) {
        for (let i = 0; i < Math.min(numPages, 5); i++) {
          if (this.page_ == i) {
            this.pagination_.appendChild(this.getPaginationButton(i, i + 1, this.constants_.paginationActive, this.data_.pagination.page.replace('((n))', i + 1)));
          } else {
            this.pagination_.appendChild(this.getPaginationButton(i, i + 1, this.constants_.paginationLink, this.data_.pagination.page.replace('((n))', i + 1)));
          }
        }
      } else {
        this.getShrunkenPagination(page, numPages);
      }

      if (page != numPages - 1) {
        this.pagination_.appendChild(this.getPaginationButton(page + 1, this.getNextButtonText(), this.constants_.paginationEnd, this.data_.pagination.next));
      }
    }
  }
  /**
   * @param {Number} page
   * @param {Number} numPages
   */
  getShrunkenPagination(page, numPages) {
    this.pagination_.appendChild(this.getPaginationButton(0, '1', this.constants_.paginationLink, this.data_.pagination.page.replace('((n))', '1')));
    const elipsis = document.createElement('span');
    elipsis.classList.add(this.constants_.paginationElipsis);
    elipsis.innerText = '…';
    this.pagination_.appendChild(elipsis);

    const lastPages = [];
    if (page + 3 <= numPages) {
      for (let i = 0; i < 3; i++) {
        const display = page + i + 1;
        lastPages.push({
          pageNumber: page + i,
          display,
          class: i == 0 ? this.constants_.paginationActive : this.constants_.paginationLink,
          aria: this.data_.pagination.page.replace('((n))', display),
        });
      }
    } else if (page + 1 == numPages) {
      for (let i = 2; i > -1; i--) {
        console.log('display' + (page + 1 - 1 * i));
        lastPages.push({
          pageNumber: page - i,
          display: page + 1 - i,
          class: i == 0 ? this.constants_.paginationActive : this.constants_.paginationLink,
          aria: this.data_.pagination.page.replace('((n))', page - i),
        });
      }
    } else {
      for (let i = 0; i < 3; i++) {
        lastPages.push({
          pageNumber: page - 1 + i,
          display: page + i,
          class: i == 1 ? this.constants_.paginationActive : this.constants_.paginationLink,
          aria: this.data_.pagination.page.replace('((n))', page - 1 + i),
        });
      }
    }

    lastPages.map(p => this.getPaginationButton(p.pageNumber, p.display, p.class, p.aria)).forEach(link => this.pagination_.appendChild(link));
  }

  /**
   * @param {Number} pageNumber
   * @param {string} display
   * @param {string} classModifier
   * @param {string} ariaLabel
   *@return {HTMLElement}
   */
  getPaginationButton(pageNumber, display, classModifier, ariaLabel) {
    const pageButton = document.createElement('a');
    pageButton.setAttribute('data-value', pageNumber);
    pageButton.setAttribute('data-locale', this.locale_);
    pageButton.setAttribute('data-query', this.query_);
    pageButton.setAttribute('aria-label', ariaLabel);

    if (this.field_) {
      pageButton.setAttribute('data-field', this.field_);
    }

    pageButton.innerHTML = display;
    pageButton.classList.add(classModifier);

    pageButton.addEventListener('click', this.handleSubmit_.bind(this));
    return pageButton;
  }

  /**
   *@return {string}
   */
  getPrevButtonText() {
    return `<svg role="img" aria-hidden="true" class="icon pagination__icon">
    <use xlink:href="/images/icons/sprite.svg#chevron-left"></use></svg>`;
  }

  /**
   *@return {string}
   */
  getNextButtonText() {
    return `<svg role="img" aria-hidden="true" class="icon pagination__icon">
    <use xlink:href="/images/icons/sprite.svg#chevron-right"></use></svg>`;
  }
}
