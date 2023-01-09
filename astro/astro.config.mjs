import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";

// https://astro.build/config
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://chromeos.dev",
  integrations: [svelte(), mdx()]
});