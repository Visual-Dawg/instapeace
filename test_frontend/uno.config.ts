// eslint-disable-next-line import/no-default-export
import { defineConfig } from "unocss/vite"

import base from "../unocss.config"

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  ...base,
  rules: [
    ["dashed", getDashedBase()],
    [
      /^dashed-width-(\d+)$/,
      ([_, width]) => ({
        "--dashed-width": `${width}px`,
      }),
    ],
    [
      /^dashed-length-(\d+)$/,
      ([_, length]) => ({
        "--dashed-length": `${length}px`,
      }),
    ],
    [
      /^dashed-spacing-(\d+)$/,
      ([_, spacing]) => ({
        "--dashed-spacing": `${spacing}px`,
      }),
    ],
  ],
})

// function dashe

function getDashedBase() {
  return {
    "background-image": `repeating-linear-gradient(
        2deg,
        var(--dashed-color),
        var(--dashed-color) calc(var(--dashed-length) + 1px),
        transparent calc(var(--dashed-length) + 1px),
        transparent calc(var(--dashed-length) + var(--dashed-spacing) + 2px),
        var(--dashed-color) calc(var(--dashed-length) + var(--dashed-spacing) + 2px)
    ),
    repeating-linear-gradient(
        92deg,
        var(--dashed-color),
        var(--dashed-color) calc(var(--dashed-length) + 1px),
        transparent calc(var(--dashed-length) + 1px),
        transparent calc(var(--dashed-length) + var(--dashed-spacing) + 2px),
        var(--dashed-color) calc(var(--dashed-length) + var(--dashed-spacing) + 2px)
    ),
    repeating-linear-gradient(
        182deg,
        var(--dashed-color),
        var(--dashed-color) calc(var(--dashed-length) + 1px),
        transparent calc(var(--dashed-length) + 1px),
        transparent calc(var(--dashed-length) + var(--dashed-spacing) + 2px),
        var(--dashed-color) calc(var(--dashed-length) + var(--dashed-spacing) + 2px)
    ),
    repeating-linear-gradient(
        272deg,
        var(--dashed-color),
        var(--dashed-color) calc(var(--dashed-length) + 1px),
        transparent calc(var(--dashed-length) + 1px),
        transparent calc(var(--dashed-length) + var(--dashed-spacing) + 2px),
        var(--dashed-color) calc(var(--dashed-length) + var(--dashed-spacing) + 2px)
    );`,

    "background-size": `var(--dashed-width) 100%, 100% var(--dashed-width),
    var(--dashed-width) 100%, 100% var(--dashed-width);`,

    "background-position": `0 0, 0 0, 100% 0, 0 100%;`,
    "background-repeat": `no-repeat;`,
  }
}
