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
 * Bootstraps Navigation
 */
export class MainNavigation {
  /**
   *
   * @param {DOMElement} elem - Element to use as the TOC
   */
  constructor() {
    this.elem_ = document.querySelector('.nav');
    this.menu_ = document.querySelector('.header__menu');
    this.close_ = document.querySelector('.nav__close');
    this.buttons_ = this.elem_.querySelectorAll('button.nav__link');
    this.links_ = this.elem_.querySelectorAll('a');
    this.tabbables_ = this.elem_.querySelectorAll('button, a');
    this.expanded_ = true;

    // Toggle if nav items can be tabbed on load
    if (window.getComputedStyle(this.menu_).display !== 'none') {
      this.elem_.setAttribute('aria-expanded', 'false');
      this.expanded_ = false;
    }

    this.init();

    // Add subnav expansion event listeners
    this.active_ = null;
    for (const button of this.buttons_) {
      button.addEventListener('click', this.expandSubnav.bind(this));
    }

    // Fly-out Nav Triggers
    // Menu click
    this.menu_.addEventListener('click', this.slideMenu.bind(this));
    document.addEventListener('keydown', e => {
      if (this.isExpanded(this.elem_)) {
        // `esc` trigger
        if (e.keyCode === 27) {
          e.preventDefault();
          this.slideMenu();
        }

        // Focus capture for nav
        if (e.keyCode === 9) {
          const last = this.links_[this.links_.length - 1];
          if (document.activeElement === last && !e.shiftKey) {
            e.preventDefault();
            this.close_.focus();
          } else if (document.activeElement === this.close_ && e.shiftKey) {
            e.preventDefault();
            last.focus();
          }
        }
      }
    });

    // Close button trigger
    this.close_.addEventListener('click', this.slideMenu.bind(this));
    // Nav click outside primary nav area
    this.elem_.addEventListener('click', e => {
      if (e.target === e.currentTarget && this.isExpanded(this.elem_)) {
        this.slideMenu();
      }
    });
  }

  /**
   * Handles async initialization
   */
  async init() {
    // Set Active Link
    const location = window.location.pathname;
    let activePath = null;
    let activeElement = null;
    for (const link of this.links_) {
      const path = new URL(link.href).pathname;
      const alt = link.dataset.alt;
      if (location.indexOf(path) === 0 || location.indexOf(alt) === 0) {
        if (!activePath) {
          activePath = path;
          activeElement = link;
        } else if (activePath && activePath.length < path.length) {
          activePath = path;
          activeElement = link;
        }
      }
    }

    if (activeElement) {
      activeElement.dataset.active = true;
      const wrapper = activeElement.closest('li[class^="nav__"][class$="-item"]');

      if (wrapper) {
        wrapper.classList.add('nav--highlighted');
        const parent = activeElement.closest('.nav__primary-item');
        if (parent) {
          const button = parent.querySelector('button.nav__link');
          if (button) {
            button.dataset.active = true;
          }
        }
      }
    }

    // Toggle if nav items can be tabbed based on menu visibility
    const resizeObserver = await ponyfillResizeObserver(entries => {
      const entry = entries.find(e => e.target === this.menu_);

      if (entry.target === this.menu_) {
        if (entry.contentRect.width > 0) {
          this.elem_.setAttribute('aria-expanded', 'false');

          this.expanded_ = false;
        } else {
          this.elem_.removeAttribute('aria-expanded');
          this.elem_.classList.remove('nav--animated');
          this.expanded_ = true;
        }
      }
    });

    resizeObserver.observe(this.menu_);
  }

  /**
   * @param {DOMElement} elem - Element to check
   * @return {boolean}
   */
  isExpanded(elem) {
    return elem.hasAttribute('aria-expanded') && elem.getAttribute('aria-expanded') === 'true';
  }

  /**
   * Slides menu out or in
   */
  slideMenu() {
    const expanded = this.isExpanded(this.elem_);

    this.elem_.classList.add('nav--animated');

    if (expanded) {
      this.elem_.setAttribute('aria-expanded', 'false');
      this.menu_.focus();
    } else {
      this.elem_.setAttribute('aria-expanded', 'true');
      this.links_[0].focus();
    }
  }

  /**
   *
   * @param {Event} e - JavaScript event
   */
  expandSubnav(e) {
    const target = e.target;

    if (this.active_ !== null && this.active_ !== target) {
      this.toggleSubnav(this.active_);
    }

    this.toggleSubnav(target);
    if (this.isExpanded(target)) {
      this.active_ = target;
    } else {
      this.active_ = null;
    }
  }

  /**
   *
   * @param {DOMElement} target - DOMElement that is the target
   */
  toggleSubnav(target) {
    const expanded = this.isExpanded(target);
    target.setAttribute('aria-expanded', !expanded);

    const menu = target.nextElementSibling;
    menu.hidden = !menu.hidden;
    // Enable/disable tabbing for menu links based on if the menu is hidden
    const links = [...menu.querySelectorAll('.nav__link')];
    if (menu.hidden) {
      for (const m of links) {
        m.setAttribute('tabindex', -1);
      }
    } else {
      for (const m of links) {
        m.removeAttribute('tabindex');
      }
    }
  }
}
