/**
 * Site Theme setter and getter
 */
export class Theme {
  /**
   *
   * @param {string} name
   * @return {void}
   */
  constructor(name) {
    this._elem = document.body;
    this._name = name || this._getStoredTheme();
    this._elem.setAttribute('data-theme', this._name);
    this.dispatch();
  }
  /**
   *
   * @return {string}
   */
  get name() {
    return this._name;
  }
  /**
   *
   * @param {string} value
   * @return {void}
   */
  set name(value) {
    value = value?.trim();
    this._name = value;
    this._elem.setAttribute('data-theme', value);
    localStorage.setItem('chromeos-theme', value);
    this.dispatch();
  }

  /**
   * Dispatch a custom event with the current name.
   * @return {void}
   */
  dispatch() {
    this._elem.dispatchEvent(
      new CustomEvent('themechange', {
        detail: {
          name: this._name,
        },
      }),
    );
  }

  /**
   *
   * @return {string}
   */
  _getStoredTheme() {
    return localStorage.getItem('chromeos-theme');
  }
}
