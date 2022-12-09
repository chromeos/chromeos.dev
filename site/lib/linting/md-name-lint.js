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

const kebabCase = require('lodash.kebabcase');
const rule = require('unified-lint-rule');

/**
 *
 * @param {AST} tree - UNIST compatible AST
 * @param {VFile} file - Virtual file being linted
 */
function mdNameLinter(tree, file) {
  // VFile.stem is the filename without extension
  const kebabedFilename = kebabCase(file.stem);
  if (kebabedFilename !== file.stem) {
    file.message(`Filename ${file.stem} is not valid kebab case. Name expected: ${kebabedFilename}`, tree);
  }
}

module.exports = rule('md-name-lint', mdNameLinter);
