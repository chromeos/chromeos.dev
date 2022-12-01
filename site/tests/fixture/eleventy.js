/**
 *
 * @callback callback
 * @param {...any} params
 */
class EleventyConfig {
  /**
   * Contructor.
   */
  constructor() {
    this.added_ = {
      collections: {},
      filters: {},
      transforms: {},
    };
  }

  /**
   *
   * @param {string} name Name of the collection.
   * @param {array[]} collection Array with data simulation a collection.
   */
  addCollection(name, collection) {
    this.added_.collections[name] = collection;
  }

  /**
   *
   * @param {string} name Name of the filter.
   * @param {callback} cb Filter callback.
   */
  addFilter(name, cb) {
    this.added_.filters[name] = cb;
  }

  /**
   *
   * @param {string} name Name of the callback.
   * @param {callback} cb Transform callback.
   */
  addTransform(name, cb) {
    this.added_.transforms[name] = cb;
  }

  /**
   *
   * @param {string} name Name of the callback.
   * @return {array[]}
   */
  callCollection(name) {
    return this.added_.collections[name];
  }

  /**
   *
   * @param {string} name Name of the callback.
   * @param  {...any} params Parameters for the callback.
   * @return {any}
   */
  callFilter(name, ...params) {
    return this.added_.filters[name](...params);
  }

  /**
   *
   * @param {string} name Name of the callback.
   * @param  {...any} params Parameters for the callback.
   * @return {any}
   */
  callTransform(name, ...params) {
    return this.added_.transforms[name](...params);
  }
}

module.exports = EleventyConfig;
