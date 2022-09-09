/**
 * Copyright 2022 Google LLC
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
/* global gtag */
import { preferences } from 'service-worker-i18n-redirect/preferences';
import { MainNavigation } from './components/nav';
import circleWorklet from './worklets/circles.js?url';
import shapeWorklet from './worklets/shape.js?url';

// Components that are critical to user experience should be loaded on `DomContentLoaded`
window.addEventListener('DOMContentLoaded', async () => {
  new MainNavigation();

  const lang = document.querySelector('#lang');
  const form = document.querySelector('.form');
  const toc = document.querySelector('.toc');
  const search = document.querySelector('.search-results');
  const searchBox = document.querySelector('.search-box-header');
  const navPrimary = document.querySelector('.nav__primary');
  // const home = document.querySelector('#home');
  const offlineSearch = document.querySelector('[data-offline-search]');
  const powerfulPWAs = document.querySelector('[data-pwa-checklist]');
  const containerQueries = 'container' in document.documentElement.style;

  // Set default language if no language is set
  const language = await preferences.get('lang');
  if (language === undefined) {
    preferences.set('lang', lang.value);
  }

  // Redirect user if language is changed
  lang.addEventListener('change', (e) => {
    preferences.set('lang', e.target.value);
    window.location = document.querySelector(`link[rel="alternate"][hreflang="${e.target.value}"]`).href;
  });

  const cookieDialog = document.querySelector('.cookie-disclaimer');

  if (cookieDialog) {
    const logo = document.querySelector('.header__home');
    try {
      const { CookieDisclaimer } = await import('./components/cookie-disclaimer');
      new CookieDisclaimer(cookieDialog, logo);
    } catch (e) {
      console.error('Could not load cookie disclaimer');
    }
  }

  if (offlineSearch && (await preferences.get('offline-search'))) {
    offlineSearch.style.display = 'block';
  }

  // TODO: Add back in when we re-implement parallax for the new home page design
  // if (home) {
  //   const { Home } = await import('./components/home');
  //   new Home(home);
  // }

  if (form) {
    const { Form } = await import('./components/form');
    new Form(form);
  }

  if (searchBox) {
    const { SearchBox } = await import('./components/search-box');
    new SearchBox(searchBox, navPrimary);
  }

  if (search) {
    const { Search } = await import('./components/search');
    new Search(search, language);
  }

  // Houdini paint worklet
  if (!CSS.paintWorklet) {
    await import('css-paint-polyfill');
  }

  if (CSS.paintWorklet) {
    await CSS.paintWorklet.addModule(circleWorklet);
    await CSS.paintWorklet.addModule(shapeWorklet);
  }

  // Polyfill container queries
  if (!containerQueries) {
    await import('container-query-polyfill');
  }

  // Table of Contents
  if (toc) {
    const { TableOfContents } = await import('./components/toc');
    new TableOfContents(toc);
  }

  if (powerfulPWAs) {
    const { PWAChecklist } = await import('./components/pwa-checklist');
    new PWAChecklist(powerfulPWAs, document.querySelectorAll('.api'), language);
  }
});

// Components not critical to user experience should be loaded on `load`
window.addEventListener('load', async () => {
  const subnav = document.querySelector('.subnav');
  const hero = document.querySelector('.hero-animated');
  const thankYou = document.querySelector('.thank-you');
  const tables = document.querySelectorAll('table');
  const embeddedVideo = document.querySelectorAll('.article__video-link');

  if (embeddedVideo) {
    const { VideoHotswap } = await import('./components/video-hotswap');
    new VideoHotswap(embeddedVideo);
  }

  if (thankYou) {
    const { ThankYou } = await import('./components/thank-you');
    new ThankYou(thankYou);
  }

  if (subnav) {
    const { Subnav } = await import('./components/subnav');
    new Subnav(subnav);
  }

  if (hero) {
    // Loads the component first to track changes in the HTML elements, then loads the library and the animation data.
    const { HeroAnimated } = await import('./components/hero-animated');
    new HeroAnimated(hero);
  }

  if (tables) {
    const { ResponsiveTable } = await import('./components/responsive-table');

    for (const table of tables) {
      new ResponsiveTable(table);
    }
  }

  const { Tracking } = await import('./lib/tracking');
  window.tracking = new Tracking(gtag);

  if (import.meta.env.MODE === 'production') {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js');
    }
  }

  const { M100 } = await import('./components/ee');
  window.m100 = new M100();
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('message', async (event) => {
    console.log('Message!');
    // Optional: ensure the message came from workbox-broadcast-update
    if (event.data.meta === 'workbox-broadcast-update') {
      const { offerPageReload } = await import('./lib/offer-page-reload');
      offerPageReload();
    }
  });
}

// // Manage Service Worker
// // eslint-disable-next-line no-constant-condition
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', async () => {
//     try {
//       await navigator.serviceWorker.register('/sw.js');
//       //       // log('Service Worker registered! 😎');
//       //       // log(registration);

//       //       // Only offer reloads if there is already an active Service Worker
//       //       if (registration.active) {
//       //         const { offerServiceWorkerReload } = await import('./lib/offer-service-worker-reload');
//       //         offerServiceWorkerReload(registration);
//       //       }
//     } catch (e) {
//       // log('Registration failed 😫');
//       // log(e);
//     }
//   });
// }
