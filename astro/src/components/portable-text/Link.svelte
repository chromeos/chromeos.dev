<script lang="ts">
  import { getReference } from '$lib/helpers/sanity';

  type SourceRef = {
    source: {
      reference: {
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
  };

  interface SourceMark extends SourceRef, Mark {}
  interface UrlMark extends UrlRef, Mark {}
  interface HrefMark extends HrefRef, Mark {}

  export let mark: SourceMark | UrlMark | HrefMark;

  let link = '';

  if (mark?.source) {
    const ref = getReference(mark.source.reference._ref);
    link = ref._path;
  } else if (mark?.url) {
    link = mark.url;
  } else if (mark?.href) {
    link = mark.href;
  }
</script>

<a href={link}><slot /></a>
