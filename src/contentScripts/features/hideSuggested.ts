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
} from "./domHelpers"

import type { IContentFeature, IEmitters, IMutationListener } from "~/Types"

const suggestedMarkingClass = "__suggested__"

export const hideSuggestedFeature: IContentFeature = {
  displayName: "Hide suggested",
  name: "hideSuggested",

  register: async ({ dom }: IEmitters) => {
    hideSuggested()
    dom.addEventListener("postAdded", hideSuggestedListener)
  },

  unregister: async ({ dom }: IEmitters) => {
    unhideElements(suggestedMarkingClass)()
    dom.removeEventListener("postAdded", hideSuggestedListener)
  },
}

const hideSuggestedListener: IMutationListener = {
  callback: hideSuggestedCallback,
  priority: 999,
}

async function hideSuggestedCallback(addedPosts: readonly Node[]) {
  addedPosts
    .filter(isHTMLElement)
    .filter(isVisible)
    .filter(isSuggestedPost)
    .forEach(hideAndMark(suggestedMarkingClass))
}

/**
 * Hide all ads on the page.
 * @param startingNode The node to start from traversing. @default document
 */
function hideSuggested(startingNode?: HTMLElement) {
  getVisibleSuggested(startingNode).forEach(hideAndMark(suggestedMarkingClass))
}

/**
 * @param post A post, not a generic HTML element.
 */
function isSuggestedPost(post: HTMLElement): boolean {
  const header = post.querySelector("header")

  return header
    ? pipe(
        header,
        getBottomChildren,
        A.some(
          (child) =>
            (child as HTMLElement)?.textContent?.toLocaleLowerCase() ===
            language.follow.toLocaleLowerCase()
        )
      )
    : false
}

function getVisibleSuggested(startingNode: HTMLElement | Document = document) {
  return getVisiblePosts(startingNode).filter(isSuggestedPost)
}
