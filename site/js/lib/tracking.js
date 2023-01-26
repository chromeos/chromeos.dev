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
 * Class to manage custom tracking
 */
export class Tracking {
  /**
   *
   * @param {function} google - Google gtag instance
   */
  constructor(google) {
    // Track subscribe CTA clicks
    const subscribeCTA = document.querySelectorAll('a.cta[href$="/subscribe"]');
    for (const cta of subscribeCTA) {
      cta.addEventListener('click', this.sendEvent('click_subscribe_cta'));
    }

    // Track Newsletter submit
    const subscribeForm = document.querySelector('#newsletter-sign-up');
    if (subscribeForm) {
      subscribeForm.addEventListener('submit', this.sendEvent('click_subscribe_submit'));
    }

    if (typeof google === 'function') {
      this.google = google;
    } else {
      this.google = () => {};
    }
  }

  /**
   * Sends event using a beacon with the given name
   * @param {string} name - Name of event to send
   * @param {object} [options] - Data to send with event
   * @return {function}
   */
  sendEvent(name, options = {}) {
    // this.google('event', name, options)
    return () => this.google('event', name, Object.assign(options, { transport: 'beacon' }));
  }
}
