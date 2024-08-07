<script lang="ts">
  import Input from './Input.svelte';
  import Generic from './ctas/Generic.svelte';
  import Download from './icons/Download.svelte';

  interface localization {
    code: string;
    a2c: string;
    legal: string;
    name: string;
    rtl: boolean;
  }

  export let codegen;
  export let required: string;
  export let localizations: localization[];
  export let locale: string;

  const languages = localizations.map((l) => ({ value: l.code, text: l.name }));
  $: i18n = localizations.find((l) => l.code === language);

  let language = 'en';
  let url = '';
  let source = '';
  let campaign = '';
  let type = 'primary';
  let dark = false;

  /**
   * Handle form input changes
   * @param {Event} e
   */
  function handleInputChange(e) {
    const { target } = e?.detail || e;
    const { name: n, value } = target;
    const name = n.toLowerCase();

    if (name === 'language') {
      language = value;
    }

    if (name === 'url') {
      url = value;
    }

    if (name === 'source') {
      source = value;
    }

    if (name === 'campaign') {
      campaign = value;
    }

    if (name === 'badge-type') {
      type = value;
    }

    if (name === 'dark') {
      dark = target.checked;
    }
  }

  let badgeURL = url;

  $: badgeURL = `${url}${source || campaign ? '?' : ''}${source ? `utm_source=${source}` : ''}${source && campaign ? '&' : ''}${campaign ? `utm_campaign=${campaign}` : ''}`;
  $: badgeSrc = `https://chromeos.dev/badges/${language}/${type}.svg`;

  $: badges = [
    {
      id: 'primary',
      name: codegen.type.primary,
      image: `/badges/${language}/primary.svg?lang=${language}`,
    },
    {
      id: 'secondary',
      name: codegen.type.secondary,
      image: `/badges/${language}/secondary.svg?lang=${language}`,
    },
  ];
</script>

