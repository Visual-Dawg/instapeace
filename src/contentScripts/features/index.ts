import { hideAdsFeature } from "./hideAds"
import { hideSuggestedFeature } from "./hideSuggested"
import { disableAutoplayFeature } from "./disableAutoplay"
import { disableInfiniteScrollFeature } from "./disableInfiniteScroll"

import type { IMainFeature, IMainFeatureName } from "~/Types"

/**
 * The main features that effect the DOM.
 *
 * They need to be handled differently than those which affect only the popup, like darkmode. Currently only DOM effecting features are implemented though.
 */
export const mainFeatures = {
  hideAds: hideAdsFeature,

  hideSuggested: hideSuggestedFeature,

  disableAutoplay: disableAutoplayFeature,

  disableInfiniteScroll: disableInfiniteScrollFeature,
  //
} as const satisfies Record<IMainFeatureName, IMainFeature>

export const mainFeatureNames = Object.keys(
  mainFeatures
) as readonly IMainFeatureName[]
