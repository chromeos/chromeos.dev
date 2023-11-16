<script lang="ts">
  interface Languages {
    code: string;
    name: string;
    label: string;
  }

  export let languages: Languages[] = [];
  export let current = '';
  export let label = '';

  let select: HTMLSelectElement;

  /**
   * Change the language of the page
   */
  function changeLanguage() {
    const lang = select.value;
    if (lang !== current) {
      const redirect = window.location.pathname.split('/');
      redirect.splice(1, 1, lang);
      window.location.href = redirect.join('/');
    }
  }
</script>

<select
  bind:this={select}
  name="lang"
  id="lang"
  aria-label={label}
  on:change={changeLanguage}
  class="language-switcher type--tertiary-nav"
>
  {#each languages as lang}
    <option value={lang.code} selected={lang.code === current || null}
      >{lang.name}</option
    >
  {/each}
</select>

<style lang="scss">
  .language-switcher {
    appearance: none;
    background-color: var(--grey-50);
    background-image: url(/images/icons/sprite.svg#arrow-drop-down);
    background-position: right 0% top 50%;
    background-repeat: no-repeat;
    background-size: 24px 24px;
    border: 0;
    border-bottom: 1px solid var(--grey-600);
    border-radius: 0;
    cursor: pointer;
    line-height: normal;
    padding-block: 0.4375rem;
    padding-inline-end: 1.5rem;
    min-width: 10ch;
    max-width: 20ch;
    width: 100%;
  }
</style>
