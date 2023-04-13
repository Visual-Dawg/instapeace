import { pipe } from "fp-ts/function"
import * as A from "fp-ts/Array"

import { language } from "../Lang"
import {
  getBottomChildren,
  getVisiblePosts,
  hideAndMark,
  isHTMLElement,
  isVisible,
  unhideElements,
} from "../logic/domHelpers"

import type { IContentFeature, IEmitters } from "~/Types"

const adMarkingClass = "__ad__"

export const hideAdsFeature: IContentFeature = {
  displayName: "Hide ads",
  name: "hideAds",

  register: async ({ dom }: IEmitters) => {
    hideAds()
    dom.addEventListener("postAdded", listener)
  },

  unregister: async ({ dom }: IEmitters) => {
    unhideElements(adMarkingClass)()
    dom.removeEventListener("postAdded", listener)
  },
}

const listener = {
  callback,
  priority: 999,
}

async function callback(addedPosts: readonly HTMLElement[]) {
  addedPosts
    .filter(isHTMLElement)
    .filter(isVisible)
    .filter(isAdPost)
    .forEach(hideAndMark(adMarkingClass))
}

/**
 * Hide all ads on the page.
 * @param startingNode The node to start from traversing. @default document
 */
function hideAds(startingNode?: HTMLElement) {
  getVisibleAds(startingNode).forEach(hideAndMark(adMarkingClass))
}

/**
 * @param post A post, not a generic HTML element.
 */
function isAdPost(post: HTMLElement): boolean {
  const header = post.querySelector("header")

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
  return getVisiblePosts(startingNode).filter(isAdPost)
}
