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
/**
 * Enables links to videos to be hotswapped with embedded versions
 */
export class VideoHotswap {
  /**
   * @param {HTMLElement[]} elements - The link elements
   */
  constructor(elements) {
    this._elems = [...elements];

    for (const elem of this._elems) {
      elem.addEventListener('click', this.swap.bind(this));
    }

    this._embed = document.createElement('iframe');
    this._embed.classList.add('article__video--embed');
    this._embed.setAttribute('frameborder', '0');
    this._embed.setAttribute('allowfullscreen', 'true');
    this._embed.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
  }

  /**
   * @param {DOMEvent} e - Click event
   */
  swap(e) {
    e.preventDefault();
    const target = e.target.closest('a');
    const parent = target.parentElement;
    const href = target.href?.replace('watch?v=', 'embed/');
    console.log(href);
    const title = target.querySelector('[alt]')?.getAttribute('alt') || '';
    const embed = this._embed.cloneNode(true);
    embed.setAttribute('src', href);
    embed.setAttribute('title', title);
    parent.replaceChild(embed, target);
    console.log(embed.toString());
  }
}

// <iframe width="560" height="315" src="https://www.youtube.com/embed/FPuaaYpUd5s" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
