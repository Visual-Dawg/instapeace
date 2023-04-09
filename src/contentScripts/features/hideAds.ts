import { pipe } from "fp-ts/function"
import { match } from "ts-pattern"
import * as A from "fp-ts/Array"

import { language } from "../Lang"

import {
  getBottomChildren,
  getVisibleArticles,
  hideAndMark,
  isHTMLElement,
  isPost,
  unhideElements,
  // unhideElements,
} from "./domHelpers"

import type { IEmitters, IMutationListener, IToggleFeature } from "~/Types"

const adMarkingClass = "__ad__"

export const hideAdsFeature: IToggleFeature = {
  displayName: "Hide ads",
  name: "hideAds",

  register: async ({ dom }: IEmitters) => {
    hideAds()
    dom.addEventListener("nodeAdded", hideAdsListener)
  },

  unregister: async ({ dom }: IEmitters) => {
    unhideElements(adMarkingClass)()
    console.log("Unregister hide ads")
    dom.removeEventListener("nodeAdded", hideAdsListener)
  },
}

const hideAdsListener: IMutationListener = {
  callback: hideAdsCallback,
  priority: 9,
}

async function hideAdsCallback(addedNodes: readonly Node[]) {
  pipe(
    addedNodes as Node[],
    A.filter(isHTMLElement),
    A.map((node) =>
      match(node)
        .when(isAdPost, hideAndMark(adMarkingClass))

        .otherwise(hideAds)
    )
  )
}

/**
 * Hide all ads on the page.
 * @param startingNode The node to start from traversing. @default document
 */
function hideAds(startingNode?: HTMLElement) {
  pipe(getVisibleAds(startingNode), A.map(hideAndMark(adMarkingClass)))
}

function isAdPost(node: Node): node is HTMLElement {
  if (!isPost(node)) return false

  const header = node.querySelector("header")

  return header
    ? pipe(
        header,
        getBottomChildren,
        A.some(
          (child) =>
            (child as HTMLElement)?.textContent?.toLocaleLowerCase() ===
            language.sponsored.toLocaleLowerCase()
        )
      )
    : false
}

function getVisibleAds(startingNode: HTMLElement | Document = document) {
  const articles = getVisibleArticles(startingNode)
  const ads = articles.filter(isAdPost)

  return ads
}
