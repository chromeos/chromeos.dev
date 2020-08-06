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
 * @param {String} content Content of each file.
 * @return {String}
 */
function chromeOsWord(content) {
  const $ = cheerio.load(content);
  const chromeOsRegex = /(?<![/\-–#?=.])\bchrome([\s\-–]|&#?[0-9a-z]+?;)*os\b(?![/\-–#?=.]\b)/gi;

  $('head').html(String($('head').html()).replace(chromeOsRegex, 'Chrome OS'));
  $('body').html(String($('body').html()).replace(chromeOsRegex, 'Chrome&nbsp;OS'));
  $('.logo__text').text('chromeOS');

  const hasBody = /<\s*body(\w|\s|=|"|-)*>/gm;

  if (hasBody.test(content)) {
    return $.html();
  }

  return $('body').html();
}

module.exports = eleventy => {
  eleventy.addTransform('chromeOsWord', chromeOsWord);
};
