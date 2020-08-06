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
 * Bootstraps the animated hero
 */
export class HeroAnimated {
  /**
   * Creates an instance of HeroAnimated.
   * @param {HTMLElement} element – Hero HTML element.
   */
  constructor(element) {
    // Create a set of constants to be reused throughout the class.
    const constants = {
      wrapperSelector: '.hero-animated__animation',
      animationItemClass: 'hero-animated__animation-item',
      animationDelay: 2000,
      animationName: 'Hero',
    };
    constants.backgroundImageSelector = `img.${constants.animationItemClass}`;
    this.constants_ = Object.freeze(constants);

    this.elem_ = element;
    this.backgroundImage_ = this.elem_.querySelector(this.constants_.backgroundImageSelector);
    this.animation_ = {};

    // Start the animation in case lottie loaded before the background image.
    if (!this.backgroundImage_.complete) {
      this.backgroundImage_.addEventListener('load', this.startIfReady_.bind(this));
    }
  }

  /**
   * Loads the animation.
   * @param {Object} lottie - The lottie library.
   * @param {Object} animationData – The animation data.
   */
  async loadAnimation(lottie, animationData) {
    this.lottie_ = lottie;

    /** @type {AnimationConfig} */
    this.animationConfig_ = {
      container: this.elem_.querySelector(this.constants_.wrapperSelector),
      animType: 'svg',
      loop: true,
      animationData: animationData,
      autoplay: false,
      name: this.constants_.animationName,
      rendererSettings: {
        progressiveLoad: true,
        className: this.constants_.animationItemClass,
      },
    };

    this.init_();
  }

  /**
   * Inits the animation and sets the event handlers.
   */
  init_() {
    this.animation_ = this.lottie_.loadAnimation(this.animationConfig_);
    this.animation_.hide();

    // Animation loaded handlers.
    this.animation_.addEventListener('DOMLoaded', () => {
      this.startIfReady_(this.animation_);
    });

    // Something went wrong handlers.
    this.animation_.addEventListener('error', () => {
      console.error(`Something went wrong and the ${this.animation_.name} animation failed to load! 😭`);
    });

    this.animation_.addEventListener('data_failed', () => {
      console.error(`Something went wrong and the ${this.animation_.name} animation data failed to load! 😭`);
    });
  }

  /**
   * Starts the animation if the background image and the animation are loaded.
   */
  startIfReady_() {
    if (this.backgroundImage_.complete && this.animation_.isLoaded) {
      setTimeout(() => {
        this.animation_.show();
        this.animation_.play();
      }, this.constants_.animationDelay);
    }
  }
}
