<script lang="ts">
  import Input from './Input.svelte';
  /**
   * TODO:
   *
   * Importing Code throws a client-side error and breaks this component.
   * It appears to be due to an issue with prismjs.
   */
  import Generic from './ctas/Generic.svelte';
  import Download from './icons/Download.svelte';

  export let codegen;
  export let required: string;

  const fields = [
    {
      type: 'text',
      label: codegen.fields.url,
      name: 'url',
      required: true,
      text: {
        required,
      },
    },
    {
      type: 'text',
      label: codegen.fields.source,
      name: 'source',
    },
    {
      type: 'text',
      label: codegen.fields.campaign,
      name: 'campaign',
    },
  ];

  const languages = [
    {
      value: 'en',
      text: 'English',
    },
    {
      value: 'es',
      text: 'Spanish',
    },
    {
      value: 'fr',
      text: 'French',
    },
    {
      value: 'de',
      text: 'German',
    },
    {
      value: 'it',
      text: 'Italian',
    },
  ];

  let language = 'en';
  let url = 'https://chromeos.dev';
  let source = 'badge';
  let campaign = 'add-to';
  let type = 'primary';

  /**
   * Handle form input changes
   * @param {Event} e
   */
  function handleInputChange(e) {
    const { name: n, value } = e?.detail?.target || e.target;
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
  }

  let badgeURL = url;

  $: badgeURL = `${url}?utm_source=${source}&utm_campaign=${campaign}`;
  $: badgeSrc = `https://${type}.svg?language=${language?.toLowerCase().slice(0, 2)}`;

  $: badges = [
    {
      id: 'primary',
      name: codegen.type.primary,
      image: `/badges/primary.svg?lang=${language}`,
    },
    {
      id: 'secondary',
      name: codegen.type.secondary,
      image: `/badges/secondary.svg?lang=${language}`,
    },
  ];
</script>

<section class="badge-generator--wrapper">
  <header class="badge-generator--header">
    <h2 class="badge-generator--heading type--h2">{codegen.heading}</h2>
    <a
      class="badge-generator--download-link"
      href="https://chromeos.dev"
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
            value: languages[0].value,
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
              <img src={badge.image} alt={badge.name} draggable="false" />
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
      <div class="badge-generator--attribution badge-generator--field">
        <span class="badge-generator--radio-heading type--caption"
          >{codegen.attribution.label}</span
        >
        <span class="badge-generator--attribution-text">
          {codegen.attribution.copy}
        </span>
      </div>
    </div>
    <div class="badge-generator--form-right">
      <figure class="code-figure">
        <figcaption class="type--label code-figure--caption type--label">
          html
        </figcaption>
        <pre class="language--html"><code class="language--html"
            ><span class="token tag"
              ><span class="token tag"
                ><span class="token punctuation">&lt;</span>a</span
              > <span class="token attr-name">href</span><span
                class="token attr-value"
                ><span class="token punctuation attr-equals">=</span><span
                  class="token punctuation">"</span
                >{badgeURL}<span class="token punctuation">"</span></span
              ><span class="token punctuation">&gt;</span></span
            >
  <span class="token tag"
              ><span class="token tag"
                ><span class="token punctuation">&lt;</span>img</span
              > <span class="token attr-name">src</span><span
                class="token attr-value"
                ><span class="token punctuation attr-equals">=</span><span
                  class="token punctuation">"</span
                >{badgeSrc}<span class="token punctuation">"</span></span
              ><span class="token attr-name"> alt</span><span
                class="token attr-value"
                ><span class="token punctuation attr-equals">=</span><span
                  class="token punctuation">"</span
                >{codegen.alt}<span class="token punctuation">"</span></span
              ><span class="token punctuation">/&gt;</span></span
            >
<span class="token tag"
              ><span class="token tag"
                ><span class="token punctuation">&lt;/</span>a</span
              ><span class="token punctuation">&gt;</span></span
            ></code
          ></pre>
      </figure>

      {#each fields as field}
        <div class="badge-generator--field">
          <Input input={field} on:keyup={handleInputChange} />
        </div>
      {/each}
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
      margin-block-end: 3.25rem;
    }

    &--form-left,
    &--form-right {
      display: flex;
      flex-wrap: wrap;
      flex: 1 0 auto;
      max-width: 100%;
      gap: 1.25rem;

      .badge-generator--field {
        &:last-of-type {
          align-self: end;
        }
      }
    }

    &--form-left {
      .badge-generator--field {
        flex-basis: 100%;
      }
    }

    &--form-right {
      .code-figure {
        width: 100%;
        max-width: 100cqi;
      }

      .badge-generator--field {
        align-self: end;

        &:first-of-type {
          align-self: start;
          flex-basis: 100%;
        }
      }
    }

    &--field {
      flex-grow: 1;
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

      img {
        max-width: 146px;
      }

      &:has(input:checked) {
        background-color: var(--blue-50);
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

      :checked ~ & {
        :global(.cta) {
          :global([data-theme='dark']) & {
            color: var(--phosphor-gray);
          }
        }
      }
    }
  }
</style>
