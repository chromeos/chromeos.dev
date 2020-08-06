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

/**
 *
 * @param {string} id - Icon ID
 * @param {string} modifier - Icon modifier to be used, defaults to false
 * @return {string}
 */
function icon(id, modifier = false) {
  return `<span class="icon--container">&#8288;<svg role="img" aria-hidden="true" class="icon ${modifier ? 'icon--' + modifier : ''}">
  <use xlink:href="/images/icons/sprite.svg#${id}"></use>
</svg></span>`;
}

/**
 * Adds .type--page-nav and .toc__link to TOC links because we can't control the output otherwise.
 *
 * @param {string} content - Content of each file.
 * @param {string} outputPath - Output path of the file
 *
 * @return {string}
 */
function iconTransform(content, outputPath) {
  const $ = cheerio.load(content);

  // Get all links with no classes
  $('a').each((i, elem) => {
    const classes = $(elem).attr('class')
      ? $(elem)
          .attr('class')
          .split(' ')
      : [];
    const href = $(elem).attr('href');
    const external = RegExp('^https?://').test(href);

    const types = {
      link: classes.length === 0 || classes.includes('type--link') || classes.includes('type--page-nav'),
      ctaLink: classes.includes('cta--link'),
      ctaBack: classes.includes('cta--back'),
    };

    // Normal links
    if (types.link && external) {
      $(elem).append(icon('open-in-new', 'inline-external'));
    }

    // CTA links
    if (types.ctaLink) {
      $(elem).addClass('cta--right-icon');
      if (external) {
        $(elem).append(icon('arrow-forward', 'external'));
      } else {
        $(elem).append(icon('arrow-forward'));
      }
    }

    // CTA back
    if (types.ctaBack) {
      $(elem).addClass('cta--left-icon');
      $(elem).prepend(icon('arrow-back'));
    }
  });

  return $.html();
}

module.exports = eleventy => {
  eleventy.addTransform('icons', iconTransform);
};
