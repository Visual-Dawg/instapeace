/* eslint-disable import/no-default-export */
import { URL, fileURLToPath } from "node:url"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import UnoCSS from "unocss/vite"
import vitePluginHtmlEnv from "vite-plugin-html-env"

export default defineConfig({
  plugins: [
    vitePluginHtmlEnv({
      // @ts-expect-error
      VITE_LANG: process.env.VITE_LANG ?? "en",
    }),
    vue(),
    UnoCSS(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("src", import.meta.url)),
    },
  },
})
