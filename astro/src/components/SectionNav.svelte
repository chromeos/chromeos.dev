<script lang="ts">
  interface Link {
    title: string;
    href: string;
  }

  export let title: string;
  export let links: Array<Link>;
  export let active: string;
</script>

<p class="type--h5">{title}</p>

<ul>
  {#each links as link}
    <li>
      <a href={link.href} data-active={active === link.href ? true : null}
        >{link.title}</a
      >
    </li>
  {/each}
</ul>
