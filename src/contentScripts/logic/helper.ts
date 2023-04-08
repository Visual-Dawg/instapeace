import type { Storage } from "webextension-polyfill"
import type {
  IEmitters,
  IToggleFeatures,
  IToggleStorage,
  IToggleStorageChange,
} from "~/Types"

import { featureNames } from "~/contentScripts/features"
import { jsonParse } from "~/logic/helper"

export async function initialiseActiveFeatures(
  emitters_: IEmitters,
  features: IToggleFeatures
) {
  const state = await browser.storage.local.get().then(parseStorage)

  for (const [name, isOn] of Object.entries(state)) {
    if (!isOn) return

    features[name as keyof IToggleStorage].register(emitters_)
  }
}

export function parseStorageChange(
  storage: Storage.StorageAreaOnChangedChangesType
): IToggleStorageChange {
  const state = {} as IToggleStorageChange

  for (const [key, value] of Object.entries(storage)) {
    // Not strictly necessary, but it his for safety
    if (!Object.prototype.hasOwnProperty.call(storage, key)) {
      continue
    }
    if (!(featureNames as string[]).includes(key)) {
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
  features: IToggleFeatures
): (storageState: Storage.StorageAreaSyncOnChangedChangesType) => void {
  return (storageState) => {
    const parsedState = parseStorageChange(storageState)

    for (const name_ in parsedState) {
      const name = name_ as keyof IToggleStorageChange

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

function parseStorage(storage: Record<string, unknown>): IToggleStorage {
  const state = {} as IToggleStorage

  for (const [key, value] of Object.entries(storage)) {
    // @ts-expect-error
    state[key] = jsonParse(value)
  }

  return state
}
