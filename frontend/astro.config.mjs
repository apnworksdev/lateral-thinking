// Loading environment variables from .env files
// https://docs.astro.build/en/guides/configuring-astro/#environment-variables
import { loadEnv } from "vite";
const {
  PUBLIC_SANITY_STUDIO_PROJECT_ID,
  PUBLIC_SANITY_STUDIO_DATASET,
  PUBLIC_SANITY_STUDIO_URL,
} = loadEnv(import.meta.env.MODE, process.cwd(), "");
import { defineConfig } from "astro/config";

const projectId = PUBLIC_SANITY_STUDIO_PROJECT_ID;
const dataset = PUBLIC_SANITY_STUDIO_DATASET;
const studioUrl = PUBLIC_SANITY_STUDIO_URL || "http://localhost:3333";

import sanity from "@sanity/astro";
import react from "@astrojs/react";

// Netlify adapter for on-demand/SSR routes (contact API, Sanity pages, etc.)
// https://docs.astro.build/en/guides/deploy/netlify/
import netlify from "@astrojs/netlify";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  // Set to 'server' for Visual Editing and on-demand rendering
  output: "server",
  adapter: netlify({
    // Astro 6 ya no reexporta verifyOptions desde "astro/assets"; evita el image service de Netlify.
    imageCDN: false,
  }),
  integrations: [
    sanity({
      projectId,
      dataset,
      // studioBasePath: "/admin",
      // Set useCdn to false if you're building statically.
      useCdn: false,
      apiVersion: "2026-03-26", // Set to date of setup to use the latest API version
      stega: {
        studioUrl,
      },
    }),
    react(), // Required for Sanity Studio
  ],
  vite: {
    optimizeDeps: {
      include: [
        "react/compiler-runtime",
        "lodash/isObject.js",
        "lodash/groupBy.js",
        "lodash/keyBy.js",
        "lodash/partition.js",
        "lodash/sortedIndex.js",
      ],
    },

    plugins: [tailwindcss()],
  },
});