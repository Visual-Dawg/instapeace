import { flow, pipe } from "fp-ts/function"
import * as A from "fp-ts/Array"
import * as O from "fp-ts/Option"

import { language } from "../Lang"
import { HIDING_CLASS_NAME } from "../constants"

import type { IEmitters, IMutationListener, IToggleFeature } from "~/Types"

const adMarkingClass = "__ad__"

export const hideAdsFeature: IToggleFeature = {
  displayName: "Hide ads",
  name: "hideAds",
  register: ({ dom }: IEmitters) => {
    hideAdsInitialise()
    dom.addEventListener("nodeAdded", hideAdsListener)
  },
  unregister: ({ dom }: IEmitters) => {
    unhideElements(adMarkingClass)
    dom.removeEventListener("nodeAdded", hideAdsListener)
  },
}

const hideAdsListener: IMutationListener = {
  callback: console.log,
  priority: 9,
}

function hideAdsInitialise() {
  pipe(getVisibleAds(), A.map(hideAndMark(adMarkingClass)))
}

function isAdPost(node: Node): boolean {
  if (!isPost(node)) return false

  return pipe(
    node.querySelector("header"),
    O.fromNullable,
    O.map(
      flow(
        getBottomChildren,
        A.some(
          (child) => (child as HTMLElement)?.innerText === language.sponsored
        )
      )
    ),
    O.getOrElse(() => false)
  )
}

function isPost(node: Node): node is HTMLElement {
  if (node.nodeName !== "ARTICLE") return false

  const element = node as HTMLElement

  // Has profile picture
  if (!element.querySelector(`header a [alt~='${language.profilePictureAlt}']`))
    return false

  if (!element.querySelector(`video, img`)) return false

  return true
}

function getBottomChildren(node: Node) {
  const children: Node[] = []

  // eslint-disable-next-line unicorn/no-array-for-each
  node.childNodes.forEach(recursion)

  return children

  function recursion(node_: Node) {
    if (node_.childNodes.length === 0) {
      children.push(node_)
      return
    }

    // eslint-disable-next-line unicorn/no-array-for-each
    node_.childNodes.forEach(recursion)
  }
}

// function getPosts() {
//   return getVisibleArticles().filter(isPost)
// }

function getVisibleArticles() {
  return [
    ...document.querySelectorAll(`article:not(.${HIDING_CLASS_NAME})`),
  ] as unknown as readonly HTMLElement[]
}

function getVisibleAds() {
  return getVisibleArticles().filter(isAdPost)
}

function hideAndMark(mark: string): (node: HTMLElement) => HTMLElement {
  return (node) => {
    node.classList.add(HIDING_CLASS_NAME)
    node.classList.add(mark)

    return node
  }
}

function unhideElements(selector: string) {
  for (const element of document.querySelectorAll(
    `${HIDING_CLASS_NAME}.${selector}`
  )) {
    ;(element as HTMLElement).classList.remove(HIDING_CLASS_NAME)
  }
}
