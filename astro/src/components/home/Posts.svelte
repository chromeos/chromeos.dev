<script lang="ts">
  import type { CardProps } from '$components/Card.svelte';
  import Card from '$components/Card.svelte';

  export let title: string;
  export let copy: string;
  export let cta: string;
  export let locale: string;
  export let microcopy: any;

  export let posts = [];

  const postcards = posts.map((post) => {
    return {
      title: post.title,
      body: post.description,
      cta: {
        text: microcopy.actions.more,
        url: post._path,
        type: 'link',
      },
      eyebrow: {
        text: post.theme.eyebrow,
        icon: post.theme.icon,
      },
    } as CardProps;
  });
</script>

<section
  class="wrapper wrapper--padding wrapper--padded wrapper--full-bleed wrapper__background wrapper__contained"
>
  <div class="inner">
    <header class="header">
      <h1 class="type--h1">{title}</h1>
      <h2 class="type--large">{copy}</h2>
    </header>
    <ol class="posts">
      {#each postcards as post}
        <li class="posts--item">
          <Card {...post} />
        </li>
      {/each}
    </ol>
    <footer class="footer">
      <a class="cta cta--medium case-studies__cta" href={`/${locale}/news`}
        >{cta}</a
      >
    </footer>
  </div>
</section>

<style lang="scss">
  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  .posts {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(325px, 100%), 1fr));
    gap: 2.5rem 1.5rem;
    justify-items: center;
    list-style: none;
    margin: 0;
    margin-block: 2.5rem;
  }

  .footer {
    margin-top: 2.5rem;
  }

  .cta {
    margin-inline: auto;
    width: max-content;
  }
</style>
