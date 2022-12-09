import { preferences } from 'service-worker-i18n-redirect/preferences';
import { getData } from '../lib/data';

/**
 * PWA Checklist
 */
export class PWAChecklist {
  /**
   *
   * @param {HTMLElement} anchor - Anchor element to attach PWA checklist to
   * @param {HTMLElement[]} apis - List of APIs to include in the checklist
   * @param {string} language - Language the checklist is in
   */
  constructor(anchor, apis, language) {
    this.data = {};
    this.anchor = anchor.closest('section');
    this.apis = [];
    this.language = language;
    this.checked = [];

    apis.forEach((api, i) => {
      const link = api.querySelector('a');
      const id = link.dataset.id;
      api.id = `api--${link.dataset.id}`;

      this.apis.push({
        name: link.textContent,
        type: (api.dataset.categories || '').split(', '),
        id,
      });
    });

    this.init();
  }

  /**
   * Asynchronous initializer for APIs
   */
  async init() {
    // Get i18n data
    const powerfulPWAs = await getData('powerfulPWAs', this.language);
    const { actions } = await getData('microcopy', this.language);
    const saved = await preferences.get('pwa-checklist');

    this.copy = Object.assign(powerfulPWAs, actions);

    let availableInit = [...this.apis];
    let usedInit = [];

    if (saved) {
      availableInit = [...this.apis].filter((api) => saved.available.includes(api.id));
      usedInit = [...this.apis].filter((api) => saved.used.includes(api.id));
      if (saved.checked) {
        this.checked = saved.checked;
      }
    }

    // Initialize the checklist
    const updater = this.buildLists.bind(this);
    const checked = this.checked;
    this.checklist = new Proxy(
      {
        available: availableInit,
        used: usedInit,
      },
      {
        async set(target, key, val) {
          target[key] = val;
          if (key === 'used') {
            updater();
            await preferences.set('pwa-checklist', {
              available: target.available.map((i) => i.id),
              used: val.map((i) => i.id),
              checked,
            });
          } else {
            await preferences.set('pwa-checklist', {
              available: val.map((i) => i.id),
              used: target.used.map((i) => i.id),
              checked,
            });
          }
          return true;
        },
      },
    );

    // Build checklist UI
    const swing = document.createElement('details');
    swing.innerHTML = `<summary>${this.copy.microcopy.available}</summary>`;

    const categories = document.createElement('ul');
    categories.classList.add('pwa-checklist');
    for (const [id, category] of Object.entries(this.copy.categories)) {
      const c = document.createElement('li');
      c.classList.add('pwa-checklist--category');
      c.innerHTML = `<h3>${category.name}</h3><p>${category.description}</p>`;
      const btn = document.createElement('button');
      btn.classList.add('pwa-checklist--add-category', 'cta', 'cta--medium');
      btn.textContent = this.copy.microcopy.active;
      c.appendChild(btn);
      btn.addEventListener('click', this.addCategory(id).bind(this));
      categories.appendChild(c);
    }

    const checklistForm = document.createElement('form');
    checklistForm.classList.add('pwa-checklist__form');
    const reset = document.createElement('button');
    reset.textContent = this.copy.reset;
    reset.classList.add('pwa-checklist--reset', 'cta', 'cta--low');

    const available = document.createElement('ul');
    available.classList.add('pwa-checklist');
    const used = document.createElement('ul');
    used.classList.add('pwa-checklist', 'pwa-checklist__checks');
    swing.appendChild(available);
    this.anchor.appendChild(categories);
    checklistForm.appendChild(swing);
    checklistForm.appendChild(used);
    checklistForm.appendChild(reset);
    this.anchor.appendChild(checklistForm);
    this.available = available;
    this.used = used;
    this.swing = swing;

    reset.addEventListener('click', this.reset.bind(this));

    this.buildLists();
  }

  /**
   *
   * @param {Event} e - Click event
   */
  reset(e) {
    e.preventDefault();
    this.checklist.available = [...this.apis];
    this.checklist.used = [];
    this.checked = [];
    preferences.set('pwa-checklist', null);
  }

  /**
   *
   * @param {Event} e - click event
   */
  scrollToID(e) {
    e.preventDefault();
    const href = new URL(e.target.closest('a').href).hash;
    document.querySelector(href).scrollIntoView({ block: 'center' });
  }

