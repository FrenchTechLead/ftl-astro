import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  site: "https://frenchtechlead.com",
  server: {
    port: 3000
  },
  integrations: [
    sitemap(),
    mdx({
      extendPlugins: "markdown",
    }),
    preact(),
  ]
});
