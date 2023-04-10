import { hideAdsFeature } from "./hideAds"
import { hideSuggestedFeature } from "./hideSuggested"

import type { IContentFeature, IContentFeatureName } from "~/Types"
/**
 * Features which affect the loaded page (`DOM`).
 *
 * They need to be handled differently than those which affect only the popup, like darkmode. Currently only DOM effecting features are implemented.
 */
export const contentFeatures = {
  hideAds: hideAdsFeature,

  hideSuggested: hideSuggestedFeature,
  //
} as const satisfies Record<IContentFeatureName, IContentFeature>

export const featureNames = Object.keys(
  contentFeatures
) as readonly IContentFeatureName[]