  /**
   *
   * @param {string} category - Category to add
   * @return {function}
   */
  addCategory(category) {
    /**
     * @param {Event} e - Event
     */
    return (e) => {
      e.preventDefault();
      const available = [...this.apis];
      const used = [];

      // Set up used and available
      this.apis
        .filter((api) => api.type.includes(category))
        .forEach((api) => {
          used.push(api);
          available.splice(
            available.findIndex((i) => i.id === api.id),
            1,
          );
        });

      this.checklist.available = available;
      this.checklist.used = used;
      this.swing.removeAttribute('open');
    };
  }

  /**
   *
   */
  buildLists() {
    if (this.checklist.used.length === 0) {
      this.swing.setAttribute('open', true);
    }

    // Available
    const list = this.available;
    list.innerHTML = '';
    for (const api of this.checklist.available) {
      const item = document.createElement('li');
      item.classList.add('pwa-checklist--item', 'pwa-checklist--available');
      item.dataset.id = api.id;
      const innerLink = document.createElement('a');
      innerLink.href = `#api--${api.id}`;
      innerLink.classList.add('pwa-checklist--api');
      innerLink.innerHTML = `<span>${api.name}</span>`;
      const itemAdd = document.createElement('button');
      itemAdd.classList.add('pwa-checklist--action');
      itemAdd.setAttribute('aria-label', this.copy.add);
      itemAdd.innerHTML = `<svg role="img" aria-hidden="true" class="icon"><use xlink:href="/images/icons/sprite.svg#add"></use></svg>`;
      itemAdd.classList.add('pwa-checklist--add');
      item.appendChild(innerLink);
      item.appendChild(itemAdd);
      list.appendChild(item);

      innerLink.addEventListener('click', this.scrollToID.bind(this));
      itemAdd.addEventListener('click', this.toggleAPI.bind(this));
    }

    // Used
    const used = this.used;
    used.innerHTML = '';
    for (const api of this.checklist.used) {
      const item = document.createElement('li');
      item.classList.add('pwa-checklist--item', 'form__item', 'form__item-checkbox');
      item.dataset.id = api.id;
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.classList.add('pwa-checklist--checkbox', 'form__field', 'form__field--input');
      checkbox.setAttribute('aria-labelledby', `label--${api.id}`);
      checkbox.id = `checkbox--${api.id}`;
      if (this.checked.includes(`checkbox--${api.id}`)) {
        checkbox.checked = true;
      }
      const label = document.createElement('div');
      label.classList.add('form__label', 'pwa-checklist--label');
      const innerLink = document.createElement('a');
      innerLink.id = `label--${api.id}`;
      innerLink.href = `#api--${api.id}`;
      innerLink.classList.add('pwa-checklist--api');
      innerLink.innerHTML = `<span>${api.name}</span>`;
      const itemRemove = document.createElement('button');
      itemRemove.classList.add('pwa-checklist--action');
      itemRemove.setAttribute('aria-label', this.copy.remove);
      itemRemove.innerHTML = `<svg role="img" aria-hidden="true" class="icon"><use xlink:href="/images/icons/sprite.svg#close"></use></svg>`;
      itemRemove.classList.add('pwa-checklist--add');
      item.appendChild(checkbox);
      label.appendChild(innerLink);
      label.appendChild(itemRemove);
      item.appendChild(label);
      used.appendChild(item);

      innerLink.addEventListener('click', this.scrollToID.bind(this));
      itemRemove.addEventListener('click', this.toggleAPI.bind(this));
      checkbox.addEventListener('click', this.toggleChecked.bind(this));
    }
  }

  /**
   *
   * @param {Event} e - click event
   */
  async toggleChecked(e) {
    const target = e.target.closest('.pwa-checklist--checkbox');
    if (target.checked) {
      this.checked.push(target.id);
    } else {
      this.checked.splice(
        this.checked.findIndex((c) => c === target.id),
        1,
      );
    }

    const prefs = await preferences.get('pwa-checklist');

    preferences.set('pwa-checklist', Object.assign(prefs, { checked: this.checked }));
  }

  /**
   *
   * @param {Event} e - click event
   */
  toggleAPI(e) {
    e.preventDefault();
    const parent = e.target.closest('.pwa-checklist--item');

    const included = this.checklist.used.findIndex((i) => i.id === parent.dataset.id);

    if (included < 0) {
      const item = this.checklist.available.findIndex((i) => i.id === parent.dataset.id);
      this.checklist.used.push(this.checklist.available[item]);
      this.checklist.available.splice(item, 1);
    } else {
      this.checklist.available.push(this.checklist.used[included]);
      this.checklist.used.splice(included, 1);
    }

    this.checklist.used = this.checklist.used; // eslint-disable-line no-self-assign
    this.checklist.available = this.checklist.available; // eslint-disable-line no-self-assign
  }
}
