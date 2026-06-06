import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://mornie.org',
  markdown: {
    shikiConfig: {
      theme: 'monokai',
    },
  },
});
