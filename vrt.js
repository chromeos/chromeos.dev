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
/* eslint-env node */
const backstop = require('backstopjs');
const handler = require('serve-handler');
const http = require('http');

const port = 5060;

/**
 *
 * @param {string} pth - URL sub-path from /en/
 * @return {string} Full URL string
 */
function testURL(pth) {
  return `http://localhost:${port}/en/${pth}`;
}

const scenarios = [
  {
    label: 'Typography',
    url: 'typography',
  },
  {
    label: 'Tools',
    url: 'components/tools',
  },
  {
    label: 'Switch',
    url: 'components/switch',
  },
  {
    label: 'Statistics',
    url: 'components/stats',
  },
  {
    label: 'Item Grid',
    url: 'components/item-grid',
  },
  {
    label: 'Image Card',
    url: 'components/image-card',
  },
  {
    label: 'Icon Card',
    url: 'components/icon-card',
  },
  {
    label: 'Hero',
    url: 'components/hero',
  },
  {
    label: 'Hero Full Bleed',
    url: 'components/hero-full-bleed',
  },
  {
    label: 'Hero CTA',
    url: 'components/hero--cta',
  },
  {
    label: 'Form Component',
    url: 'components/form',
  },
  {
    label: 'Footnotes',
    url: 'components/footnotes',
  },
  {
    label: 'Footnote',
    url: 'components/footnote',
  },
  {
    label: 'Featured Content',
    url: 'components/featured-content',
  },
  {
    label: 'Date Time',
    url: 'components/date-time',
  },
  {
    label: 'Card',
    url: 'components/card',
  },
  {
    label: 'Card Subnav',
    url: 'components/card-subnav',
  },
  {
    label: 'Card Stats',
    url: 'components/card-stats',
  },
  {
    label: 'Call Out',
    url: 'components/call-out',
  },
  {
    label: 'Date and Authors',
    url: 'components/authors-list',
  },
  {
    label: 'Article Footer',
    url: 'components/article-footer',
  },
  {
    label: 'App Info',
    url: 'components/app-info',
  },
].map(s => {
  const scenario = s;
  scenario.label = `Style Guide - ${s.label}`;
  scenario.url = testURL(`style-guide/${s.url}`);
  scenario.delay = s.delay || 500;
  scenario.misMatchThreshold = s.misMatchThreshold || 0.1;
  scenario.requireSameDimensions = s.requireSameDimensions || true;

  return scenario;
});

const config = {
  id: 'backstop_default',
  viewports: [
    {
      label: 'small',
      width: 320,
      height: 480,
    },
    {
      label: 'medium',
      width: 760,
      height: 520,
    },
    {
      label: 'large',
      width: 1024,
      height: 768,
    },
    {
      label: 'extra-large',
      width: 1440,
      height: 900,
    },
  ],
  scenarios,
  paths: {
    bitmaps_reference: '.backstop/references',
    bitmaps_test: '.backstop/tests',
    engine_scripts: '.backstop/scripts',
    html_report: '.backstop/html-report',
    ci_report: '.backstop/ci-report',
  },
  report: ['CI'],
  engine: 'puppeteer',
  engineOptions: {
    args: ['--no-sandbox'],
  },
  asyncCaptureLimit: 5,
  asyncCompareLimit: 50,
  debug: false,
  debugWindow: false,
};

const server = http.createServer((req, res) =>
  handler(req, res, {
    public: 'public',
    cleanUrls: true,
    trailingSlash: false,
  }),
);

server.listen(port, () => {
  console.log('Serving public directory');
  backstop(process.argv[2] || 'test', { config })
    .then(() => {
      console.log('Success');
      server.close();
    })
    .catch(e => {
      console.log('Error');
      console.error(e);
      server.close();
    });
});
