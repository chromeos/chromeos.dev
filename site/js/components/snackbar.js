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
 * Snackbar class
 *
 * Usage
 * const snackbar = new SnackbarArea();
 * snackbar.add(text, action)
 */
export class SnackbarArea {
  /**
   * Snackbar Constructor
   *
   * We want to put all snackbars across all uses into a single snackbar area. In order to do that successfully _and_ have each item use this only when needed, we use the class constructor to either build a container or reuse the existing container, and then call the `add` method to actually add a snackbar to the container.
   */
  constructor() {
    const existingArea = document.querySelector('.snackbar--area');
    if (existingArea) {
      this.container_ = existingArea;
    } else {
      const area = document.createElement('div');
      area.classList.add('snackbar--area');
      document.body.appendChild(area);
      this.container_ = area;
    }
  }

  /**
   *
   * @param {string} text - Snackbar text
   * @param {object} action - Callback function to call. If no callback action is included, will include a close button
   * @param {string} action.text - Text of the action
   * @param {function} action.cb - Callback to be called when the action is clicked
   * @return {DOMElement}
   */
  add(text, action) {
    const snackbar = document.createElement('aside');
    snackbar.classList.add('snackbar', 'type--base');
    snackbar.setAttribute('role', 'alert');
    snackbar.innerHTML = `<p class="snackbar__text">${text}</p>`;

    const actionButton = document.createElement('button');
    actionButton.classList.add('snackbar__action');

    if (action) {
      actionButton.innerText = action.text;
      actionButton.addEventListener('click', (e) => {
        action.cb(e);
        snackbar.remove();
      });
    } else {
      actionButton.classList.add('snackbar__action--close');
      actionButton.innerHTML = '<svg role="image" aria-hidden="true" class="icon snackbar__close"><use href="/images/icons/sprite.svg#close"></svg>';
      actionButton.setAttribute('aria-label', 'Close');
      actionButton.value = 'cancel';
      actionButton.addEventListener('click', (e) => {
        snackbar.remove();
      });
    }

    snackbar.appendChild(actionButton);

    this.container_.appendChild(snackbar);

    return snackbar;
  }
}
