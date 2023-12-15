<script lang="ts">
  import { onMount } from 'svelte';

  export let title: string;
  export let accept: string;
  export let decline: string;

  let dialog: HTMLDialogElement;
  let acceptButton: HTMLButtonElement;
  const cookieStore = 'chromeos-accepts-cookies--v2';
  let previousActive;

  onMount(() => {
    /* global dataLayer */
    const acceptsCookies = localStorage.getItem(cookieStore);
    previousActive = document.activeElement;

    if (acceptsCookies !== 'true' && acceptsCookies !== 'false') {
      dialog.show();
      acceptButton.focus();
    }

    if (acceptsCookies === 'true' && Array.isArray(dataLayer)) {
      dataLayer.push({ event: 'cookie_consent' });
      dataLayer.push({ cookie_consent: true });
    }
  });

  /**
   * @param {PointerEvent} e Click
   */
  function handleOptions(e: PointerEvent) {
    const { target } = e;
    const { type } = target.closest('button').dataset;

    if (type === 'accept') {
      localStorage.setItem(cookieStore, 'true');
      dataLayer.push({ event: 'cookie_consent' });
      dataLayer.push({ cookie_consent: true });
    } else {
      localStorage.setItem(cookieStore, 'false');
    }

    dialog.close();
  }

  /**
   * @param {KeyboardEvent} e Keydown
   */
  function focusCapture(e: KeyboardEvent) {
    if (dialog.open) {
      if (e.key === 'Escape') {
        dialog.close();
        previousActive.focus();
      }
    }
  }
</script>

<dialog
  bind:this={dialog}
  on:keydown={focusCapture}
  class="cookies"
  aria-label={title}
  aria-describedby="CookieDisclaimer"
>
  <div class="cookies--wrapper">
    <div class="cookies--text">
      <slot />
    </div>

    <div class="cookies--buttons">
      <button class="cta cta--high" on:click={handleOptions} data-type="decline"
        >{decline}</button
      >
      <button
        bind:this={acceptButton}
        on:click={handleOptions}
        class="cta cta--high"
        data-type="accept">{accept}</button
      >
    </div>
  </div>
</dialog>

<style lang="scss">
  .cookies {
    background-color: var(--white);
    border: 0;
    bottom: 0;
    padding: 0;
    position: fixed;
    width: 100%;
    z-index: 10;

    &--wrapper {
      align-items: center;
      display: grid;
      grid-gap: 1rem;
      grid-template-columns: repeat(auto-fit, minmax(28ch, auto));
      justify-content: space-between;
      margin: 0 auto;
      max-width: pxRem(1440px);
      padding: pxRem(24px);

      @supports (padding: clamp(24px, 1vw, 40px)) {
        padding: clamp(24px, 4vw, 40px);
      }
    }

    &--text {
      max-width: 60ch;
    }

    &--buttons {
      display: grid;
      grid-gap: 1rem;
      grid-template-columns: max-content max-content;
    }

    // Fallback for browsers that don't support <dialog> api
    &:not([open]) {
      display: none;
    }
  }
</style>
