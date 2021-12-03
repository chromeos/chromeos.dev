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
 * Bootstraps ToC
 */
export class TableOfContents {
  /**
   *
   * @param {DOMElement} elem - Element to use as the TOC
   */
  constructor(elem) {
    this.elem_ = elem;

    // Create Observer
    this.observer_ = new IntersectionObserver(observe, {
      rootMargin: '0px 0px -70% 0px',
      threshold: 1,
    });
    this.previousPosition = '';
    this.collapse();

    // Observe Headings and set up Link object
    const links = {};
    const anchors = [...this.elem_.querySelectorAll('a')];

    anchors
      .map(link => {
        const href = link.getAttribute('href');

        links[href] = link;

        return document.getElementById(link.getAttribute('href').slice(1));
      })
      .forEach(heading => this.observer_.observe(heading));

    let current = links[Object.keys(links)[0]].getAttribute('href');
    /**
     *
     * @param {DOMElement[]} entries - Entries
     */
    function observe(entries) {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const id = `#${entry.target.getAttribute('id')}`;

          if (current !== id) {
            delete links[current].dataset.active;
            links[id].dataset.active = true;
            // Breaks scrolling to section when clicking on a ToC link. Should revisit this at a later date to see if we can get the ToC to scroll with the page without breaking.
            // links[id].offsetParent.scrollTop = links[id].offsetTop;
            current = id;
          }
        }
      }
    }
    // Add click event to toc links
    for (const anchor of anchors) {
      anchor.addEventListener('click', this.toggleEvent.bind(this));
    }
  }
  /**
   * Toggle event of the dropdown behavior
   */
  toggleEvent() {
    const { position } = getComputedStyle(this.elem_);
    this.toggleDropdown(position);
  }
  /**
   * Toggles open attribute depending on the element position css property.
   * @param {string} currentPosition Element's position css property.
   */
  toggleDropdown(currentPosition) {
    // If the currentPosition is static the element is collapsed.
    if (currentPosition === 'static') {
      this.elem_.removeAttribute('open');
    } else {
      this.elem_.setAttribute('open', '');
    }
    this.previousPosition = currentPosition;
  }
  /**
   * Toc collapse behavior
   */
  async collapse() {
    const resizeObserver = await ponyfillResizeObserver(entries => {
      const entry = entries.find(e => e.target === this.elem_);
      if (entry.target === this.elem_) {
        const { position } = getComputedStyle(this.elem_);
        if (this.previousPosition !== position) {
          this.toggleDropdown(position);
        }
      }
    });
    resizeObserver.observe(this.elem_);
  }
}
