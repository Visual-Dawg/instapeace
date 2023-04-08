import type { IMutationListener } from "~/Types"

/*
To have polymorphic behavior we mimic the normal event behavior, even though it is a bit overkill atm.
It might be useful in the future.
 */

const nodeAddedListeners: IMutationListener[] = []

const observer = new MutationObserver((mutations) => {
  const addedNodeMutations = mutations
    .filter((mutation) => mutation.addedNodes)
    .flatMap((mutation) => [...mutation.addedNodes])

  if (addedNodeMutations.length > 0) {
    for (const listener of nodeAddedListeners) {
      listener.callback(addedNodeMutations)
    }
  }
})

let isObserving = false

/**
 * Emits events based on DOM mutations.
 */
export const mutationEmitter = {
  addEventListener(event: IMutationEmitterEvent, listener: IMutationListener) {
    if (event !== "nodeAdded") {
      throw new TypeError(`${event} is not a nodeAdded event`)
    }

    nodeAddedListeners.push(listener)

    nodeAddedListeners.sort((a, b) => (a.priority ?? 0) - (b.priority ?? 0))

    if (!isObserving) {
      startObserving()
    }
  },

  removeEventListener(
    event: IMutationEmitterEvent,
    listener: IMutationListener
  ) {
    if (event !== "nodeAdded") {
      throw new TypeError(`${event} is not a nodeAdded event`)
    }

    const indexToRemove = nodeAddedListeners.indexOf(listener)

    nodeAddedListeners.splice(indexToRemove, 1)

    if (nodeAddedListeners.length === 0) {
      isObserving = false
      console.log("Stopped observing DOM")
      observer.disconnect()
    }
  },
}

function startObserving() {
  console.log("Started observing DOM")
  observer.observe(document.body, { childList: true, subtree: true })
}

type IMutationEmitterEvent = "nodeAdded"
