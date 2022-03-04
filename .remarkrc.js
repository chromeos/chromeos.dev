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
    { no: 'blacklist' },
    { no: 'whitelist' },
    { no: 'graylist' },
    { no: 'dark(-|\s)?greylist' },
    { no: 'light(-|\s)?greylist' },
    { no: 'tribal(-|\s)?knowledge' },
    { no: 'tribal(-|\s)?wisdom' },
    { no: 'tribal' },
    { no: 'tribalism' },
    { no: 'tribal(-|\s)?division'},
    { no: 'nitty(-|\s)?gritty' },
    { no: 'voodoo' },
    { no: 'off(-|\s)?the(-|\s)?reservation' },
    { no: 'the(-|\s)?natives'},
    { no: 'natives' },
    { no: 'first(-|\s)?class' },
    { no: 'quatum(-|\s)?supremacy'},
    { no: '(black|grey|gray|white)(-|\s)?hat'},
    { no: 'supremacy' },
    { no: 'dummy' },
    { no: 'sane' },
    { no: 'crazy' },
    { no: 'insane' },
    { no: 'cripple' },
    { no: 'sanity(-|\s)check' },
    { no: 'grandfathered' },
    { no: '(grandfather)(-|\s)?(clause|ed|ing)' },
    { no: '(mom|girlfriend|grandma|grandmother)(-|\s)?(test)' },
    { no: '(build)(-|\s)?(cop|sheriff)' },
    { no: 'ADD' },
    { no: 'open(-|\s)?the(-|\s)?kimono' },
    { no: 's?he' },
    { no: 'final(-|\s)?solution'},
    { no: 'WTF(-|\s)?error'},
    { no: 'ninja' },
    { no: 'guru' },
    { no: '^h(is|er(s?))$' },
    { no: 'man-in-the-middle' },
    { no: 'mitm' },
    { no: 'redline' },
    { no: '(black|white|gray|grey)(-|\s)?(hat|list|glove|label)' },
    { no: 'rtfm' },
    { no: 'wtf' }],
    { no: 'post mortem' },
    { no: 'retarded' },
    { no: 'demented' },
    { no: 'developmentally(-|\s)?disabled' },
    { no: 'idiot' },
    { no: 'mongoloid' },
    { no: 'permenant(-|\s)?child' },
    { no: 'short(-|\s)?bus' },
    { no: 'slow(-|\s)?learner' },
    { no: 'daft' },
    { no: 'imbecil' },
    { no: 'stupid' },
    { no: 'moronic' },
    { no: '(-|\s)?tard' }
  ]],

  // Custom
  [require('./lib/linting/content-models.js'), [2]],
  [require('./lib/linting/md-name-lint'), [2]],
];
