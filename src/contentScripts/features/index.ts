import { hideAdsFeature } from "./hideAds"

import type {
  IEmitters,
  IMutationListener,
  IToggleFeature,
  IToggleFeatureName,
} from "~/Types"
/**
 * Features which affect the loaded page (`DOM`).
 *
 * They need to be handled differently than those which affect only the popup, like darkmode. Currently only DOM effecting features are implemented.
 */
export const contentFeatures = {
  hideAds: hideAdsFeature,

  hideSuggested: {
    displayName: "Hide suggested posts",
    name: "hideSuggested",
    register: (emitters: IEmitters) => {
      emitters.dom.addEventListener("nodeAdded", hideSuggestedListener)

      console.log("Register Hide suggested posts")
    },
    unregister: (emitters: IEmitters) => {
      emitters.dom.removeEventListener("nodeAdded", hideSuggestedListener)

      console.log("unregister hide suggested posts")
    },
  },
} as const satisfies Record<IToggleFeatureName, IToggleFeature>

export const featureNames = Object.keys(
  contentFeatures
) as readonly IToggleFeatureName[]

const hideSuggestedListener: IMutationListener = {
  priority: 0,
  callback(mutations) {
    console.log({ mutations })
  },
}
