<script lang="ts">
  import { PortableText } from "@portabletext/svelte";
  import type { CustomBlockComponentProps } from "@portabletext/svelte";

  export let portableText: CustomBlockComponentProps<{ style?: boolean }>;

  function getHeaderText(child) {
    let content = "";
    if (child.text) {
      content = child.text;
    } else if (child.children) {
      child.children.forEach((child) => {
        content += getHeaderText(child);
      });
    }
    return content;
  }

  const text = getHeaderText(portableText.value);
  const slug = "#" + text.toLocaleLowerCase().replace(/ /g, "-");
  const style = portableText.value.style;
  console.log(portableText.value);
</script>

<svelte:element this={style} id={slug.substring(1)}
  ><a href={slug}>
    {#each portableText.value.children as child}
      <PortableText value={child} />
    {/each}
  </a></svelte:element
>
