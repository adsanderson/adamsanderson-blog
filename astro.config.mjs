// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import sentry from "@sentry/astro";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://www.adamsanderson.co.uk",
  integrations: [
    mdx(), 
    sitemap(),
    sentry({
      dsn: process.env.SENTRY_DSN,
      environment: process.env.NODE_ENV || 'development',
    })
  ],
  markdown: {
    syntaxHighlight: 'prism',
  },
  vite: {
    plugins: [tailwindcss()],
  },
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),
});
