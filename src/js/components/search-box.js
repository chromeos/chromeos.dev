/**
 * Copyright 2020 Google LLC
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
 * Functionality for a search box.
 */
export class SearchBox {
  /**
   * Init search box.
   * @param {HTMLElement} element - What will be executed on submit.
   * @param {HTMLElement} nav - Nav needs to be hidden.
   */
  constructor(element, nav) {
    const constants = {
      closeSelector: '.search-box__close',
      openSelector: '.search-box__icon',
      inputSelector: '.search-box__field',
      searchWrapper: '.search-box__wrapper',
      navHiddenClass: 'nav__primary-hidden',
      searchBoxGreyClass: 'search-box__grey',
      searchBoxExtendedClass: 'search-box-extended',
    };

    this.constants_ = Object.freeze(constants);

    this.closeButton_ = document.querySelector(this.constants_.closeSelector);
    this.closeButton_.addEventListener('click', this.closeSearch_.bind(this));

    this.openButton_ = document.querySelector(this.constants_.openSelector);
    this.openButton_.addEventListener('click', this.openSearch_.bind(this));
    this.searchField_ = document.querySelector(this.constants_.inputSelector);
    this.element_ = element;
    this.nav_ = nav;
  }

  /**
   * @private
   */
  closeSearch_() {
    this.element_.classList.remove(this.constants_.searchBoxGreyClass, this.constants_.searchBoxExtendedClass);
    if (this.nav_) {
      this.nav_.classList.remove(this.constants_.navHiddenClass);
    }

    this.openButton_.focus();
  }

  /**
   * @private
   */
  openSearch_() {
    this.element_.classList.add(this.constants_.searchBoxGreyClass, this.constants_.searchBoxExtendedClass, this.navHiddenClass);
    if (this.nav_) {
      this.nav_.classList.add(this.constants_.navHiddenClass);
    }
    this.searchField_.focus();
  }
}
