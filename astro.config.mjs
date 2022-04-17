  import preact from '@astrojs/preact';
  import sitemap from '@astrojs/sitemap';

// @ts-check
export default /** @type {import('astro').AstroUserConfig} */ ({
	// Enable the Preact renderer to support Preact JSX components.
	site: 'https://frenchtechlead.com',
	ibtegrations: [sitemap(), preact()],
});
