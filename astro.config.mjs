// @ts-check

import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  vite: {
      plugins: [tailwindcss()],
	},

  integrations: [react()],
  
  // i18n configuration
  i18n: {
    defaultLocale: 'de',
    locales: ['de', 'en'], // fr, it ready for future
    routing: {
      prefixDefaultLocale: false, // German gets no prefix (falx.ch/)
      redirectToDefaultLocale: true
    }
  }
});