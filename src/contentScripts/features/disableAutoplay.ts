import { P, match } from "ts-pattern"

import {
  getAllExploreThumbnails,
  getAllPosts,
  isVisible,
} from "../logic/domHelpers"
import { getLocation } from "../logic/helper"

import type { IContentFeature, IEmitters } from "~/Types"

export const disableAutoplayFeature: IContentFeature = {
  displayName: "Hide suggested",
  name: "hideSuggested",

  register: async ({ dom }: IEmitters) => {
    match(getLocation())
      .with(P.union("home", "post"), pausePostVideos)
      .with("explore", pauseExploreVideos)
      .otherwise(() => {})

    dom.addEventListener("postAdded", postListener)
    dom.addEventListener("exploreThumbnailAdded", exploreListener)
  },

  unregister: async ({ dom }: IEmitters) => {
    dom.removeEventListener("postAdded", postListener)
    dom.removeEventListener("exploreThumbnailAdded", exploreListener)
  },
}

const postListener = {
  callback: postAddedCallback,
  priority: 0,
}

async function postAddedCallback(addedPosts: readonly HTMLElement[]) {
  addedPosts.filter(isVisible).filter(hasVideo).forEach(pausePostVideo)
}

const exploreListener = {
  callback: exploreCallback,
  priority: 0,
}

async function exploreCallback(addedThumbnails: readonly HTMLLinkElement[]) {
  // it is enough to simply remove the source, as the video can play on click
  addedThumbnails.filter(isVisible).filter(hasVideo).forEach(removeSource)
}

/**
 * @param element A post, not a generic HTML element.
 */
function hasVideo(element: HTMLElement): boolean {
  return !!element.querySelector("video")
}

function pausePostVideos() {
  getAllPosts().forEach(pausePostVideo)
}

function pauseExploreVideos() {
  getAllExploreThumbnails().filter(hasVideo).forEach(pausePostVideo)
}

function pausePostVideo(container: HTMLElement): void {
  const video = container.querySelector("video")
  const source = video?.src

  if (!video || !source) {
    console.error("No video in provided post found", { video, src: source })
    return
  }

  video.pause()
  // Thats nessecary because Instagram will start playing the video again if it was only paused
  video.removeAttribute("src")

  container.addEventListener("click", playOnClick)

  console.log(video)

  function playOnClick() {
    video?.setAttribute("src", source as string)
    video?.play()

    container.removeEventListener("click", playOnClick)
  }
}

function removeSource(container: HTMLElement): void {
  const video = container.querySelector("video")
  const source = video?.src

  if (!video || !source) {
    console.error("No video in provided post found", { video, src: source })
    return
  }
  video.dataset.srcx = video.src
  video.src = ""
}
