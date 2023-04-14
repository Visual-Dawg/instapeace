import {
  getVisibleExploreThumbnails,
  getVisiblePosts,
  isExploreThumbnail,
  isHTMLElement,
  isPost,
} from "./domHelpers"
import {
  exploreLocationRegex,
  homeLocationRegex,
  matchString,
  postLocationRegex,
} from "./helper"

import type {
  IMutationEventName,
  IMutationHandlers,
  IMutationHandlersObject,
} from "~/Types"

const handlers: IMutationHandlersObject = {
  nodeAdded: {
    listeners: [],
    locations: [/.*/],
    order: 0,
    getElements: (addedNodes) => addedNodes,
  },

  postAdded: {
    listeners: [],
    locations: [homeLocationRegex, postLocationRegex],
    order: 1,
    getElements: (addedNodes) =>
      addedNodes
        .filter(isHTMLElement)
        .flatMap((element) =>
          isPost(element) ? element : getVisiblePosts(element)
        ),
  },

  exploreThumbnailAdded: {
    listeners: [],
    locations: [exploreLocationRegex],
    order: 1,
    getElements: (addedNodes) =>
      addedNodes
        .filter(isHTMLElement)
        .flatMap((element) =>
          isExploreThumbnail(element)
            ? element
            : getVisibleExploreThumbnails(element)
        ),
  },
}

const observer = new MutationObserver(observerCallback)

let isObserving = false

/**
 * Emits events based on DOM mutations.
 */
export const mutationEmitter = {
  addEventListener,
  removeEventListener,
}

/// /////////////////////////////
/// /////////////////////////////

function executeListeners(
  handlers_: IMutationHandlersObject,
  addedNodes: readonly Node[]
) {
  Object.values(handlers_)
    .filter((handler) => handler.listeners.length > 0)
    .filter((handler) => handler.locations.some(matchString(location.pathname)))
    .sort((a, b) => b.order - a.order)
    .forEach((handler) => {
      const addedElements = handler.getElements(addedNodes)

      if (addedElements.length === 0) return

      for (const listener of handler.listeners) {
        // @ts-expect-error
        listener.callback(addedElements)
      }
    })
}

function observerCallback(mutations: MutationRecord[]) {
  const addedNodes = mutations
    .filter((mutation) => mutation.addedNodes.length > 0)
    .flatMap((mutation) => [...mutation.addedNodes])

  if (addedNodes.length === 0) return

  executeListeners(handlers, addedNodes)
}

function addEventListener<T extends IMutationEventName>(
  event: T,
  listener: IMutationHandlers[T]
) {
  handlers[event].listeners.push(listener)
  handlers[event].listeners.sort(
    (a, b) => (b.priority ?? 0) - (a.priority ?? 0)
  )

  if (!isObserving) {
    startObserving()
  }
}

function removeEventListener<T extends IMutationEventName>(
  event: T,
  listener: IMutationHandlers[T]
) {
  const indexToRemove = handlers[event].listeners.indexOf(listener)

  handlers[event].listeners.splice(indexToRemove, 1)

  if (!getHasListeners(handlers)) {
    stopObserving()
  }
}

function getHasListeners(listenerState: IMutationHandlersObject): boolean {
  return Object.values(listenerState).some(
    (state) => state.listeners.length > 0
  )
}

function startObserving() {
  console.info("Started observing DOM")
  observer.observe(document.body, { childList: true, subtree: true })
}

function stopObserving() {
  isObserving = false
  console.info("Stopped observing DOM")
  observer.disconnect()
}
