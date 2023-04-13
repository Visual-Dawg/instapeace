import { hideAdsFeature } from "./hideAds"
import { hideSuggestedFeature } from "./hideSuggested"
import { disableAutoplayFeature } from "./disableAutoplay"

import type { IContentFeature, IContentFeatureName } from "~/Types"

/**
 * Features which affect the loaded page (`DOM`).
 *
 * They need to be handled differently than those which affect only the popup, like darkmode. Currently only DOM effecting features are implemented.
 */
export const contentFeatures = {
  hideAds: hideAdsFeature,

  hideSuggested: hideSuggestedFeature,

  disableAutoplay: disableAutoplayFeature,
  //
} as const satisfies Record<IContentFeatureName, IContentFeature>

export const mainFeatureNames = Object.keys(
  contentFeatures
) as readonly IContentFeatureName[]
