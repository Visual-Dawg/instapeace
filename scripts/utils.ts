import { resolve } from "node:path"

import { bgCyan, black } from "kolorist"

export const port = Number.parseInt(process.env.PORT || "") || 3303
export function r(...arguments_: string[]) {
  return resolve(__dirname, "..", ...arguments_)
}
export const isDevelopment = process.env.NODE_ENV !== "production"

export function log(name: string, message: string) {
  console.log(black(bgCyan(` ${name} `)), message)
}
