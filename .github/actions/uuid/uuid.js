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
const { v4: uuid } = require('uuid');
const core = require('@actions/core');
const { readFileSync } = require('fs');
const { Octokit } = require('@octokit/rest');

if (process.env.GITHUB_EVENT_NAME === 'pull_request') {
  const event = JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, 'utf-8'));

  generateID(event);
}

/**
 *
 * @param {object} event - GitHub Event object
 */
async function generateID(event) {
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

  const anchorTest = /^<input\stype="hidden"\sname="preview-anchor"\sid="(.*)?">/gm;

  const message = comments.data.map(c => ({ id: c.id, body: c.body })).find(c => anchorTest.test(c.body));

  if (message) {
    const id = anchorTest.exec(message.body)[1];
    return core.setOutput('channel', id);
  } else {
    const id = uuid();
    return core.setOutput('channel', id);
  }
}
