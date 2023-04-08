import { defineConfig } from "unocss/vite"
import {
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
} from "unocss"

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  presets: [presetUno(), presetAttributify(), presetIcons()],
  transformers: [transformerDirectives()],
})