<section class="badge-generator--wrapper">
  <header class="badge-generator--header">
    <h2 class="badge-generator--heading type--h2">{codegen.heading}</h2>
    <a
      class="badge-generator--download-link"
      href="https://firebasestorage.googleapis.com/v0/b/cros-staging.appspot.com/o/badges.zip?alt=media&token=d63bb452-7b14-4d3c-a8ef-7e640470a188"
      download>{codegen.download}<Download /></a
    >
  </header>
  <form class="badge-generator--form">
    <div class="badge-generator--form-left">
      <div class="badge-generator--field">
        <Input
          input={{
            type: 'select',
            label: codegen.language,
            name: 'language',
            options: languages,
            empty: false,
            value: locale,
          }}
          on:change={handleInputChange}
        />
      </div>
      <div class="badge-generator--radio-group badge-generator--field">
        <span class="badge-generator--radio-heading type--caption"
          >{codegen.type.label}</span
        >
        {#each badges as badge, i}
          <span class="badge-generator--radio">
            <input
              id="input-badge-{badge.id}"
              name="badge-type"
              type="radio"
              value={badge.id}
              hidden
              checked={i === 0}
              on:change={handleInputChange}
            />
            <label
              class="badge-generator--radio-label"
              for="input-badge-{badge.id}"
            >
              <img
                src={badge.image}
                alt={badge.name}
                draggable="false"
                lang={language}
              />
              <Generic
                cta={{
                  type: 'low',
                  url: '',
                  text: badge.name,
                }}
                type="low"
                inline
              />
            </label>
          </span>
        {/each}
      </div>
      <div class="badge-generator--field">
        <Input
          input={{
            type: 'checkbox',
            name: 'dark',
            label: codegen.type.dark,
          }}
          on:change={handleInputChange}
        />
      </div>
      <div class="badge-generator--attribution badge-generator--field">
        <p class="badge-generator--radio-heading type--caption">
          {codegen.attribution.label}
        </p>

        <p
          class="badge-generator--attribution-text"
          dir={i18n.rtl ? 'rtl' : 'ltr'}
          lang={language}
        >
          {i18n.legal}
        </p>
      </div>
    </div>
    <div class="badge-generator--form-right">
      <figure class="code-figure">
        <figcaption class="type--label code-figure--caption type--label">
          html
        </figcaption>
        <pre
          class="shiki material-theme-darker"
          style="background-color:#272822;color:#F8F8F2"
          tabindex="0"><code
            ><span class="line"
              ><span style="color:#F8F8F2">&#x3C;</span><span
                style="color:#F92672">a</span
              ><span style="color:#A6E22E"> href</span><span
                style="color:#F8F8F2">=</span
              ><span style="color:#F8F8F2"
                >"<span style="color:#E6DB74">{badgeURL}</span>"</span
              ><span style="color:#F8F8F2">></span></span
            >
{#if !dark}<span class="line"
                ><span style="color:#F8F8F2">  &#x3C;</span><span
                  style="color:#F92672">img</span
                ><span style="color:#A6E22E"> src</span><span
                  style="color:#F8F8F2">=</span
                ><span style="color:#F8F8F2">"</span><span style="color:#E6DB74"
                  >{badgeSrc}</span
                ><span style="color:#F8F8F2">"</span><span
                  style="color:#A6E22E"> alt</span
                ><span style="color:#F8F8F2">=</span><span style="color:#F8F8F2"
                  >"</span
                ><span style="color:#E6DB74">{i18n.a2c}</span><span
                  style="color:#F8F8F2">"</span
                ><span style="color:#F8F8F2">/></span></span
              >{:else}
              <span class="line"
                ><span style="color:#F8F8F2">  &#x3C;</span><span
                  style="color:#F92672">picture</span
                ><span style="color:#F8F8F2">></span></span
              >
<span class="line"
                ><span style="color:#F8F8F2">    &#x3C;</span><span
                  style="color:#F92672">source</span
                ><span style="color:#A6E22E"> srcset</span><span
                  style="color:#F8F8F2">=</span
                ><span style="color:#F8F8F2">"</span><span style="color:#E6DB74"
                  >https://chromeos.dev/badges/{language}/dark.svg</span
                ><span style="color:#F8F8F2">"</span><span
                  style="color:#A6E22E"> media</span
                ><span style="color:#F8F8F2">=</span><span style="color:#F8F8F2"
                  >"</span
                ><span style="color:#E6DB74">(prefers-color-scheme: dark)</span
                ><span style="color:#F8F8F2">"</span><span style="color:#F8F8F2"
                  >></span
                ></span
              >
<span class="line"
                ><span style="color:#F8F8F2">    &#x3C;</span><span
                  style="color:#F92672">img</span
                ><span style="color:#A6E22E"> src</span><span
                  style="color:#F8F8F2">=</span
                ><span style="color:#F8F8F2">"</span><span style="color:#E6DB74"
                  >{badgeSrc}</span
                ><span style="color:#F8F8F2">"</span><span
                  style="color:#A6E22E"> alt</span
                ><span style="color:#F8F8F2">=</span><span style="color:#F8F8F2"
                  >"</span
                ><span style="color:#E6DB74">{i18n.a2c}</span><span
                  style="color:#F8F8F2">"</span
                ><span style="color:#F8F8F2">/></span></span
              >
<span class="line"
                ><span style="color:#F8F8F2">  &#x3C;/</span><span
                  style="color:#F92672">picture</span
                ><span style="color:#F8F8F2">></span></span
              >{/if}
<span class="line"
              ><span style="color:#F8F8F2">&#x3C;/</span><span
                style="color:#F92672">a</span
              ><span style="color:#F8F8F2">></span></span
            ></code
          ></pre>
      </figure>

      <div class="badge-generator--field">
        <Input
          input={{
            type: 'text',
            label: codegen.fields.url,
            name: 'url',
            required: true,
            text: {
              required,
            },
          }}
          on:keyup={handleInputChange}
        />
      </div>

      <div class="badge-generator--field badge-generator--utm">
        <Input
          input={{
            type: 'text',
            label: codegen.fields.source,
            name: 'source',
          }}
          on:keyup={handleInputChange}
        />

        <Input
          input={{
            type: 'text',
            label: codegen.fields.campaign,
            name: 'campaign',
          }}
          on:keyup={handleInputChange}
        />
      </div>
    </div>
  </form>
</section>

<style lang="scss">
  @import '$sass/shared';

  .badge-generator {
    &--wrapper {
      $switch: 521px;
      --form-grid: unset;
      background: var(--global-background);
      padding: 2.5rem;
      border-radius: 0.625rem;
      max-width: 80rem;
      margin: 0 auto;

      @include elevation(0);
      @include mq($switch) {
        --form-grid: repeat(auto-fit, minmax(380px, 1fr));
      }
    }

    &--header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-block-end: 1.875rem;
    }

    &--download-link {
      display: flex;
      align-items: center;
      font-size: 0.875rem;
      letter-spacing: -0.01em;
      line-height: 1.4;
      color: var(--blue-600);
      fill: currentColor;

      :global(svg) {
        height: 1.25rem;
        width: 1.25rem;
      }

      &:not(:hover) {
        text-decoration: none;
      }
    }

    &--container {
      display: grid;
      grid-template-columns: repeat(2, calc(50% - 0.625rem));
      column-gap: 1.25rem;
    }

    &--form {
      container-name: form;
      container-type: inline-size;
      display: grid;
      grid-template-columns: var(--form-grid);
      gap: 1.25rem;
      padding-block-end: 1rem;
    }

    &--form-left,
    &--form-right {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      align-items: flex-start;
      justify-content: start;
    }

    &--form-right {
      .code-figure {
        width: 100%;
        max-width: 100cqi;
      }
    }

    &--field {
      width: 100%;
    }

    &--utm {
      display: flex;
      flex-wrap: wrap;
      gap: 1.25rem;

      > :global(.input) {
        flex-grow: 1;
      }
    }

    &--attribution {
      display: flex;
      flex-direction: column;
      row-gap: 0.5rem;
    }

    &--attribution-text {
      font-size: 1rem;
      line-height: normal;
      font-style: italic;
    }

    &--radio-group {
      display: flex;
      column-gap: 1.25rem;
      flex-wrap: wrap;
      row-gap: 0.5rem;
    }

    &--radio-heading {
      font-weight: 500;
      flex-basis: 100%;
      color: var(--grey-900);
    }

    &--radio {
      flex: 1 0 0;
      border-radius: 0.625rem;
      transition: background-color 0.2s ease;
      min-width: 186px;
      border: 1px solid transparent;

      img {
        height: 3.125rem;
      }

      &:nth-of-type(2) {
        background-color: var(--blue-50);

        :global([data-theme='dark']) & {
          &:has(input:checked) {
            border-color: var(--phosphor-white);
          }

          :global(.cta) {
            color: var(--phosphor-gray);
          }
        }
      }

      &:has(input:checked) {
        border-color: var(--black);
      }
    }

    &--radio-label {
      display: flex;
      flex-direction: column;
      align-items: center;
      row-gap: 1rem;
      padding-block: 1.5rem;
      text-align: center;
      cursor: pointer;

      :global(.cta) {
        color: var(--grey-900);
      }
    }
  }
</style>
