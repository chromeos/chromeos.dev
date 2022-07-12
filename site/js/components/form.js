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
 * Bootstraps form
 */
export class Form {
  /**
   *
   * Constructor function.
   * @param {HTMLElement} element - Element to use as the Form
   */
  constructor(element) {
    // Create a set of constants to be reused throughout the class.
    const constants = {
      formSelector: '.form__wrapper',
      successTemplate: '#message--success',
      fieldSelector: '.form__field',
      buttonSelector: '.form__button',
      loaderSelector: '.form__button-icon',
      fieldWrapperSelector: '.form__item',
      errorOfflineSelector: '.form__error--offline',
      errorServerSelector: '.form__error--server',
      labelTopClass: 'form__item--label-on-top',
      fieldInvalidClass: 'form__item--invalid',
      fieldFocusClass: 'form__item--focus',
      showErrorClass: 'form__error--show',
      disableFormClass: 'form--disabled',
      buttonLoaderClass: 'form__button--loader',
      serverError: 'Something went wrong on our end. Please try again later.',
      redirectUrl: `/${document.documentElement.lang}/thank-you`,
      redirectionDelay: 2000,
    };

    this.constants_ = Object.freeze(constants);
    this.parent_ = element;
    this.elem_ = element.querySelector(this.constants_.formSelector);
    this.id_ = this.elem_.getAttribute('id');
    this.fields_ = this.elem_.querySelectorAll(this.constants_.fieldSelector);
    this.button_ = this.elem_.querySelector(this.constants_.buttonSelector);
    this.loader_ = this.elem_.querySelector(this.constants_.loaderSelector);
    this.copy_ = element.querySelector(this.constants_.formCopy);
    this.success_ = document.getElementById('message--success').content.cloneNode(true);

    this.init_();
    this.toggleOnline_();
    window.addEventListener('offline', this.toggleOnline_.bind(this));
    window.addEventListener('online', this.toggleOnline_.bind(this));
  }

  /**
   *
   * Init function.
   * @private
   */
  init_() {
    // init form with javascript support.
    this.initAnimationLabel();
    this.elem_.setAttribute('novalidate', '');

    for (const field of this.fields_) {
      field.addEventListener('focus', this.animateLabel_.bind(this));
      field.addEventListener('blur', this.blurHandler_.bind(this));
    }

    this.elem_.addEventListener('submit', this.submitForm_.bind(this));
    this.elem_.reset();
  }

  /**
   * Remove animatable modifier in order to support disable javascript browsers.
   * @private
   */
  initAnimationLabel() {
    for (const field of this.fields_) {
      field.closest(this.constants_.fieldWrapperSelector).classList.remove(this.constants_.labelTopClass);
    }
  }

  /**
   *
   * @param {Event} event - JavaScript event.
   * @private
   */
  blurHandler_(event) {
    // Remove trailing white space in values
    event.target.value = event.target.value.trim().replace(/\s{2,}/g, ' ');

    this.animateLabel_(event);
    this.validateField_(event.target);
  }

  /**
   *
   * @param {Event} event - JavaScript event.
   * @private
   */
  animateLabel_(event) {
    const elementWrapper = event.target.closest(this.constants_.fieldWrapperSelector);

    this.resetField_(event.target, elementWrapper);
    elementWrapper.classList.toggle(this.constants_.fieldFocusClass);

    if (event.target.value.length === 0) {
      elementWrapper.classList.toggle(this.constants_.labelTopClass);
    }
  }

  /**
   * @param {HTMLElement} element - field element.
   * @param {HTMLElement} elementWrapper - Wrapper of field element.
   * @private
   */
  showErrors_(element, elementWrapper) {
    elementWrapper.classList.add(this.constants_.fieldInvalidClass);
    element.setAttribute('aria-invalid', true);
  }

  /**
   * @param {Object} element - field element.
   * @param {Object} elementWrapper - Wrapper of field element.
   * @private
   */
  resetField_(element, elementWrapper) {
    elementWrapper.classList.remove(this.constants_.fieldInvalidClass);
    element.setAttribute('aria-invalid', false);
  }

  /**
   *
   * @param {HTMLElement} element - JavaScript element.
   * @private
   */
  validateField_(element) {
    const elementWrapper = element.closest(this.constants_.fieldWrapperSelector);

    if (!element.checkValidity()) {
      this.showErrors_(element, elementWrapper);
    } else {
      this.resetField_(element, elementWrapper);
    }
  }

  /**
   * Toggles the form to either offline (disabled/error message) or online (enabled)
   * @return {boolean} - Returns `true` if online, otherwise returns `false`
   */
  toggleOnline_() {
    const offline = this.parent_.querySelector(this.constants_.errorOfflineSelector);

    if (navigator && !navigator.onLine) {
      offline.classList.add(this.constants_.showErrorClass);
      this.disableFormElements_();

      return false;
    }

    offline.classList.remove(this.constants_.showErrorClass);
    this.enableFormElements_();
    return true;
  }

