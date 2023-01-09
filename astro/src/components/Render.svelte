<script>
  import { PortableText } from "@portabletext/svelte";
  import Heading from "./block/Heading.svelte";
  import Statlist from "./block/Statlist.svelte";

  export let value = [];

  const components = {
    block: {
      h2: Heading,
    },
    types: {
      statlist: Statlist,
    },
  };
</script>

<PortableText {value} {components} />
