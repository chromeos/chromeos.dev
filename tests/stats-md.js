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
const markdown = require('markdown-it');
const statsPlugin = require('../lib/markdown/stats');

const md = markdown({ html: true, linkify: true }).use(statsPlugin);

test('Single Stat', (t) => {
  const input = '%[123%, This is a test of whats going onWorld]';
  const output = '<p><figure class="stats"><dl class="stats__list"><div class="stats__item"><dt class="stats__stat"><span>123%</span></dt><dd class="stats__desc type--h5">This is a test of whats going onWorld</dd></div></dl></figure></p>\n';

  t.is(md.render(input), output);
});

test('Multiple Stat', (t) => {
  const input = '%[(123%, Hello World), (456%, Bye World)]';
  const output = '<p><figure class="stats"><dl class="stats__list"><div class="stats__item"><dt class="stats__stat"><span>123%</span></dt><dd class="stats__desc type--h5">Hello World</dd></div><div class="stats__item"><dt class="stats__stat"><span>456%</span></dt><dd class="stats__desc type--h5">Bye World</dd></div></dl></figure></p>\n';

  t.is(md.render(input), output);
});

test('Three Stat', (t) => {
  const input = '%[(123%, Hello World), (456%, Bye World), (12%, This is some interesting stuff)]';
  const output = '<p><figure class="stats"><dl class="stats__list"><div class="stats__item"><dt class="stats__stat"><span>123%</span></dt><dd class="stats__desc type--h5">Hello World</dd></div><div class="stats__item"><dt class="stats__stat"><span>456%</span></dt><dd class="stats__desc type--h5">Bye World</dd></div><div class="stats__item"><dt class="stats__stat"><span>12%</span></dt><dd class="stats__desc type--h5">This is some interesting stuff</dd></div></dl></figure></p>\n';

  t.is(md.render(input), output);
});

test('2x Growth', (t) => {
  const input = '%[(55%, Growth in active installations), (2x, Growth in overall activity in app)]';
  const output = '<p><figure class="stats"><dl class="stats__list"><div class="stats__item"><dt class="stats__stat"><span>55%</span></dt><dd class="stats__desc type--h5">Growth in active installations</dd></div><div class="stats__item"><dt class="stats__stat"><span>2x</span></dt><dd class="stats__desc type--h5">Growth in overall activity in app</dd></div></dl></figure></p>\n';

  t.is(md.render(input), output);
});
