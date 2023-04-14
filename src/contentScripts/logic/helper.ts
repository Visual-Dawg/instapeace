import { match } from "ts-pattern"
import * as R from "remeda"

import type { Storage } from "webextension-polyfill"
import type {
  IEmitters,
  IMainFeatureName,
  IMainFeatureStorage,
  IMainFeatureStorageChange,
  IMainFeatures,
  IStorage,
} from "~/Types"

import { mainFeatureNames } from "~/contentScripts/features"
import { jsonParse } from "~/logic/helper"

export async function initialiseFeatures({
  emitters,
  features,
  isLanguageSupported,
}: {
  emitters: IEmitters
  features: IMainFeatures
  isLanguageSupported: boolean
}) {
  const state = await getMainFeaturesStorage()

  for (const [name, isOn] of Object.entries(state)) {
    if (!isOn) continue

    const feature = features[name as IMainFeatureName]

    if (feature.requiresSupportedLanguage && !isLanguageSupported) {
      browser.storage.local.set({ [name]: false })
      continue
    }

    feature.register(emitters)
  }
}

async function getMainFeaturesStorage() {
  return browser.storage.local
    .get()
    .then((state) => R.pick(state as IStorage, mainFeatureNames))
    .then(parseStorage) as Promise<IMainFeatureStorage>
}

export function parseStorageChange<
  T extends Storage.StorageAreaOnChangedChangesType
>(storage: T): T {
  const state = {} as T

  for (const [key, value] of Object.entries(storage)) {
    // Not strictly necessary, but it his here for added safety
    if (!Object.prototype.hasOwnProperty.call(storage, key)) {
      continue
    }

    // @ts-expect-error
    state[key] = {
      oldValue: jsonParse(value.oldValue),
      newValue: jsonParse(value.newValue),
    }
  }

  return state
}

/**
 * Register and unregister toggled features.
 */
export function createHandleMainFeatureStorageUpdate(
  emitters_: IEmitters,
  features: IMainFeatures
): (
  storageState: Storage.StorageAreaSyncOnChangedChangesType
) => Promise<void> {
  const unregisterRegistery: Partial<Record<IMainFeatureName, () => void>> = {}

  return async (storageState) => {
    const parsedState = parseStorageChange(storageState)

    for (const name_ in parsedState) {
      const name = name_ as keyof IMainFeatureStorageChange

      if (!mainFeatureNames.includes(name)) continue

      const { newValue, oldValue } = parsedState[name]

      if (newValue && newValue !== oldValue) {
        const unregister = await features[name].register(emitters_)
        unregister && (unregisterRegistery[name] = unregister)
      }
      if (!newValue && newValue !== oldValue) {
        unregisterRegistery[name]?.()
      }
    }
  }
}

export function parseStorage<T extends Record<string, unknown>>(storage: T): T {
  const state = {} as T

  for (const [key, value] of Object.entries(storage)) {
    // @ts-expect-error
    state[key] = jsonParse(value)
  }

  return state
}

/**
 * Match a string against a string or a RegEx
 */
export function matchString(
  toMatch: string
): (matcher: string | RegExp) => boolean {
  return (matcher) =>
    typeof matcher === "string" ? matcher === toMatch : matcher.test(toMatch)
}

export function getLocation(): "home" | "explore" | "post" | "reels" {
  return match(location.pathname)
    .when(
      (path) => postLocationRegex.test(path),
      () => "post" as const
    )
    .when(
      (path) => homeLocationRegex.test(path),
      () => "home" as const
    )
    .when(
      (path) => exploreLocationRegex.test(path),
      () => "explore" as const
    )
    .when(
      (path) => reelsLocationRegex.test(path),
      () => "reels" as const
    )
    .run()
}

export const postLocationRegex = /^\/p\/[^#/?]*/
export const exploreLocationRegex = /^\/explore\/[^#/?]*/
export const reelsLocationRegex = /^\/reels\/[^#/?]*/
export const homeLocationRegex = /^\/(?![^#?])/
