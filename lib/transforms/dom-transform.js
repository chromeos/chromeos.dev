/*
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const cheerio = require('cheerio');
const slug = require('uslug');
const path = require('path');
const storedImages = require('../helpers/stored-images');

/**
 * Adds .type--page-nav and .toc__link to TOC links because we can't control the output otherwise.
 *
 * @param {string} content - Content of each file.
 * @param {string} outputPath - Output path of the file
 *
 * @return {string}
 */
function domTransform(content, outputPath) {
  if (path.extname(outputPath) !== '.html') return content;

  const $ = cheerio.load(content);

  /**
   * Add missing classes
   */
  // Add type--page-nav and toc__link classes to TOC links
  $('.toc li').addClass('type--caption');
  $('.toc a').addClass('type--page-nav toc__link');

  // Add link class to Cookie Disclaimer link
  $('#cookieDisclaimer a').addClass('type--link');

  // Add classes to footnotes
  $('.footnotes-list').addClass('type--small');
  $('.footnote-backref').addClass('type--link');
  $('.foornote-item > p').addClass('footnote-item__p');

  // Add message class to messages
  $('[class*="message--"]').addClass('message');

  /**
   * Add IDs to terms
   */
  $('dt').each((i, elem) => $(elem).attr('id', `term--${slug($(elem).text())}`));

  /**
   * Make tables responsive
   */
  $('table').each((_, table) => {
    // get the table headers.
    const headers = $(table)
      .find('thead th')
      .map((_, th) => $(th).text());
    // loop over the all the table rows and assign a data attr to each column
    // with the corresponding column header.
    $(table)
      .find('tbody > tr')
      .each((_, tr) => {
        $(tr)
          .find('td')
          .each((i, td) => {
            $(td).attr('data-header', headers[i]);
          });
      });
  });

  /**
   * Add Blockquote Citation
   */
  $('blockquote').each((i, el) => {
    const next = $(el).next();

    if (next.hasClass('cite')) {
      const cite = $('<footer></footer>').append(
        $(next)
          .clone()
          .removeClass('cite'),
      );
      $(next).remove();
      $(el).append(cite);
    }
  });

  /**
   * Add Header Anchor class
   */
  $('.header-anchor').each((i, el) => {
    const parent = $(el).parent();
    parent.addClass('header-anchor--wrapper');
  });

  /**
   * Add programming language header
   */
  $('pre[class*="language"]').each((i, el) => {
    const lang = $(el)
      .attr('class')
      .split(' ')
      .find(r => r.match(/^language-/))
      .replace('language-', '');

    const title = $(el).attr('title');

    $(el).wrap('<figure class="code-figure"></figure>');
    let codeDescription = lang;
    if (!codeDescription || codeDescription.toLowerCase() == 'unknown') {
      codeDescription = '';
    }
    if (title != null) {
      codeDescription = codeDescription.concat(' - ', `<span class="type--revert">${title}</span>`);
    }
    $(`<figcaption class="code-figure--caption type--label">${codeDescription}</figcaption>`).insertBefore(el);
  });

  /**
   * Images from Google Storage
   */
  $('img[src^="gs://"]').each((i, el) => {
    buildGoogleStorageImage($, el);
  });

  return $.html();
}

// Storage things
const storageBase = 'https://firebasestorage.googleapis.com/v0/b/cros-staging.appspot.com/o/';

/**
 *
 * @param {Cheerio} $ - Cheerio instance
 * @param {Element} el - Cheerio element
 */
function buildGoogleStorageImage($, el) {
  const src = $(el).attr('src');
  const image = storedImages[src];
  const base = src.replace('gs://', '').replace(/\//g, '%2F');
  const url = storageBase + base;
  const newSrc = `${url}.${image.cuts.sort((a, b) => a - b)[Math.round((image.cuts.length - 1) / 2)]}${image.types.filter(t => t.extension !== '.webp')[0].extension}?alt=media`;

  const sources = image.types
    .map(type => {
      let source = `<source sizes="${image.sizes}" type="${type.type}"`;
      source += ` srcset="${image.cuts.map(c => `${url}.${c}${type.extension}?alt=media ${c}w`).join(', ')}"`;
      source += '>';
      return source;
    })
    .join('\n');

  $(el).attr('loading', 'lazy');
  $(el).attr('height', image.height);
  $(el).attr('width', image.width);
  $(el).attr('src', newSrc);
  $(el).wrap('<picture></picture>');
  $(sources).insertBefore(el);
}

module.exports = eleventy => {
  eleventy.addTransform('domTransform', domTransform);
};
