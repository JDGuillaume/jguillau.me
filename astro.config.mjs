// @ts-check
import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import node from "@astrojs/node";
import sitemap from "@astrojs/sitemap";
import sugarcube from "@sugarcube-sh/vite";
import robotsTxt from "astro-robots-txt";
import { defineConfig, fontProviders } from "astro/config";

// Conditionally run Node adapter during Vitest testing (https://github.com/withastro/astro/issues/15878#issuecomment-4077891588).
const adapter = process.env.VITEST
  ? node({ mode: "standalone" })
  : cloudflare({ imageService: "compile" });

export default defineConfig({
  adapter,
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
  integrations: [mdx(), robotsTxt(), sitemap()],
  site: "https://jguillau.me",
  vite: {
    plugins: [sugarcube()],
  },
});