  /**
   * Show server errors.
   * @private
   */
  showServerError_() {
    const online = this.toggleOnline_();

    if (online) {
      this.parent_.querySelector(this.constants_.errorServerSelector).classList.add(this.constants_.showErrorClass);
      this.handleLoaderVisibility_();
    }
  }

  /**
   * Handles the autorized response.
   * @param {Response} response - The fetch response object.
   * @param {String} response.result - Result string from response
   * @param {String[]} response.[error] - Validation errors (optional)
   * @private
   */
  handleAuthorizedResponse_({ result, errors }) {
    switch (result) {
      case 'accepted':
        this.displayMessage_();
        this.enableFormElements_();
        this.handleLoaderVisibility_();
        break;

      case 'invalid':
        this.handleInvalidBackendResponse_(errors);
        break;

      default:
        this.showServerError_();
    }
  }

  /**
   * Handles the loader.
   * @private
   */
  handleLoaderVisibility_() {
    if (this.loader_) {
      this.button_.classList.toggle(this.constants_.buttonLoaderClass);
    }
  }

  /**
   * Handles invalid formbox response for field validation.
   * @param {Array} errors - Errors from response.
   * @private
   */
  handleInvalidBackendResponse_(errors) {
    Object.keys(errors).forEach((name) => {
      const selectorField = document.querySelector(`[name=${name}]`);
      const elementWrapper = selectorField.closest(this.constants_.fieldWrapperSelector);

      this.showErrors_(selectorField, elementWrapper);
    });

    this.enableFormElements_();
    this.handleLoaderVisibility_();
  }

  /**
   * Gets ready the HTTP request and extract the form data to submitted.
   * @param {Object} data - URLSearchParams object instance.
   * @return {Object} fetch request.
   * @private
   */
  sendData_(data) {
    return fetch(this.elem_.action, {
      method: this.elem_.method,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: data,
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(this.constants_.serverError);
        }

        return response.json();
      })
      .then(this.handleAuthorizedResponse_.bind(this))
      .catch(this.showServerError_.bind(this));
  }

  /**
   * Jump to the first invalid field.
   * @private
   */
  focusFirstInvalidField_() {
    const el = this.elem_.querySelector('[aria-invalid="true"]');

    el.focus();
    el.closest(this.constants_.fieldWrapperSelector).classList.remove(this.constants_.fieldInvalidClass);
  }

  /**
   * Disable form, button and fields.
   * @private
   */
  disableFormElements_() {
    for (const field of this.fields_) {
      field.setAttribute('disabled', 'disabled');
    }
    this.elem_.classList.add(this.constants_.disableFormClass);
    this.button_.setAttribute('disabled', 'disabled');
  }

  /**
   * Enable form, button and fields.
   * @private
   */
  enableFormElements_() {
    for (const field of this.fields_) {
      field.removeAttribute('disabled', 'disabled');
    }
    this.elem_.classList.remove(this.constants_.disableFormClass);
    this.button_.removeAttribute('disabled', 'disabled');
  }

  /**
   *
   * Submit form.
   * @param {Event} event - JavaScript event.
   */
  submitForm_(event) {
    const data = new URLSearchParams(new FormData(this.elem_));
    const formValid = this.elem_.checkValidity();
    event.preventDefault();

    this.disableFormElements_();

    if (formValid) {
      this.handleLoaderVisibility_();
      this.sendData_(data).bind(this);
    } else {
      this.enableFormElements_();

      for (const field of this.fields_) {
        this.validateField_(field);
      }

      this.focusFirstInvalidField_();
    }
  }

  /**
   * Displays an in-line success message
   */
  displayMessage_() {
    const message = this.success_;
    const content = message.textContent;

    let referrer = {};

    try {
      referrer = new URL(document.referrer);
      if (referrer.href === window.location.href || referrer.origin !== window.location.origin) {
        referrer = false;
      }
    } catch (e) {
      referrer = false;
    }

    const holder = document.createElement('p');

    if (referrer !== false) {
      holder.innerHTML = content.replace(/\[\[([\w|\s]*?)\]\]/, `<a href="${referrer.href}">$1</a>`);
    } else {
      holder.innerHTML = content.replace(/\s*\[\[([\w|\s]*?)\]\]\s*\W/, '');
    }

    holder.classList.add('message', 'form__message', 'message--tip');

    window.tracking.sendEvent('form_submit_success', {
      form_id: this.id_,
      form_referrer: referrer ? referrer.toString() : '',
    });

    this.elem_.parentNode.insertBefore(holder, this.elem_);
  }
}
