import { getVisiblePosts, isHTMLElement, isPost } from "../features/domHelpers"

import type { IMutationListener } from "~/Types"

type IMutationEventName = "nodeAdded" | "postAdded"
type IListeners = Record<IMutationEventName, IMutationListener[]>

const listeners: IListeners = {
  nodeAdded: [],
  postAdded: [],
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

function observerCallback(mutations: MutationRecord[]) {
  const addedNodes = mutations
    .filter((mutation) => mutation.addedNodes.length > 0)
    .flatMap((mutation) => [...mutation.addedNodes])

  if (addedNodes.length === 0) {
    return
  }

  for (const listener of listeners.nodeAdded) {
    listener.callback(addedNodes)
  }

  const addedElements = addedNodes.filter(isHTMLElement)

  if (listeners.postAdded.length > 0) {
    const posts = addedElements.flatMap((element) =>
      isPost(element) ? element : getVisiblePosts(element)
    )

    if (posts.length === 0) return

    for (const listener of listeners.postAdded) {
      listener.callback(posts)
    }
  }
}

function addEventListener(
  event: IMutationEventName,
  listener: IMutationListener
) {
  addListenerToState(event)(listener)

  if (!isObserving) {
    startObserving()
  }
}

function removeEventListener(
  event: IMutationEventName,
  listener: IMutationListener
) {
  removeListenerFromState(event)(listener)

  if (!getHasListeners(listeners)) {
    stopObserving()
  }
}

function addListenerToState(
  eventName: IMutationEventName
): (listener: IMutationListener) => void {
  return (listener) => {
    listeners[eventName].push(listener)
    listeners[eventName].sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0))
  }
}

function removeListenerFromState(
  eventName: IMutationEventName
): (listener: IMutationListener) => void {
  return (listener) => {
    const indexToRemove = listeners[eventName].indexOf(listener)

    listeners[eventName].splice(indexToRemove, 1)
  }
}

function getHasListeners(listenerState: IListeners): boolean {
  return Object.values(listenerState).some((state) => state.length > 0)
}

function startObserving() {
  console.log("Started observing DOM")
  observer.observe(document.body, { childList: true, subtree: true })
}

function stopObserving() {
  isObserving = false
  console.log("Stopped observing DOM")
  observer.disconnect()
}
