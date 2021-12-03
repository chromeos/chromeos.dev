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
import { ponyfillResizeObserver } from '../lib/resize-observer';
/**
 * Verify Subnav width to apply dropdown behavior to close according the design
 */
export class Subnav {
  /**
   *
   * @param {DOMElement} elem - Container element for Subnav.
   */
  constructor(elem) {
    this.elem_ = elem;
    this.previousBackground = 0;
    this.init();
  }
  /**
   * Handles async initialization.
   */
  async init() {
    const resizeObserver = await ponyfillResizeObserver(entries => {
      const entry = entries.find(e => e.target === this.elem_);
      if (entry.target === this.elem_) {
        const { backgroundColor } = getComputedStyle(this.elem_);
        if (this.previousBackground !== backgroundColor) {
          // If backgroundColor !== rgba(0, 0, 0, 0) the element is collapsed.
          // Subnav is only been used on tech-detail page where its background color is rgba(0, 0, 0, 0) for large screens
          // or rgb(241, 243, 244) for small screens.
          if (backgroundColor !== 'rgba(0, 0, 0, 0)') {
            this.elem_.removeAttribute('open');
          } else {
            this.elem_.setAttribute('open', '');
          }
          this.previousBackground = backgroundColor;
        }
      }
    });
    resizeObserver.observe(this.elem_);
  }
}
