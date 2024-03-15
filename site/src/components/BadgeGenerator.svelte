<script lang="ts">
  import Input from "./Input.svelte";
  /**
   * TODO:
   * 
   * Importing Code throws a client-side error and breaks this component.
   * It appears to be due to an issue with prismjs.
  */
  // import Code from "$components/portable-text/Code.svelte";
  import type { Field, Image, Microcopy } from "$types/sanity";
  import Generic from "./ctas/Generic.svelte";
  import Download from "./icons/Download.svelte";

  export let heading: string;
  export let download: {
    text: string;
    link: string;
  };
  export let typeLabel: string;
  export let attributionLabel: string;
  export let attribution: string;
  export let fields: Array<{
    name: string;
    label: string;
    required: boolean;
    value?: string;
    field: {
      type: Field["type"];
      options: string[];
    };
    text?: {
      required?: string;
      error?: string;
    };
  }>;
  export let microcopy: Microcopy;
  export let badges: Array<{
    name: string;
    language: string;
    image: Image
  }>

  const parsedFields = fields.map((f) => {
    const field = {
      type: f.field.type,
      label: f.label,
      name: f.name,
      required: f.required || false,
      options: f.field.options?.map((o) => {
        return {
          value: o,
          text: o
        }
      }),
      value: f.value,
      text: {
        required: f.text?.error || microcopy.actions.required,
        error: f.text?.error,
      }
    }

    return field;
  });

  const languageOptions = Array.from(new Set(badges.map((b) => b.language)));
  const urlFallback = "https://play.google.com/store/123";
  const sourceFallback = "UTM_SOURCE";
  const campaignFallback = "UTM_CAMPAIGN";
  const altFallback = "Get it on Chromebook";
  const srcFallback = "cms://path-to-file.png";

  let selectedLanguage = languageOptions[0].toLowerCase();
  let urlValue = urlFallback;
  let sourceValue = sourceFallback;
  let campaignValue = campaignFallback;
  let derivedBadges = badges.filter((b) => b.language.toLowerCase() === selectedLanguage);

  function handleInputChange(e) {
    const { name: n, value } = e.detail.target;
    const name = n.toLowerCase();

    if (name === "language") {
      selectedLanguage = value;
    }

    if (name === "url") {
      urlValue = value;
    }

    if (name === "source") {
      sourceValue = value;
    }

    if (name === "campaign") {
      campaignValue = value;
    }
  }

  $: derivedBadges = badges.filter((b) => {
    return b.language.toLowerCase() === selectedLanguage
  });

  let badgeType = derivedBadges[0].name;

  $: badgeMarkup = `
  <a href="${urlValue || urlFallback}?utm_source=${sourceValue || sourceFallback}&utm_campaign=${campaignValue || campaignValue}">
    <img
      alt="${derivedBadges.find((b) => b.name === badgeType).image.alt || altFallback}"
      src="${derivedBadges.find((b) => b.name === badgeType).image.image || srcFallback}"
    />
  </a>`
</script>

<section class="badge-generator--wrapper">
  <header class="badge-generator--header">
    <h2 class="badge-generator--heading type--h2">{heading}</h2>
    <a class="badge-generator--download-link" href={download.link} download>{download.text}<Download /></a>
  </header>
  <form class="badge-generator--form">
    <div class="badge-generator--form-left">
      <div class="badge-generator--field">
        <Input
          input={{
            type: 'select',
            label: 'Language',
            name: "language",
            required: true,
            options: languageOptions.map((o) => ({
              value: o.toLowerCase(),
              text: o
            })),
            text: {
              required: microcopy.actions.required,
            }
          }}
          on:change={handleInputChange}
        />
      </div>
      <div class="badge-generator--radio-group badge-generator--field">
        <span class="badge-generator--radio-heading type--caption">{typeLabel}</span>
        {#each derivedBadges as badge (badge.name)}
          <span class="badge-generator--radio">
            <input
              id="input-badge-{badge.name}"
              name="badge-type"
              type="radio"
              value={badge.name}
              bind:group={badgeType}
              hidden
            />
            <label class="badge-generator--radio-label" for="input-badge-{badge.name}">
              <!-- TODO: Svelte hydration breaks posthtml img srcs here -->
              <img src={badge.image.image} alt={badge.name} draggable="false" />
              <Generic
                cta={{
                  type: "low",
                  url: "",
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
        <span class="badge-generator--radio-heading type--caption">{attributionLabel}</span>
        <span class="badge-generator--attribution-text">
          {attribution}
        </span>
      </div>
    </div>
    <div class="badge-generator--form-right">
      <!-- TODO: Swap w/ <Code /> once prismjs issue is resolved. -->
      <pre>
        <code>
          {badgeMarkup}
        </code>
      </pre>
      <!-- <Code
        block={{
          code: badgeMarkup,
          language: 'html',
        }}
      /> -->
      {#each parsedFields as field (field.name)}
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
      /* TODO - Should we add this to $google-colors or use an existing one that's similar? */
      color: #3665F3;

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
      pre, // TODO: remove `pre` when Code component is used
      :global(.code-figure) {
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
      padding: 1rem;
      border: 1px solid var(--grey-700);
      border-radius: 0.25rem;
      font-size: 1rem;
      line-height: normal;
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
        /* TODO - Design specified value was barely different from blue-50. Do we want to add a new shade? */
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
        color: var(--grey-850);
      }
    }
  }
</style>