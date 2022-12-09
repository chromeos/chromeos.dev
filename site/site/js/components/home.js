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

import { scrollListener } from '../lib/throttle';

/**
 * Manages home page navigation
 */
export class Home {
  /**
   *
   * @param {DOMElement} elem - The Home element
   */
  constructor(elem) {
    const sections = ['subnav', 'articles', 'community'].map((i) => `#home__${i}`).reduce((acc, cur) => Object.assign(acc, { [cur.replace('#home__', '')]: cur }), {});

    this.elem_ = elem;
    this.constants_ = Object.freeze({
      time: 250,
      speed: 45,
      sections,
      off: 'ApplePaySession' in window,
    });

    this.reducedMotion_ = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!this.reducedMotion_.matches || this.constants_.off) {
      this.elem_.classList.add('animation--active');
    }

    this.reducedMotion_.addListener((e) => {
      if (e.matches || this.constants_.off) {
        this.elem_.classList.remove('animation--active');
      } else {
        this.elem_.classList.add('animation--active');
      }
    });

    this.observer_ = new IntersectionObserver(this.observe_, {
      rootMargin: '0px 0px -33% 0px',
    });

    this.articles_ = elem.querySelector('#home__articles');

    for (const [key, value] of Object.entries(this.constants_.sections)) {
      const element = elem.querySelector(value);
      this.fadeSetup_(key, element);
      this.observer_.observe(element);
    }

    scrollListener(this.scroll_.bind(this));
  }

  /**
   *
   * @param {string} id - ID string
   * @param {DOMElement} elem - the DOM element to build off of
   * @param {boolean} flip - Changes selector order
   */
  fadeSetup_(id, elem, flip = false) {
    let fades = [];
    switch (id) {
      case 'subnav':
        fades.push(elem.querySelector('.item-grid__title'));
        fades = fades.concat([...elem.querySelectorAll('.card-subnav')]);
        break;
      case 'articles':
        fades.push(elem.querySelector('.item-grid__title'));
        fades = fades.concat([...elem.querySelectorAll('.card')]);
        break;
      case 'community':
        fades.push(elem.querySelector('.item-grid__title'));
        fades.push(elem.querySelector('.item-grid__content'));
        break;
    }

    for (let i = 0; i < fades.length; i++) {
      fades[i].classList.add('animation__lift-fade--start');
      fades[i].setAttribute('data-step', i);
    }
  }

  /**
   *
   * @param {DOMElement[]} entries - Intersecting Entries
   */
  observe_(entries) {
    for (const entry of entries) {
      if (entry.isIntersecting && !('triggered' in entry.target.dataset)) {
        entry.target.setAttribute('data-triggered', true);

        if ('step' in entry.target.dataset) {
          entry.target.classList.add('animation__lift-fade--end');
        }
        for (const elem of [...entry.target.querySelectorAll('[data-step]')]) {
          elem.classList.add('animation__lift-fade--end');
        }
      }
    }
  }

  /**
   *
   * @param {number} speed - Speed for parallax calculation
   * @param {number} top - Offset from top of viewport to calculate from
   * @return {number}
   */
  offset_(speed, top) {
    return ((speed * -2 * top) / window.innerHeight + speed) * -1;
  }

  /**
   * Scroll listener
   */
  scroll_() {
    if (!this.reducedMotion_.matches || !this.constants_.off) {
      // Article
      if (this.articles_) {
        const article = this.articles_.getBoundingClientRect();
        const speed = this.constants_.speed;
        const offset = this.offset_(speed, article.top);
        this.articles_.style.setProperty('--parallax-top', offset);
      }
    } else {
      // Article
      if (this.articles_) {
        this.articles_.style.setProperty('--parallax-top', 0);
      }
    }
  }
}
