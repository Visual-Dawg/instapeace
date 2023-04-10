import type { mutationEmitter } from "./contentScripts/logic/mutationEmitter"
import type { contentFeatures } from "./contentScripts/features"

/**
 * A feature which interacts with the loaded page.
 */
export type IContentFeature = {
  displayName: string
  name: IContentFeatureName

  /**
   * Runs when the feature gets activated.
   *
   * Usually manipulating the DOM and listening to changes in it.
   */
  register: (emitters: IEmitters) => void

  /**
   * Runs when the feature gets deactivated.
   * Usually cleans up listeners.
   */
  unregister: (emitters: IEmitters) => void
}

export type IContentFeatures = typeof contentFeatures

/**
 * The state of a toggle. A boolean, but can be undefined if the toggle should be in the middle.
 */
export type ISwitchState = boolean | undefined

/**
 * The names of the features which affect the page.
 */
export type IContentFeatureName = "hideAds" | "hideSuggested"

/**
 * The new state of the page features, excluding those which are only affecting the extension.
 */
export type IContentFeatureStorageChange = Readonly<{
  [Key in keyof IContentFeatureStorage]: {
    oldValue: IContentFeatureStorage[Key]
    newValue: IContentFeatureStorage[Key]
  }
}>

/**
 * The type of the `storage` with the key value pairs
 */
export type IContentFeatureStorage = {
  [key in keyof typeof contentFeatures]: boolean
}

export type IMutationListener = Readonly<{
  /**
   * The callback to run when the DOM has changed
   */
  callback: (mutations: readonly Node[] | readonly HTMLElement[]) => void

  /**
   * The order of the execution of the callback. The highest gets executed first.
   *
   * Callbacks which hide or delete should be executed first, thus have a higher priority.
   *
   * @default 0
   */
  priority?: number
}>

/**
 * The emitters passed to the features `register` and `unregister`.
 */
export type IEmitters = {
  dom: typeof mutationEmitter
}
