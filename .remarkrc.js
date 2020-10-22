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

exports.plugins = [
  // Markdown linting
  // https://github.com/remarkjs/remark-lint#rules
  require('remark-lint'),
  require('remark-frontmatter', ['yaml']),

  // 3rd Party
  // prettier-ignore
  [require('remark-lint-prohibited-strings'), [2, [
    { no: 'master' },
    { no: 'slave' },
    { no: 'native' },
    { no: 'first(-|\s)?class' },
    { no: 'dummy' },
    { no: 'sane' },
    { no: 'crazy' },
    { no: 'insane' },
    { no: 'cripple' },
    { no: 'sanity(-|\s)check' },
    { no: 'grandfathered' },
    { no: 's?he' },
    { no: '^h(is|er(s?))$' },
    { no: 'man-in-the-middle' },
    { no: 'mitm' },
    { no: 'redline' },
    { no: '(black|white|gray|grey)(-|\s)?(hat|list|glove|label)' },
    { no: 'rtfm' },
    { no: 'wtf' }],
    { no: 'post mortem' }
  ]],

  // Custom
  [require('./lib/linting/content-models.js'), [2]],
  [require('./lib/linting/md-name-lint'), [2]],
];
