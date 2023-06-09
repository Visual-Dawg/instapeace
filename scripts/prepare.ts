// generate stub index.html files for dev entry
import { execSync } from "node:child_process"

import fs from "fs-extra"
import chokidar from "chokidar"

import { isDevelopment, log, port, r } from "./utils"

writeManifest()

if (isDevelopment) {
  stubIndexHtml()
  chokidar.watch(r("src/**/*.html")).on("change", () => {
    stubIndexHtml()
  })
  chokidar.watch([r("src/manifest.ts"), r("package.json")]).on("change", () => {
    writeManifest()
  })
}

function writeManifest() {
  execSync("npx esno ./scripts/manifest.ts", { stdio: "inherit" })
}

/**
 * Stub index.html to use Vite in development
 */
async function stubIndexHtml() {
  const views = ["popup"]

  for (const view of views) {
    await fs.ensureDir(r(`extension/dist/${view}`))

    const data = await fs
      .readFile(r(`src/${view}/index.html`), "utf8")
      .then((fsData) =>
        fsData
          .replace('"./main.ts"', `"http://localhost:${port}/${view}/main.ts"`)
          .replace(
            '<div id="app"></div>',
            '<div id="app">Vite server did not start</div>'
          )
      )

    await fs.writeFile(r(`extension/dist/${view}/index.html`), data, "utf8")

    log("PRE", `stub ${view}`)
  }
}
