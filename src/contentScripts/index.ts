import { mutationEmitter } from "./logic/mutationEmitter"
import {
  createHandleStorageUpdate,
  initialiseActiveFeatures,
} from "./logic/helper"

import type { IEmitters } from "~/Types"

import { contentFeatures } from "~/contentScripts/features"

const emitters: IEmitters = { dom: mutationEmitter }

;(() => {
  console.info("[ Instapeace ] Hello world from content script")

  initialiseActiveFeatures(emitters, contentFeatures)

  const handleStorageUpdate = createHandleStorageUpdate(
    emitters,
    contentFeatures
  )

  browser.storage.local.onChanged.addListener(handleStorageUpdate)
})()
