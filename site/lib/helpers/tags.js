/*
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Normalizes similiar and internationalized tags to a single tag for use across the application
 * @param {string} tag Tag to normalize for icon and background use
 * @return {string}
 */
function normalizeTag(tag) {
  const finder = tag?.toLowerCase();
  switch (finder) {
    // Web and PWA
    case 'pwa':
    case 'web':
      return 'web';
    // Games
    case 'games':
    case 'juegos':
      return 'games';
    // Announcements
    case 'announcement':
    case 'anuncio':
      return 'announcement';
    // Events
    case 'event':
    case 'evento':
      return 'event';
    // Leader's Corner
    case "leader's corner":
    case 'rincón del líder':
      return "leader's corner";
    default:
      return finder;
  }
}

module.exports = {
  normalizeTag,
};
