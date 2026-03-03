// @ts-check
import sugarcube from "@sugarcube-sh/vite";
import { defineConfig, fontProviders } from "astro/config";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  experimental: {
    fonts: [
      {
        name: "Manrope",
        cssVariable: "--font-manrope",
        provider: fontProviders.fontsource(),
      },
      {
        name: "Inter",
        cssVariable: "--font-inter",
        provider: fontProviders.google(),
      },
      {
        name: "IBM Plex Mono",
        cssVariable: "--font-plex-mono",
        provider: fontProviders.google(),
      },
    ],
    preserveScriptOrder: true,
  },
  integrations: [sitemap()],
  site: "https://jguillau.me",
  vite: {
    plugins: [sugarcube()],
  },
});
