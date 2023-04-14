import { useStorageLocal } from "~/composables/useStorageLocal"

export const hideAdsStorage = useStorageLocal("hideAds", true)

export const disableAutoplayStorage = useStorageLocal("disableAutoplay", true)

export const disableInfiniteScrollStorage = useStorageLocal(
  "disableInfiniteScroll",
  false
)

export const hideSuggestedStorage = useStorageLocal("hideSuggested", false)
export const hideSuggestedImagesStorage = useStorageLocal(
  "hideSuggestedImages",
  false
)
export const hideSuggestedVideosStorage = useStorageLocal(
  "hideSuggestedVideos",
  false
)
