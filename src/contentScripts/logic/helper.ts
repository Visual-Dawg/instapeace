import { match } from "ts-pattern"

import type { Storage } from "webextension-polyfill"
import type {
  IContentFeatureStorage,
  IContentFeatureStorageChange,
  IContentFeatures,
  IEmitters,
} from "~/Types"

import { mainFeatureNames } from "~/contentScripts/features"
import { jsonParse } from "~/logic/helper"

export async function initialiseActiveFeatures(
  emitters_: IEmitters,
  features: IContentFeatures
) {
  const state = await browser.storage.local.get().then(parseStorage)

  for (const [name, isOn] of Object.entries(state)) {
    if (!isOn) return

    features[name as keyof IContentFeatureStorage].register(emitters_)
  }
}

export function parseStorageChange(
  storage: Storage.StorageAreaOnChangedChangesType
): IContentFeatureStorageChange {
  const state = {} as IContentFeatureStorageChange

  for (const [key, value] of Object.entries(storage)) {
    // Not strictly necessary, but it his for safety
    if (!Object.prototype.hasOwnProperty.call(storage, key)) {
      continue
    }
    if (!(mainFeatureNames as string[]).includes(key)) {
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
export function createHandleStorageUpdate(
  emitters_: IEmitters,
  features: IContentFeatures
): (
  storageState: Storage.StorageAreaSyncOnChangedChangesType
) => Promise<void> {
  return async (storageState) => {
    const parsedState = parseStorageChange(storageState)

    for (const name_ in parsedState) {
      const name = name_ as keyof IContentFeatureStorageChange

      const { newValue, oldValue } = parsedState[name]

      if (newValue && newValue !== oldValue) {
        features[name].register(emitters_)
      }
      if (!newValue && newValue !== oldValue) {
        features[name].unregister(emitters_)
      }
    }
  }
}

function parseStorage(
  storage: Record<string, unknown>
): IContentFeatureStorage {
  const state = {} as IContentFeatureStorage

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
