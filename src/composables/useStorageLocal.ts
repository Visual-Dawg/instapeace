import { storage } from "webextension-polyfill"
import { useStorageAsync } from "@vueuse/core"

import type {
  MaybeRef,
  RemovableRef,
  StorageLikeAsync,
  UseStorageAsyncOptions,
} from "@vueuse/core"
import type { IStorage } from "~/Types"

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

export function useStorageLocal<T extends keyof IStorage>(
  key: T,
  initialValue: MaybeRef<IStorage[T]>,
  options?: UseStorageAsyncOptions<T>
): RemovableRef<IStorage[T]> {
  return useStorageAsync(
    key,
    // @ts-expect-error
    initialValue,
    storageLocal,
    options
  ) as unknown as RemovableRef<IStorage[T]>
}
