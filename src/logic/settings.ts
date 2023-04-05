import type { AppFeature, AppFeatureCamelName } from "~/Types"

export const settings = {
  hideAds: {
    fullName: "Hide ads",
    name: "hideAds",
    action: () => console.log("Hide ads"),
  },

  hideSuggestedPosts: {
    fullName: "Hide suggested posts",
    name: "hideSuggestedPosts",
    action: () => console.log("Hide suggested posts"),
  },
} as const satisfies Record<AppFeatureCamelName, AppFeature>
