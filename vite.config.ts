/* eslint-disable import/no-default-export */
/// <reference types="vitest" />

import { dirname, relative } from "node:path"

import { defineConfig } from "vite"
import Vue from "@vitejs/plugin-vue"
import Icons from "unplugin-icons/vite"
import IconsResolver from "unplugin-icons/resolver"
import Components from "unplugin-vue-components/vite"
import AutoImport from "unplugin-auto-import/vite"
import UnoCSS from "unocss/vite"

import { isDevelopment as isDevelopment, port, r } from "./scripts/utils"

import type { UserConfig } from "vite"

export const sharedConfig: UserConfig = {
  root: r("src"),
  resolve: {
    alias: {
      "~/": `${r("src")}/`,
    },
  },
  define: {
    __DEV__: isDevelopment,
  },
  plugins: [
    Vue(),

    AutoImport({
      imports: [
        "vue",
        {
          "webextension-polyfill": [["*", "browser"]],
        },
      ],
      dts: r("src/auto-imports.d.ts"),
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      dirs: [r("src/components")],
      // generate `components.d.ts` for ts support with Volar
      dts: r("src/components.d.ts"),
      resolvers: [
        // auto import icons
        IconsResolver({
          componentPrefix: "",
        }),
      ],
    }),

    // https://github.com/antfu/unplugin-icons
    Icons(),

    // https://github.com/unocss/unocss
    UnoCSS(),

    // rewrite assets to use relative path
    {
      name: "assets-rewrite",
      enforce: "post",
      apply: "build",
      transformIndexHtml(html, { path }) {
        return html.replace(
          /"\/assets\//g,
          `"${relative(dirname(path), "/assets")}/`
        )
      },
    },
  ],
  optimizeDeps: {
    include: ["vue", "@vueuse/core", "webextension-polyfill"],
  },
}

export default defineConfig(({ command }) => ({
  ...sharedConfig,
  base: command === "serve" ? `http://localhost:${port}/` : "/dist/",
  server: {
    port,
    hmr: {
      host: "localhost",
    },
  },
  build: {
    outDir: r("extension/dist"),
    emptyOutDir: false,
    sourcemap: isDevelopment ? "inline" : false,
    // https://developer.chrome.com/docs/webstore/program_policies/#:~:text=Code%20Readability%20Requirements
    terserOptions: {
      mangle: false,
    },
    rollupOptions: {
      input: {
        background: r("src/background/index.html"),
        options: r("src/options/index.html"),
        popup: r("src/popup/index.html"),
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
}))
