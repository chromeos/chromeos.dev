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
 * Bootstraps the Table element.
 */
export class ResponsiveTable {
  /**
   *
   * @param {HTMLElement[]} elem - Element to use as table reference.
   */
  constructor(elem) {
    this.minimumWidth_ = 544; // 34rem
    this.minimumWidthStack_ = 448; // 28rem
    this.elem_ = elem;
    this.parent_ = this.elem_.parentElement;
    this.init();
  }

  /**
   * Handles async initialization.
   * Toggles the table responsive behavior based on a minimum width value.
   */
  async init() {
    const resizeObserver = await ponyfillResizeObserver((entries) => {
      const entry = entries.find((e) => e.target === this.parent_);
      if (entry.target === this.parent_) {
        const isMinWidth = entry.contentRect.width < this.minimumWidth_;
        const isMinWidthStack = entry.contentRect.width < this.minimumWidthStack_;
        this.elem_.classList.toggle('responsive-table', isMinWidth);
        this.elem_.classList.toggle('responsive-table--2-cols', isMinWidth && !isMinWidthStack);
      }
    });
    resizeObserver.observe(this.parent_);
  }
}
