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
/* eslint-disable ava/no-skip-test */
// TODO: Fix these tests
// Disabling tests for now because this was super refactored and the tests aren't set up right at the moment

const test = require('ava');
const posthtml = require('posthtml');
const chromeOSWord = require('../../lib/transforms/chromeos-word');

test.beforeEach((t) => {
  const compiler = posthtml().use(chromeOSWord);

  t.context = {
    compiler,
  };
});

test('Base cases', async (t) => {
  const textSamples = ['chromeos', 'chrome-os', 'chrome os', 'chrome  os', 'chrome&nbsp;os', 'chrome–os'].map((t) => `<p>${t}</p>`);

  for (const sample of textSamples) {
    const { html } = await t.context.compiler.process(sample);
    t.is(html, '<p>ChromeOS</p>');
  }
});

test('Anchor cases', async (t) => {
  const tests = [
    {
      input: '<a href="https://www.reddit.com/r/chromeos/">Chrome os is awesome</a>',
      output: '<a href="https://www.reddit.com/r/chromeos/">ChromeOS is awesome</a>',
    },
    {
      input: '<a href="https://stackoverflow.com/questions/tagged/google-chrome-os">chrome-os is awesome</a>',
      output: '<a href="https://stackoverflow.com/questions/tagged/google-chrome-os">ChromeOS is awesome</a>',
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

  for (const sample of tests) {
    const { html } = await t.context.compiler.process(sample.input);
    t.is(html, sample.output);
  }
});

test('Immutable cases', async (t) => {
  const tests = ['<a href="go/google-chromeos">Go url</a>', '<a href="#chromeos-help">Hash url</a>', '<a href="#chromeos">Hash url 2</a>', '<a href="chromeos#help">Hash url3</a>', '<a href="someurl?q=help&w=chromeos">Query param 1</a>', '<a href="help?q=chromeos">Query param 2</a>'];

  for (const sample of tests) {
    const { html } = await t.context.compiler.process(sample);
    t.is(html, sample);
  }
});

test('chromeOS logo case', async (t) => {
  const logo = '<span class="logo__text">chromeOS</span>';

  const { html } = await t.context.compiler.process(logo);
  t.is(html, logo);
});

test('Head tags cases', async (t) => {
  const input = `
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
      <title>Smooth animation on ChromeOS | ChromeOS.dev</title>
      <meta name="Description" content="Get the latest news, stories, resource articles, and case studies for ChromeOS.">
    </head>
    <body>
      <p>Lorem ipsum dolor sit amet adipisicing elit.</p>
    </body>
    </html>`;

  const { html } = await t.context.compiler.process(input);
  t.is(html, expected);
});
