import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  site: "https://frenchtechlead.com",
  integrations: [sitemap(), mdx(), preact()],
});
