import type { CamelCase } from "type-fest"

export type AppFeature = {
  fullName: AppFeatureFullName
  name: AppFeatureCamelName
  action: () => void
}

export type SwitchState = "on" | "off" | "middle"

type AppFeatureFullName = "Hide ads" | "Hide suggested posts"
export type AppFeatureCamelName = CamelCase<AppFeatureFullName>
