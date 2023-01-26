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
 * Bootstraps the cookie disclaimer
 */
export class CookieDisclaimer {
  /**
   *
   * @param {DOMElement} elem - Element to use as the Cookie Dialog
   * @param {DOMElement} spotReference - Element to return focus when the cookie closes
   */
  constructor(elem, spotReference) {
    this.elem_ = elem;
    this.acceptButton_ = this.elem_.querySelector('[data-type="accept"]');
    this.declineButton_ = this.elem_.querySelector('[data-type="decline"]');
    this.spotReference_ = spotReference;
    this.acceptButton_.addEventListener('click', this.acceptCookieUsage.bind(this));
    this.declineButton_.addEventListener('click', this.declineCookieUsage.bind(this));
    this.cookieStore = 'chromeos-accepts-cookies--v2';
    this.checkCookieUsageAcceptance();
  }

  /**
   * Checks if the user has accepted the use of the cookies.
   */
  checkCookieUsageAcceptance() {
    /* global gtag */
    const acceptsCookies = localStorage.getItem(this.cookieStore);

    if (acceptsCookies !== 'true' && acceptsCookies !== 'false') {
      this.openDialog();
      this.keyHandler();
      this.acceptButton_.focus();
    }

    if (acceptsCookies === 'true' && typeof gtag === 'function') {
      gtag('event', 'cookie_consent');
      gtag('cookie_consent', true);
    }
  }

  /**
   * Opens the cookie disclaimer dialog.
   */
  openDialog() {
    if (typeof this.elem_.show === 'function') {
      this.elem_.show();
    } else {
      // If the <dialog> API is not supported by the browser
      this.elem_.setAttribute('open', '');
    }
  }

  /**
   * Closes the cookie disclaimer dialog.
   */
  closeDialog() {
    if (typeof this.elem_.close === 'function') {
      this.elem_.close();
    } else {
      // If the <dialog> API is not supported by the browser
      this.elem_.removeAttribute('open');
    }

    // Sets the focus back to an element in the page
    this.spotReference_.focus();
  }

  /**
   * Sets the cookie usage acceptance flag.
   */
  acceptCookieUsage() {
    localStorage.setItem(this.cookieStore, true);
    this.closeDialog();
    this.checkCookieUsageAcceptance();
  }

  /**
   * Sets the cookie usage acceptance flag to decline.
   */
  declineCookieUsage() {
    localStorage.setItem(this.cookieStore, false);
    this.closeDialog();
  }

  /**
   * Handles the keyboard when the cookie disclaimer is open
   */
  keyHandler() {
    document.addEventListener('keydown', (e) => {
      if (this.elem_.hasAttribute('open')) {
        // `esc` trigger
        if (e.keyCode === 27) {
          e.preventDefault();
        }

        // Focus capture for the cookie disclaimer
        if (e.keyCode === 9) {
          if (document.activeElement === this.acceptButton_ && !e.shiftKey) {
            e.preventDefault();
            this.spotReference_.focus();
          }
        }
      }
    });
  }
}
