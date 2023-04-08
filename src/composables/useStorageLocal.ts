import { storage } from "webextension-polyfill"
import { useStorageAsync } from "@vueuse/core"

import type {
  MaybeRef,
  RemovableRef,
  StorageLikeAsync,
  UseStorageAsyncOptions,
} from "@vueuse/core"
import type { IContentFeatureStorage } from "~/Types"

const storageLocal: StorageLikeAsync = {
  removeItem(key: string) {
    return storage.local.remove(key)
  },

  setItem(key: string, value: string) {
    return storage.local.set({ [key]: value })
  },

  async getItem(key: string) {
    return storage.local.get(key).then((data) => data[key])
  },
}

export function useStorageLocal<T extends keyof IContentFeatureStorage>(
  key: T,
  initialValue: MaybeRef<IContentFeatureStorage[T]>,
  options?: UseStorageAsyncOptions<T>
): RemovableRef<IContentFeatureStorage[T]> {
  return useStorageAsync(
    key,
    // @ts-expect-error
    initialValue,
    storageLocal,
    options
  ) as unknown as RemovableRef<IContentFeatureStorage[T]>
}
