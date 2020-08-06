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
const config = require('config');
const path = require('path');

const ignoredByWatcher = [config.folders.pages, config.folders.output, config.folders.templates].map(i => path.join(i, '**/*')).concat(Object.values(config.assets).map(i => path.join(config.folders.source, i.src)));

ignoredByWatcher.push(path.join(config.folders.source, config.images.watch.src));
ignoredByWatcher.push(path.join(config.folders.source, config.sass.src));

module.exports = {
  files: ['tests/**/*', '!tests/fixture/**/*'],
  ignoredByWatcher,
  verbose: true,
  require: ['esm'],
};
