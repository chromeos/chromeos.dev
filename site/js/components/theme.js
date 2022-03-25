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
   * @param {string} newName
   * @return {void}
   */
  set name(newName) {
    newName = newName.trim();
    this._name = newName;
    this._elem.setAttribute('data-theme', newName);
    localStorage.setItem('chromeos-theme', newName);
  }

  /**
   *
   * @return {string}
   */
  _getStoredTheme() {
    return localStorage.getItem('chromeos-theme');
  }
}
