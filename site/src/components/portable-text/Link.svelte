<script lang="ts">
  import { getReference } from '$lib/helpers/sanity';

  type SourceRef = {
    source: {
      _url?: string;
      _type?: string;
      reference?: {
        _ref: string;
        _type: string;
      };
    };
  };

  type UrlRef = {
    url: string;
  };

  type HrefRef = {
    href: string;
  };

  type Mark = {
    _type: string;
    _key: string;
    anchor?: string;
  };

  interface SourceMark extends SourceRef, Mark {}
  interface UrlMark extends UrlRef, Mark {}
  interface HrefMark extends HrefRef, Mark {}

  export let mark: SourceMark | UrlMark | HrefMark;

  let link = '';

  if (mark?.source) {
    if (mark?.source?.url) {
      link = mark.source.url;
    } else if (mark?.source?.reference?._ref) {
      const ref = getReference(mark.source.reference._ref);
      link = ref._path;
    }
  } else if (mark?.url) {
    link = mark.url;
  } else if (mark?.href) {
    link = mark.href;
  }

  let url;

  // Build full URLs with anchors
  try {
    url = new URL(link);
  } catch (e) {
    url = new URL(`https://chromeos.dev${link}`);
  }

  if (mark.anchor && !url.hash) {
    url.hash = mark.anchor;
  }

  link = url.toString();
</script>

{#if link === ''}
  <slot />
{:else}
  <a href={link}><slot /></a>
{/if}
