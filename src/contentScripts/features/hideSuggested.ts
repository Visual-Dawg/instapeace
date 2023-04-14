import { pipe } from "fp-ts/function"
import * as A from "fp-ts/Array"
import * as R from "remeda"

import { language } from "../Lang"
import {
  getBottomChildren,
  getVisiblePosts,
  hideAndMark,
  hideAndMarkIf,
  isHTMLElement,
  isVisible,
} from "../logic/domHelpers"
import { parseStorage } from "../logic/helper"

import type {
  IEmitters,
  IMainFeature,
  IStorage,
  ISuggestSubFeaturesNames,
} from "~/Types"

const subFeatures = {
  hideSuggestedImages: (post) =>
    hideAndMarkIf(
      markingClass,
      !!post.querySelector(`img[alt^=${language.photoBy}`)
    )(post),

  hideSuggestedVideos: (post) =>
    hideAndMarkIf(markingClass, !!post.querySelector(`video`))(post),
} satisfies Record<ISuggestSubFeaturesNames, (post: HTMLElement) => void>

/** The class to add to a hidden element. Makes it easier to unhide again. */
const markingClass = "__suggested__"

export const hideSuggestedFeature: IMainFeature = {
  displayName: "Hide suggested",
  name: "hideSuggested",
  requiresSupportedLanguage: true,

  register: async ({ dom }: IEmitters) => {
    hideSuggested()
    const listener = {
      callback,
      priority: 999,
    }
    dom.addEventListener("postAdded", listener)

    return () => dom.removeEventListener("postAdded", listener)
  },
}

async function callback(addedPosts: readonly HTMLElement[]) {
  const subCallbacks = await getSubCallbacks(subFeatures)

  addedPosts
    .filter(isHTMLElement)
    .filter(isVisible)
    .filter(isSuggestedPost)
    .forEach((post) => subCallbacks.forEach((subFeature) => subFeature(post)))
}

async function getSubCallbacks<
  T extends Record<string, (post: HTMLElement) => void>
>(features: T): Promise<T[keyof T][]> {
  const state = await browser.storage.local
    .get()
    .then((storage) =>
      R.pick(
        storage as IStorage,
        Object.keys(features) as (keyof typeof subFeatures)[]
      )
    )
    .then(parseStorage)

  const areAllOn = Object.values(state).every((value) => value === true)

  return areAllOn
    ? ([hideAndMark(markingClass)] as T[keyof T][])
    : Object.entries(state)
        .filter(([_, value]) => value)
        .map(([key, _]) => features[key as keyof T])
}

/**
 * Hide all ads on the page.
 * @param startingNode The node to start from traversing. @default document
 */
async function hideSuggested(startingNode?: HTMLElement) {
  const callbacks = await getSubCallbacks(subFeatures)

  getVisibleSuggested(startingNode).forEach((post) =>
    callbacks.forEach((runFeature) => runFeature(post))
  )
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
