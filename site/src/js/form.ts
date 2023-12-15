/**
 * Class for handling forms
 */
export class Form {
  _form: HTMLFormElement;
  _error: HTMLElement;
  _success: HTMLElement;
  _offline: HTMLElement;
  _inputs: NodeListOf<HTMLInputElement | HTMLSelectElement>;
  _buttons: NodeListOf<HTMLButtonElement>;
  /**
   * Sets up a form
   * @param {string} form Selector for form
   * @param {string} error Selector for error message
   * @param {string} success Selector for success message
   * @param {string} offline Selector for offline message
   */
  constructor(form, error, success, offline) {
    this._form = document.querySelector(form);
    this._error = document.querySelector(error);
    this._success = document.querySelector(success);
    this._offline = document.querySelector(offline);
    this._inputs = this._form.querySelectorAll('input, select');
    this._buttons = this._form.querySelectorAll('button');

    this.init();
  }

  /**
   * Initializes the form and its various goodies
   */
  init() {
    // Remove aria-invalid on change
    for (const input of this._inputs) {
      input.addEventListener('change', () =>
        input.removeAttribute('aria-invalid'),
      );
    }

    // Add submit listener
    this._form.addEventListener('submit', this.submit.bind(this));

    // Manage offline state
    window.addEventListener('online', this.offlineToggle.bind(this));
    window.addEventListener('offline', this.offlineToggle.bind(this));
    this.offlineToggle();
  }

  /**
   * Toggles online/offline state
   */
  offlineToggle() {
    const online = window.navigator.onLine;

    if (online) {
      this.disableFields(false);
      this._offline.style.display = 'none';
    } else {
      this.disableFields(true);
      this._offline.style.display = 'block';
    }
  }

  /**
   * Toggles if the form is disabled
   * @param {boolean} disable
   */
  disableFields(disable: boolean) {
    if (disable) {
      for (const button of this._buttons) {
        button.setAttribute('disabled', 'true');
      }
      for (const input of this._inputs) {
        input.setAttribute('disabled', 'true');
      }
    } else {
      for (const button of this._buttons) {
        button.removeAttribute('disabled');
      }
      for (const input of this._inputs) {
        input.removeAttribute('disabled');
      }
    }
  }

  /**
   * Manages form submission
   * @param {SubmitEvent} e
   */
  async submit(e: SubmitEvent) {
    e.preventDefault();

    // Check validity
    let valid = true;
    for (const input of this._inputs) {
      const v = input.checkValidity();

      if (!v) {
        valid = false;
        input.setAttribute('aria-invalid', 'true');
      } else {
        input.removeAttribute('aria-invalid');
      }
    }
    if (!valid) return;

    // Subscribe
    const data = new URLSearchParams(new FormData(this._form));

    this.disableFields(true);

    const response = await fetch(this._form.action, {
      method: this._form.method,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: data,
    });

    if (!response.ok) {
      // Display server error if we don't get a valid response
      this._error.style.display = 'block';
    } else {
      const { result, errors } = await response.json();
      // Show the success message if it's accepted
      // Show individual field errors if there's invalid input
      // Show the error message if it's anything else
      if (result === 'accepted') {
        this._success.style.display = 'block';
        this._form.reset();
      } else if (result === 'invalid') {
        for (const error of Object.keys(errors)) {
          const input = [...this._inputs].find((i) => i.name === error);
          if (input) {
            input.setAttribute('aria-invalid', 'true');
          }
        }
      } else {
        this._error.style.display = 'block';
      }
    }
    this.disableFields(false);
  }
}
