<script lang="ts">
  import type { PortableTextObject } from '@sanity/types';
  import { slugify } from '$lib/data';

  export let block: PortableTextObject;

  /**
   * Get the text from a PortableText node
   * @param {PortableTextObject} child
   * @return {string}
   */
  function getHeaderText(child: PortableTextObject) {
    let content = '';
    if (child.text) {
      content = child.text as string;
    } else if (child.children) {
      content += child.children.map(getHeaderText).join('') as string;
    }
    return content;
  }

  const style = block?.style as 'string';
  const text = getHeaderText(block);
  const id = slugify(text);
</script>

<svelte:element this={style} {id} class="header-anchor--wrapper">
  <a href="#{id}" class="header-anchor">{text}</a></svelte:element
>
