import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config'

export default defineConfig({
  site: 'https://frenchtechlead.com',
  integrations: [sitemap(), preact()]
});