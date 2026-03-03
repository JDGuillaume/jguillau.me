// @ts-check
import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import sugarcube from "@sugarcube-sh/vite";
import { defineConfig, fontProviders } from "astro/config";

export default defineConfig({
  adapter: cloudflare(),
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
  integrations: [sitemap(), mdx()],
  site: "https://jguillau.me",
  vite: {
    plugins: [sugarcube()],
  },
});
