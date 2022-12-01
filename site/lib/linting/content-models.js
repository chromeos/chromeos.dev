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

const rule = require('unified-lint-rule');
const visit = require('unist-util-visit');
const parents = require('unist-util-parents');
const find = require('unist-util-find');
const { parse: yamlParser } = require('yaml-unist-parser');
const yaml = require('js-yaml');
const AJV = require('ajv');

const schemas = {
  posts: require('./schemas/posts'),
  stories: require('./schemas/stories'),
  technical: require('./schemas/technical'),
};

/**
 *
 * @param {AST} tree - UNIST compatible AST
 * @param {VFile} file - Virtual file being linted
 */
function fmLinter(tree, file) {
  const wrapped = parents(tree);

  const cm = find(wrapped, { type: 'yaml' });

  if (!cm) {
    file.message('Content model front matter is required', tree);
  } else {
    // Not sure if this is actually possible, but it's good to have the check in anyway
    if (cm.position.start.line !== 1) {
      file.message('Front matter must be at the start of the file', tree);
    }
  }

  visit(wrapped, 'yaml', schemaVisitor(file));
}

/**
 *
 * @param {VFile} file - Virtual file
 * @return {function}
 */
function schemaVisitor(file) {
  const section = file.history[0].split('/')[2];

  /**
   * @param {AST} node - UNIST compatible AST
   */
  return function (node) {
    const fm = JSON.parse(JSON.stringify(yaml.load(node.value)));
    const schema = schemas[section] || schemas.technical;

    if (schema) {
      const ajv = new AJV({
        allErrors: true,
      });
      require('ajv-merge-patch')(ajv);

      const validate = ajv.compile(schema);
      const valid = validate(fm);
      if (!valid) {
        const yamlAST = parents(yamlParser(node.value));
        const arrayRegex = /(\w*)\[(\d)*\]/;

        // If it's not valid, walk through the yaml AST based on the error path to get actual line numbers
        for (const error of validate.errors) {
          if (error.keyword !== '$merge') {
            const path = error.dataPath.split('.');
            path.shift();

            let node = yamlAST;

            while (path.length) {
              const item = path.shift();
              if (arrayRegex.test(item)) {
                const items = item.match(arrayRegex);
                node = find(node, (n) => {
                  return n.type === 'plain' && n.value === items[1] && n.parent.type === 'mappingKey';
                }).parent.parent;

                node = find(node, (n) => {
                  return n.type === 'sequence' && n.parent.type === 'mappingValue';
                });

                node = node.children[parseInt(items[2])];
              } else {
                node = find(node, (n) => {
                  return n.type === 'plain' && n.value === item && n.parent.type === 'mappingKey';
                });

                node = node.parent.parent;
              }
            }

            // Line numbers are off by one because AST doesn't properly understand the starting --- for front matter
            node.position.start.line += 1;
            node.position.end.line += 1;

            let message = `'${error.dataPath.slice(1)}': ${error.message}`;

            if (error.keyword === 'additionalProperties') {
              message += `: ${error.params.additionalProperty}`;
            }
            file.message(message, node);
          }
        }
      }
    }
  };
}

module.exports = rule('content-models', fmLinter);
