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

/**
 * Regex for seeking a properly formatted stats item
 *
 * General format:
 *   Single:
 *    %[2x, This is a cool stat]
 *    %[100%, This is another stat]
 *   Multiple:
 *    %[(2x, This is a cool stat), (100%, This is another stat)]
 *
 * SINGLE_REGEX - Determines the inner state (stat, desc)
 * MULTIPLE_REGEX - Combines SINGLE_REGEX to search for multiple wrapped in parens
 * COMBINED_REGEX - Searches for either SINGLE or MULTIPLE when wrapped in %[]
 */
const SINGLE_REGEX = new RegExp(/(([\d\w\\.%?]*?)[,\s*]*(\w|\s)*?)/);
const MULTIPLE_REGEX = new RegExp(`((\\(${SINGLE_REGEX.source}\\)[,\\s*]*)+)`);
const COMBINED_REGEX = new RegExp(`%\\[(${SINGLE_REGEX.source}{1}|${MULTIPLE_REGEX.source})\\]`);

/**
 *
 * @param {Object} md - Markdown It object
 *
 * @return {function} - Tokenizer Function
 */
function statsRenderer(md) {
  return function statsRender(tokens, idx) {
    const all = tokens[idx];

    let stats = '<figure class="stats stats--renderer"><dl class="stats__list">';
    const defaultShapes = ['semicircle', 'circle', 'triangle'];
    for (const [i, stat] of all.stats.entries()) {
      stats += `<div class="stats__item"><dt class="stats__stat ${i < defaultShapes.length ? `stats__stat--${defaultShapes[i]}` : null}"><span>${stat[0]}</span></dt><dd class="stats__desc stats__desc--renderer type--base">${stat[1]}</dd></div>`;
    }
    stats += `</dl></figure>`;

    return stats;
  };
}

/**
 *
 * @param {object} src - Source being validated
 * @param {number} pos - position to start from
 *
 * @return {boolean} Is the source valid?
 */
function validateStart(src, pos) {
  const startCode = src.charCodeAt(pos);
  const nextCode = src.charCodeAt(pos + 1);

  // Check if starts with %
  if (startCode !== 0x25 /* % */) return false;

  if (nextCode === 0x5b /* [ */) return true;

  return false;
}

/**
 *
 * @param {str} stat - Stat string that matches SINGLE_REGEX
 * @return {string[]} First item is the stat, second item is the description
 */
function cleanSingleStat(stat) {
  const output = [];
  const single = /(\d*\w*%?)/.exec(stat);

  const statAlone = single[1];

  output.push(statAlone);
  const replaceRegex = new RegExp(`${statAlone}[,\\s*]*`);
  output.push(stat.replace(replaceRegex, ''));

  return output;
}

/**
 * Markdown-It rule for parsing and tokenizing a stats block
 *
 * @param {string} md - Markdown to parse
 * @return {function} A function that takes state and returns tokens for Markdown-It to render
 */
function statsRuler(md) {
  return function statsTokenize(state, silent) {
    // Get current state position and validate that it may be the start of a stat block
    const valid = validateStart(state.src, state.pos);
    if (!valid) return false;

    // Verify that the current state is a stat block
    const match = COMBINED_REGEX.exec(state.src.slice(state.pos, state.src.length));
    if (!match || match.length !== 10) return false;

    // Labels start two characters after the start position, as the start pos is %[. Bail if the start is < 0
    const labelStart = state.pos + 2;

    if (labelStart < 0) return false;

    // Parse the state string into stats
    let stats = [];

    if (MULTIPLE_REGEX.test(match[1])) {
      const multiple = match[1].replace(/\)[,\s*]*\(/g, '<-SPLIT->');
      stats = multiple.split('<-SPLIT->').map((item) => {
        if (item.charAt(0) === '(') {
          item = item.substring(1);
        }
        if (item.charAt(item.length - 1) === ')') {
          item = item.slice(0, -1);
        }

        return cleanSingleStat(item);
      });
    } else if (SINGLE_REGEX.test(match[1])) {
      stats = [cleanSingleStat(match[1])];
    }

    // Build state and tokens for renderer
    if (!silent) {
      state.pos = labelStart;
      state.caption = state.src.slice(labelStart, 0);
      const newState = new state.md.inline.State(match[1], state.md, state.env, []);
      newState.md.inline.tokenize(newState);

      const token = state.push('stats', '');
      token.stats = stats;
    }

    state.pos += state.src.indexOf(']', state.pos);
    return true;
  };
}

module.exports = function statsPlugin(md) {
  md.renderer.rules.stats = statsRenderer(md);
  md.inline.ruler.before('emphasis', 'stats', statsRuler(md));
};
