import { allowWindowMessaging, onMessage, setNamespace } from "webext-bridge"

import { mutationEmitter } from "./logic/mutationEmitter"
import {
  createHandleMainFeatureStorageUpdate,
  initialiseFeatures,
} from "./logic/helper"
import mainCss from "./content.css?raw"
import { isLanguageSupported } from "./Lang"
import { NAMESPACE_ID } from "./constants"

import type { IEmitters } from "~/Types"

import { mainFeatures } from "~/contentScripts/features"

const emitters: IEmitters = { dom: mutationEmitter }

allowWindowMessaging(NAMESPACE_ID)
setNamespace(NAMESPACE_ID)

onMessage("x", (data) => {
  console.log({ receivedData: data })
  console.log("Message getIsLanguageSupported received", {
    isLanguageSupported,
  })
  return isLanguageSupported
})
;(() => {
  console.info("[ Instapeace - Content script ] Hi mom!")

  initialiseFeatures({ emitters, features: mainFeatures, isLanguageSupported })

  const handleStorageUpdate = createHandleMainFeatureStorageUpdate(
    emitters,
    mainFeatures
  )

  browser.storage.local.onChanged.addListener(handleStorageUpdate)

  linkCSS(mainCss)
})()

function linkCSS(css: string) {
  const link = document.createElement("style")
  link.textContent = css

  document.head.append(link)
}
