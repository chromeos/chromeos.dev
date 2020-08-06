/**
 * Copyright 2019 Google LLC
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

const test = require('ava');
const cheerio = require('cheerio');
const chromeOsWord = require('../lib/transforms/chrome-os-word');
const EleventyConfig = require('./fixture/eleventy');

/**
 *
 * @param {String} content String to be processed.
 * @return {String}
 */
function buildHtmlResult(content) {
  const $ = cheerio.load(content);
  const hasBody = /<\s*body(\w|\s|=|"|-)*>/gm;

  if (hasBody.test(content)) {
    return $.html();
  }

  return $('body').html();
}

test.beforeEach(t => {
  const eleventyConfig = new EleventyConfig();
  chromeOsWord(eleventyConfig);

  t.context = {
    eleventyConfig,
  };
});

test('Base cases', t => {
  const textSamples = ['chromeos', 'chrome-os', 'chrome os', 'chrome  os', 'chrome&nbsp;os', 'chrome–os'];

  for (const sample of textSamples) {
    t.is(t.context.eleventyConfig.callTransform('chromeOsWord', sample), buildHtmlResult('Chrome&nbsp;OS'));
  }
});

test('Anchor cases', t => {
  const tests = [
    {
      input: '<a href="https://www.reddit.com/r/chromeos/">Chrome os is awesome</a>',
      output: '<a href="https://www.reddit.com/r/chromeos/">Chrome&nbsp;OS is awesome</a>',
    },
    {
      input: '<a href="https://stackoverflow.com/questions/tagged/google-chrome-os">chrome-os is awesome</a>',
      output: '<a href="https://stackoverflow.com/questions/tagged/google-chrome-os">Chrome&nbsp;OS is awesome</a>',
    },
    {
      input: '<a href="https://www.reddit.com/r/chromeos/">https://www.reddit.com/r/chromeos/</a>',
      output: '<a href="https://www.reddit.com/r/chromeos/">https://www.reddit.com/r/chromeos/</a>',
    },
    {
      input: '<a href="https://stackoverflow.com/questions/tagged/google-chrome-os">https://stackoverflow.com/questions/tagged/google-chrome-os</a>',
      output: '<a href="https://stackoverflow.com/questions/tagged/google-chrome-os">https://stackoverflow.com/questions/tagged/google-chrome-os</a>',
    },
  ];

  for (const test of tests) {
    t.is(t.context.eleventyConfig.callTransform('chromeOsWord', test.input), buildHtmlResult(test.output));
  }
});

test('Immutable cases', t => {
  const immutableSamples = ['<a href ="go/google-chromeos">Go url</a>', '<a href="#chromeos-help">Hash url</a>', '<a href="#chromeos">Hash url 2</a>', '<a href="chromeos#help">Hash url3</a>', '<a href="someurl?q=help&w=chromeos">Query param 1</a>', '<a href="help?q=chromeos">Query param 2</a>'];

  for (const sample of immutableSamples) {
    t.is(t.context.eleventyConfig.callTransform('chromeOsWord', sample), buildHtmlResult(sample));
  }
});

test('chromeOS logo case', t => {
  const logo = '<span class="logo__text">chromeOS</span>';

  t.is(t.context.eleventyConfig.callTransform('chromeOsWord', logo), buildHtmlResult(logo));
});

test('Head tags cases', t => {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <title>Smooth animation on chrome OS | ChromeOS.dev</title>
      <meta name="Description" content="Get the latest news, stories, resource articles, and case studies for chrome os." />
    </head>
    <body>
      <p>Lorem ipsum dolor sit amet adipisicing elit.</p>
    </body>
    </html>`;

  const expected = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <title>Smooth animation on Chrome OS | ChromeOS.dev</title>
      <meta name="Description" content="Get the latest news, stories, resource articles, and case studies for Chrome OS." />
    </head>
    <body>
      <p>Lorem ipsum dolor sit amet adipisicing elit.</p>
    </body>
    </html>`;

  t.is(t.context.eleventyConfig.callTransform('chromeOsWord', html), buildHtmlResult(expected));
});
