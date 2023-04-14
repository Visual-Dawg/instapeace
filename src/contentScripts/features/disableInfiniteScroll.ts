import { pipe } from "fp-ts/function"

import disableInfiniteScrollCss from "./disableInfiniteScroll.css?raw"

import type { IEmitters, IMainFeature } from "~/Types"

export const disableInfiniteScrollFeature: IMainFeature = {
  displayName: "Disable infinite scroll",
  name: "disableInfiniteScroll",
  requiresSupportedLanguage: false,

  register: async (_: IEmitters) => {
    disableInfiniteScroll()

    return async () => enableInfiniteScroll()
  },
}

function disableInfiniteScroll() {
  document.head.append(feedEndCssStyle)
}

function enableInfiniteScroll() {
  feedEndCssStyle.remove()
}

const feedEndCssStyle = pipe(document.createElement("style"), (element) => {
  element.textContent = disableInfiniteScrollCss
  return element
})
