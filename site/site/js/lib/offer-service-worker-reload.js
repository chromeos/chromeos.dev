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
import { SnackbarArea } from '../components/snackbar';
import { getData } from './data';
import { preferences } from 'service-worker-i18n-redirect/preferences';

/**
 * Configures event handlers and snackbar to offer reload to users when new Service Workers are installed
 *
 * @param {registration} registration: The Service Worker Registration object
 * @return {Void}
 */
export function offerServiceWorkerReload(registration) {
  // Constructs and pops a snackbar with a cta that reloads the page and switches in the new Service Worker
  const showSkipWaitingPrompt = async () => {
    const language = await preferences.get('lang');
    const microcopy = await getData('microcopy', language);
    const snackbar = new SnackbarArea();
    snackbar.add(microcopy.sw.site, {
      text: microcopy.sw.reload,
      cb: async () => {
        let refreshing = false;
        // When skipWaiting completes for a Servie Worker, the controllerchange event fires
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          if (refreshing) return;
          refreshing = true;
          window.location.reload();
        });

        // If there is a Service Worker waiting to take over, send it a message to take control
        if (registration && registration.waiting) {
          registration.waiting.postMessage('SKIP_WAITING');
        }
      },
    });
  };

  // awaitStateChange is used to set up event handlers when the worker is not yet waiting directly after registration
  const awaitStateChange = () => {
    // If the incoming service worker is waiting, meaning it is already installed, offer the reload
    if (registration.waiting) {
      showSkipWaitingPrompt();
    } else {
      // Otherwise, wait for the service worker to be installed and then offer the reload
      registration.installing.addEventListener('statechange', (event) => {
        if (event.target.state === 'installed') {
          showSkipWaitingPrompt();
        }
      });
    }
  };

  // If there's a service worker waiting, offer a refresh and set up no other reload handlers
  if (registration.waiting) {
    return showSkipWaitingPrompt();
  }

  // If there's a service worker installing, then wait for it to be ready
  if (registration.installing) {
    awaitStateChange();
  } else {
    // Otherwise, set up an event handler for if a new service worker starts installing so that we can monitor it's ready status
    registration.addEventListener('updatefound', awaitStateChange);
  }
}
