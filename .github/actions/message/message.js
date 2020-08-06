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
const core = require('@actions/core');

/**
 * Builds a message and sets it as the output
 */
const input = ['url', 'status', 'sha', 'links', 'results']
  .map(i => {
    const input = core.getInput(i, { required: true });
    try {
      return { [i]: JSON.parse(input) };
    } catch (e) {
      return { [i]: input };
    }
  })
  .reduce((acc, cur) => Object.assign(acc, cur), {});

const lh = {};

for (const [key, value] of Object.entries(input.links)) {
  lh[key] = {
    report: value,
    results: [],
  };
}

for (const result of input.results) {
  lh[result.url].results.push(result);
}

let message = `## <img src="https://firebase.google.com/downloads/brand-guidelines/SVG/logo-logomark.svg" height="26" alt="Firebase"> Deploy Preview
|   |   |
| :---: | --- |
| status | \`${input.status}\` |
| url    | ${input.url} |
| commit | ${input.sha} |

## <img src="https://developers.google.com/web/tools/lighthouse/images/lighthouse-logo.svg" height="26" alt="Lighthouse logo"> Lighthouse Results
`;

for (const [key, value] of Object.entries(lh)) {
  message += `### [\`${key.replace(input.url, '')}\` Report](${value.report})\n`;
  if (value.results.length) {
    message += `**Errors**\n|audit|high|expected|values|\n| :---: | :---: | :---: | :---: |\n`;
    for (const result of value.results) {
      message += `|${result.auditProperty}|${result.actual * 100}|${result.expected * 100}|${result.values.map(i => i * 100).join(', ')}|\n`;
    }
    message += '\n';
  }
}

core.setOutput('message', message);
