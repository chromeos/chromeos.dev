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
const through = require('through2');
const path = require('path');
const PluginError = require('plugin-error');
const Vinyl = require('vinyl');
const lunr = require('lunr');
const s = require('string');
const fm = require('front-matter');
const { getSection, getUrlFromPath } = require('../helpers/url');

module.exports = function(options) {
  const buffer = [];
  let firstFile;
  const locale = options.locale;

  // Lunr and through require use of `this`, so need to disable linting for these items.
  /* eslint-disable no-invalid-this */

  return through.obj(
    function(file, enc, cb) {
      let pageIndex;

      if (file.isStream()) {
        this.emit('error', new PluginError('lunr-index', 'Streaming not supported'));
        return cb();
      }

      if (file.path.includes('style-guide')) {
        return cb();
      }

      if (!firstFile) {
        firstFile = file;
      }

      try {
        const { attributes, body } = fm(file.contents.toString());

        pageIndex = {
          title: attributes.title,
          tags: attributes.tags,
          metadesc: attributes.metadesc,
          href: getUrlFromPath(file.path),
          section: getSection(getUrlFromPath(file.path)),
          content: s(body)
            .stripTags()
            .stripPunctuation().s,
        };
      } catch (err) {
        this.emit('error', new PluginError('lunr-index', err));
        return cb();
      }
      if (pageIndex) {
        buffer.push(pageIndex);
      }
      cb();
    },
    function(cb) {
      if (!firstFile) {
        return cb();
      }

      const idx = lunr(function() {
        this.ref('href');
        this.field('title');
        this.field('content');
        this.field('tags');

        buffer.forEach(function(doc) {
          this.add(doc);
        }, this);
      });

      const previews = {};
      buffer.forEach(function(doc) {
        previews[doc.href] = {
          title: doc.title,
          tags: doc.tags,
          metadesc: doc.metadesc,
          section: doc.section,
          href: doc.href,
        };
      });

      const indexFile = new Vinyl({
        base: firstFile.base,
        cwd: firstFile.cwd,
        path: path.join(firstFile.base, `index-${locale}.json`),
        /* eslint new-cap: [1, {"newIsCapExceptions": ["Buffer.from"]}]*/
        contents: new Buffer.from(JSON.stringify(idx)),
      });
      const previewsFile = new Vinyl({
        base: firstFile.base,
        cwd: firstFile.cwd,
        path: path.join(firstFile.base, `preview-${locale}.json`),
        /* eslint new-cap: [1, {"newIsCapExceptions": ["Buffer.from"]}]*/
        contents: new Buffer.from(JSON.stringify(previews)),
      });
      this.push(previewsFile);
      this.push(indexFile);
      cb();
    },
  );
};
