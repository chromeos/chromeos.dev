<script>
  import { extname } from 'path';

  export let src = '';
  export let alt = '';
  export let srcset;
  export let sizes = '100vw';

  const ext = extname(src);
  const isVideo = ext === '.gif';
  const isSVG = ext === '.svg';
  const imageSizes = [250, 400, 550, 700, 850, 1000, 1150, 1300, 1450, 1500];
  let url = normalizeSrc(src);
  if (!isVideo) {
    url += '?auto=format,compress';
  }

  /**
   * Normalize the src to use the imgix domain
   * @param {string} src
   * @return {string}
   */
  function normalizeSrc(src) {
    return src.replace(/^(ix:\/\/)/, 'https://chromeos-dev.imgix.net/');
  }
</script>

{#if isVideo}
  <video
    controls="true"
    loop="true"
    muted="true"
    playsinline="true"
    crossorigin="annonymous"
    autoplay="true"
    title={alt}
  >
    <source src="{url}?fm=webm" type="video/webm" />
    <source src="{url}?fm=mp4" type="video/mp4" />
  </video>
{:else if isSVG}
  <img src={url} {alt} />
{:else}
  <img
    src={url}
    {alt}
    crossorigin="anonymous"
    loading="lazy"
    {sizes}
    srcset={imageSizes.map((size) => `${url}&fit=fillmax&w=${size} ${size}w`)}
  />
{/if}
