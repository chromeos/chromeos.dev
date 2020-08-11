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
const { readFileSync } = require('fs');
const { Octokit } = require('@octokit/rest');

if (process.env.GITHUB_EVENT_NAME === 'pull_request') {
  const event = JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, 'utf-8'));

  postMessage(event);
}

/**
 *
 * @param {object} event - GitHub Event object
 */
async function postMessage(event) {
  // Clean input
  const input = ['url', 'sha', 'links', 'results']
    .map(i => {
      const input = core.getInput(i, { required: true });
      try {
        return { [i]: JSON.parse(input) };
      } catch (e) {
        return { [i]: input };
      }
    })
    .reduce((acc, cur) => Object.assign(acc, cur), {});

  // Check to see if there's an existing message
  const repo = event.repository.name;
  const owner = event.repository.owner.login;
  const pr = event.number;

  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  const comments = await octokit.issues.listComments({
    owner,
    repo,
    issue_number: pr,
  });

  console.log(owner);
  console.log(repo);
  console.log(pr);
  console.log(comments);

  const anchorTest = /^<input\stype="hidden"\sname="preview-anchor"\sid="(.*)?">/gm;

  let message = comments.map(c => c.body).find(c => anchorTest.test(c));
  const date = new Date().toLocaleDateString('en-US', { dateStyle: 'medium', timeStyle: 'short' });

  if (message) {
    // DO SOMETHING
  } else {
    const idTest = /https:\/\/cros-staging--(([\d|\w]){8}-([\d|\w]){4}-([\d|\w]){4}-([\d|\w]){4}-([\d|\w]){12})/g;
    const id = idTest.exec(input.url)[1];

    message = `<input type="hidden" name="preview-anchor" id="${id}">
    
    ## <img src="https://firebase.google.com/downloads/brand-guidelines/SVG/logo-logomark.svg" height="26" alt="Firebase"> Deploy Preview
    
    | url          | commit       | deployed |
    | ------------ | ------------ | -------- |
    | ${input.url} | ${input.sha} | ${date} |
    
    ## <img src="https://developers.google.com/web/tools/lighthouse/images/lighthouse-logo.svg" height="26" alt="Lighthouse logo"> Lighthouse Results
    
    ${buildLighthousResults(input)}`;

    core.setOutput('message', message);
  }
}

/**
 *
 * @param {object} input - Action input
 * @return {string}
 */
function buildLighthousResults(input) {
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

  let message = '';

  for (const [key, value] of Object.entries(lh)) {
    message += `### Commit ${input.sha}\n`;
    if (value.results.length) {
      message += `[\`${key.replace(input.url, '')}\` Report](${value.report})\n|audit|high|expected|values|\n| :---: | :---: | :---: | :---: |\n`;
      for (const result of value.results) {
        message += `|${result.auditProperty}|${result.actual * 100}|${result.expected * 100}|${result.values.map(i => i * 100).join(', ')}|\n`;
      }
      message += '\n';
    }
  }

  return message;
}
