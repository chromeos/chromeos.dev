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

import { scrollListener, resizeListener } from '../lib/throttle';

/**
 * Manages home page navigation
 */
export class Home {
  /**
   *
   * @param {DOMElement} elem - The Home element
   */
  constructor(elem) {
    const sections = ['subnav', 'using', 'articles', 'featured', 'community'].map((i) => `#home__${i}`).reduce((acc, cur) => Object.assign(acc, { [cur.replace('#home__', '')]: cur }), {});

    this.elem_ = elem;
    this.constants_ = Object.freeze({
      time: 250,
      speed: 45,
      usingBreak: 829,
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
    this.featured_ = elem.querySelectorAll('.featured-content__image-wrapper .featured-content__image');
    this.using_ = [...elem.querySelectorAll('.image-card')].map((e) => [...e.querySelectorAll('img')]);

    for (const [key, value] of Object.entries(this.constants_.sections)) {
      const element = elem.querySelector(value);
      this.fadeSetup_(key, element);
      if (key === 'using') {
        const cards = element.querySelectorAll('.image-card');
        for (const [i, card] of cards.entries()) {
          if (i % 2 === 1) {
            this.fadeSetup_(key, card, true);
          } else {
            this.fadeSetup_(key, card);
          }

          this.observer_.observe(card);
        }
      } else {
        this.observer_.observe(element);
      }
    }

    scrollListener(this.scroll_.bind(this));
    resizeListener(() => {
      if (window.innerWidth < this.constants_.usingBreak) {
        for (const item of this.using_.flat().values()) {
          item.style.transform = `translateY(0px)`;
        }
      }
    });
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
      case 'using':
        if (flip) {
          fades.push(elem.querySelector('.image-card__wrapper'));
          fades = fades.concat([...elem.querySelectorAll('.image-card__animation-wrapper')]);
        } else {
          fades = fades.concat([...elem.querySelectorAll('.image-card__animation-wrapper')]);
          fades.push(elem.querySelector('.image-card__wrapper'));
        }
        break;
      case 'articles':
        fades.push(elem.querySelector('.item-grid__title'));
        fades = fades.concat([...elem.querySelectorAll('.card')]);
        break;
      case 'featured':
        fades.push(elem.querySelector('.featured-content__copy-wrapper'));
        fades.push(elem.querySelector('.featured-content__ilustrations-wrapper'));
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
      // Using Parallax, only when items are side-by-side
      if (this.using_.length) {
        if (window.innerWidth >= this.constants_.usingBreak) {
          for (const elems of this.using_) {
            const parent = elems[0].parentNode;
            const pBox = parent.getBoundingClientRect();

            for (const [i, item] of elems.entries()) {
              const speed = this.constants_.speed * (1 + i);
              const offset = this.offset_(speed, pBox.top);
              item.style.transform = `translateY(${offset}px)`;
            }
          }
        } else {
          for (const item of this.using_.flat().values()) {
            item.style.transform = `translateY(0px)`;
          }
        }
      }

      // Featured Parallax
      if (this.featured_.length) {
        const parent = this.featured_[0].parentNode;
        const pBox = parent.getBoundingClientRect();

        parent.style.setProperty('--parallax-top', this.offset_(this.constants_.speed / 2, pBox.top));

        for (const [i, item] of this.featured_.entries()) {
          const speed = this.constants_.speed * (1 + i);
          const offset = this.offset_(speed, pBox.top);
          item.style.transform = `translateY(${offset}px)`;
        }
      }

      // Article
      if (this.articles_) {
        const article = this.articles_.getBoundingClientRect();
        const speed = this.constants_.speed;
        const offset = this.offset_(speed, article.top);
        this.articles_.style.setProperty('--parallax-top', offset);
      }
    } else {
      // Using
      if (this.using_.length) {
        for (const item of this.using_.flat().values()) {
          item.style.transform = `translateY(0px)`;
        }
      }

      // Featured Parallax
      if (this.featured_.length) {
        this.featured_[0].parentNode.style.setProperty('--parallax-top', 0);
        for (const item of this.featured_.values()) {
          item.style.transform = `translateY(0px)`;
        }
      }

      // Article
      if (this.articles_) {
        this.articles_.style.setProperty('--parallax-top', 0);
      }
    }
  }
}
