<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  type Input = {
    type:
      | 'color'
      | 'date'
      | 'datetime-local'
      | 'email'
      | 'hidden'
      | 'image'
      | 'month'
      | 'number'
      | 'password'
      | 'search'
      | 'tel'
      | 'text'
      | 'time'
      | 'url'
      | 'week'
      | 'select'
      | 'checkbox';

    label?: string;
    name: string;
    validation?: string;
    required?: boolean;
    value?: string;
    empty?: boolean;
    text?: {
      required?: string;
      error?: string;
    };
    options?: Array<{
      text: string;
      value?: string;
    }>;
  };

  export let input: Input;
  export let full = false;

  const id = `input-${input.name}`;

  const dispatch = createEventDispatcher();
</script>

<div class={`input input--${input.type} ${full ? 'input__full' : ''}`}>
  <div class="input--group">
    {#if input.type === 'select'}
      <select
        {id}
        class={`input--field input--${input.type}`}
        aria-errormessage={`invalid-${id}`}
        aria-invalid="false"
        required={input.required || null}
        name={input.name}
        placeholder=" "
        value={input.value || null}
        on:change={(e) => dispatch('change', e)}
      >
        {#if input.empty !== false}
          <option selected />
        {/if}
        {#each input.options as option}
          <option value={option.value || option.text}>{option.text}</option>
        {/each}
      </select>
    {:else}
      <input
        type={input.type}
        {id}
        class={`input--field`}
        aria-errormessage={`invalid-${id}`}
        aria-invalid="false"
        required={input.required || null}
        pattern={input.validation || null}
        name={input.name}
        placeholder=" "
        value={input.value || null}
        on:keyup={(e) => dispatch('keyup', e)}
      />
    {/if}

    {#if input.label}
      <label for={id} class="input--label">{input.label}</label>
    {/if}
  </div>
  {#if input.required || input?.text?.error}
    <div class="input--info">
      {#if input?.required}
        <p class="input--description type--small">{input.text.required}</p>
      {/if}
      {#if input?.text?.error}
        <p role="alert" id={`invalid-${id}`} class="input--error type--small">
          {input.text.error}
        </p>
      {/if}
    </div>
  {/if}
</div>

<style lang="scss">
  .input {
    $this: &;
    --border-color: var(--black);

    &:has([disabled]) {
      opacity: 0.5;
    }

    /* stylelint-disable selector-no-qualifying-type */
    &:has(:invalid option[value='']:checked) {
      --border-color: var(--black);
    }

    &:has(:focus),
    &:has(:focus option[value='']:checked) {
      --border-color: var(--blue-600);
    }
    /* stylelint-enable selector-no-qualifying-type */

    &:has(:invalid:not([type='checkbox']):not(select):not(:placeholder-shown)),
    &:has(:invalid option:not([value='']):checked),
    &:has([aria-invalid='true']) {
      /* stylelint-disable-next-line declaration-no-important */
      --border-color: var(--red-600) !important;
    }
    // Is invalid and doesn't have focus
    &:has(
        :invalid:not(:focus):not(select):not([type='checkbox']):not(
            :placeholder-shown
          )
      ),
    &:has(:invalid option:not([value='']):checked),
    &:has([aria-invalid='true']) {
      #{$this}--error {
        display: block;
      }
    }

    &__full {
      grid-column: 1 / -1;
    }

    &--group {
      display: grid;
      position: relative;
    }

    &--label {
      align-self: center;
      grid-column: 1;
      grid-row: 1;
      justify-self: self-start;
      margin-left: calc(1rem - 1px);
      transition: transform 0.2s ease;
      z-index: 1;
    }

    &--field {
      grid-column: 1;
      grid-row: 1;
      font-size: 1rem;
      display: block;
      color: var(--grey-900);
      border: 1px solid var(--grey-700);
      border-radius: 0.25rem;
      background: var(--white);
      padding: 1rem;
      width: 100%;
      font-weight: 400;
      line-height: normal;

      &:focus,
      &:active {
        border-color: var(--border-color);
        box-shadow: 0 0 0 1px var(--border-color);
        outline: none;
      }

      &:invalid {
        border-color: var(--border-color);
      }

      // Label placement
      &:focus,
      &:not(select):not(:placeholder-shown),
      &:has(option:not([value='']):checked) {
        + #{$this}--label {
          transform: translateY(calc(-1.5rem - 1px));
          font-size: 0.75rem;
          background: var(--white);
          padding: 0 0.3125rem;

          #{$this}--checkbox & {
            transform: none;
            font-size: 1rem;
            padding: 0;
            background: none;
            margin: 0;
            margin-inline-start: 1.75rem;
          }

          #{$this}--checkbox:has(:checked) &:after {
            content: '';
            border: solid var(--white);
            border-width: 0 0.125rem 0.125rem 0;
            display: block;
            height: 0.8125rem;
            left: 0.4375rem;
            position: absolute;
            top: 0.15rem;
            transform: rotate(45deg);
            width: 0.4375rem;
          }
        }
      }

      // Label color
      &:focus,
      &:active,
      &:invalid {
        + #{$this}--label {
          color: var(--border-color);
        }
      }
    }

    &--select &--field {
      appearance: none;
      background-image: url('/images/icons/sprite.svg#arrow-drop-down');
      background-position: right 1% top 50%;
      background-repeat: no-repeat;
      background-size: 1.5rem 1.5rem;
      cursor: pointer;
      padding: 1rem 1.8rem 1rem 1rem;
    }

    &--checkbox &--field {
      appearance: none;
      border: 2px solid var(--grey-700);
      border-radius: 2px;
      height: 1.25rem;
      width: 1.25rem;
      padding: 0;

      &:checked {
        background-color: var(--border-color);
        border-color: var(--border-color);
      }
    }

    &--checkbox &--info {
      margin-inline-start: 1.75rem;
    }

    &--info {
      margin-top: 0.5rem;
      display: grid;
    }

    &--error {
      display: none;
      background-color: var(--white);
      color: var(--border-color);
    }

    &--error,
    &--description {
      grid-column: 1;
      grid-row: 1;
    }
  }
</style>
