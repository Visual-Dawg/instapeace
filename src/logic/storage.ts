import { useStorageLocal } from "~/composables/useStorageLocal"

export const hideAdsStorage = useStorageLocal("hideAds", true)
export const hideSuggestedStorage = useStorageLocal("hideSuggested", false)
export const disableAutoplayStorage = useStorageLocal("disableAutoplay", true)
