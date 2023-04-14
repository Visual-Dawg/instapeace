import type { mutationEmitter } from "./contentScripts/logic/mutationEmitter"
import type { mainFeatures } from "./contentScripts/features"

/**
 * A feature which interacts with the loaded page.
 */
export type IMainFeature = {
  displayName: string
  name: IMainFeatureName
  /** Used to prevent loading the feature when no supported language is used on the page. */
  requiresSupportedLanguage: boolean

  /**
   * Runs when the feature gets activated.
   *
   * Usually manipulating the DOM and listening to changes in it.
   *
   * @returns The callback to run when unregistered.
   */
  register: (
    emitters: IEmitters
  ) => Promise<() => Promise<void> | void> | Promise<void>
}

export type IMainFeatures = typeof mainFeatures

/**
 * The names of the features which affect the page.
 */
export type IMainFeatureName =
  | "hideAds"
  | "hideSuggested"
  | "disableAutoplay"
  | "disableInfiniteScroll"

/**
 * The new state of the page features, excluding those which are only affecting the extension.
 */
export type IMainFeatureStorageChange = Readonly<{
  [Key in keyof IMainFeatureStorage]: {
    oldValue: IMainFeatureStorage[Key]
    newValue: IMainFeatureStorage[Key]
  }
}>

/**
 * The type of the `storage` with the key value pairs
 */
export type IMainFeatureStorage = {
  [Key in IMainFeatureName]: boolean
}

export type IStorage = {
  [Key in IMainFeatureName | ISuggestSubFeaturesNames]: boolean
}

export type ISuggestSubFeaturesNames =
  | "hideSuggestedImages"
  | "hideSuggestedVideos"

/**
 * The type of the `storage` with the key value pairs
 */
export type ISuggestSubFeatureStorage = {
  [Key in ISuggestSubFeaturesNames]: boolean
}
/**
 * The state of a toggle. A boolean, but can be undefined if the toggle should be in the middle.
 */
export type ISwitchState = boolean | undefined

/**
 * The emitters passed to the features `register` and `unregister`.
 */
export type IEmitters = {
  dom: typeof mutationEmitter
}

export type IMutationHandlers = {
  nodeAdded: CreateListener<(nodes: readonly Node[]) => void>
  postAdded: CreateListener<(posts: readonly HTMLElement[]) => void>
  exploreThumbnailAdded: CreateListener<
    (posts: readonly HTMLLinkElement[]) => void
  >
}
export type IMutationHandlerEmits = {
  nodeAdded: readonly Node[]
  postAdded: readonly HTMLElement[]
  exploreThumbnailAdded: readonly HTMLLinkElement[]
}

export type IMutationHandlersObject = {
  [Event in keyof IMutationHandlers]: Readonly<{
    listeners: IMutationHandlers[Event][]
    /**
     * The order of the handler to run
     */
    order: number
    /**
     * At which pages / locations to run the listeners.
     */
    locations: readonly (string | RegExp)[]
    /**
     * Receives the added nodes, computes a value out of it and the result will later be used to call the listerners with it.
     */
    getElements: (
      addedNodes: readonly Node[]
    ) => Parameters<IMutationHandlers[Event]["callback"]>[0]
  }>
}

export type IMutationEventName = keyof IMutationHandlers

type CreateListener<T extends (...arguments_: any[]) => void> = Readonly<{
  /**
   * The callback to run when the DOM has changed
   */
  callback: T

  /**
   * The order of the execution of the callback. The highest gets executed first.
   *
   * Callbacks which hide or delete should be executed first, thus have a higher priority.
   *
   * @default 0
   */
  priority?: number
}>
